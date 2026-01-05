---
title: "HTB Pro Lab: Dante"
tags: [htb, pro-lab, pivoting, red-team, lateral-movement, proxychains, ligolo]

description: "A complete narrative of infiltrating the Dante corporate network. 14 machines, double pivots, and extensive Active Directory hunting."
---

# Hack The Box Pro Lab: Dante

**Scenario**: Corporate Network Infiltration.
**Hosts**: 14
**Subnets**: 3 (DMZ, Workstation, Server)

Dante is not a CTF; it is a battle for network positioning. The challenge is not identifying a vulnerability (they are often simple), but routing your traffic to `172.16.40.50` when you are three hops away.

---

## 1. The Breach (DMZ)

We start externally. Enumeration reveals a public-facing website `dante.htb`.
We find a Wordpress instance vulnerable to a known plugin exploit.
We drop a web shell.
We convert this to a meterpreter shell.

**State**: user `www-data` on `Web-01`.

## 2. Establishing the Pivot (The Tunnels)

We identify a second network interface on `Web-01`: `172.16.1.10`.
To attack the internal network, we need a tunnel.
Historically, we used `ssh -D 1080` (Dynamic Port Forwarding) and **Proxychains**.
Today, we use **Ligolo-ng** for better stability (and actual ICMP support).

1.  **Agent**: Upload `agent` to `Web-01`.
2.  **Proxy**: Run `proxy` on Kali.
3.  **Connect**: The agent connects back. We add a route: `ip route add 172.16.1.0/24 dev ligolo`.

Now we can run Nmap directly against the internal network.

---

## 3. Lateral Movement (Workstation Subnet)

We verify the subnet `172.16.1.0/24`.
We find a Windows host `DANTE-WS01`.
We launch **Responder** (via the tunnel? No, risky. Better to upload it).
We capture a hash for `DANTE\j.doe`.
Crack it: `Password123!`.

We use `crackmapexec` (or NetExec) to verify the creds across the subnet.
`j.doe` is a local admin on `DANTE-WS02`.

**Pivot 2**: We SSH/WinRM into `WS02`. We find it has an interface on `172.16.2.0/24`.
We daisy-chain our proxy.

---

## 4. The Data Center (Server Subnet)

Deep in the network (`172.16.2.x`), we find the Domain Controller `DANTE-DC01`.
We search for secrets on file shares.
We find a **KeePass** database (`passwords.kdbx`).
We extract the hash (`keepass2john`) and crack it.
Inside: `Administrator` password.

## 5. Domain Dominance

We compromise the DC.
We confirm we have owned all 14 flags, hidden in user desktops, text files, and registry keys across the environment.

## Conclusion
Dante teaches you the Red Team mantra: **"Enumeration is everything, but Routing is King."** You can have the best exploit in the world, but if you can't route a packet to port 445 on the target, you have nothing.
