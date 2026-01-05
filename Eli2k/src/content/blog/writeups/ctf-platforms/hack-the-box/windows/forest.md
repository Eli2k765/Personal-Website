---
title: "HTB: Forest"
tags: [htb, windows, medium, kerberoasting, bloodhound, exchange, dcsync]

description: "Using BloodHound to map ACL paths, abusing Exchange Windows Permissions to grant DCSync rights."
---

# Hack The Box: Forest

**Machine IP**: `10.10.10.161`
**OS**: Windows Server 2016
**Difficulty**: Medium

Forest feels like a real-world engagement because it relies on ACL (Access Control List) abuse, not CVEs.

## 1. Reconnaissance
*   **88 (Kerberos)**, **389 (LDAP)**, **445 (SMB)**.
*   We enumerate users via RPC or Null Session. We find `svc-alfresco`.
*   We disable Pre-Auth via **ASREPRoasting**? No.
*   We try **Kerberoasting**. We get a hash for `svc-alfresco`. Crack it: `s3rvice`.

## 2. BloodHound Analysis
We are in. We run **BloodHound** (SharpHound.exe) to map the domain.
Visualizing the graph, we see a path:
`svc-alfresco` -> Member of `Service Accounts` -> Member of `Privileged IT` -> .. -> `Exchange Windows Permissions`.
The `Exchange Windows Permissions` group has `WriteDacl` on the Domain Object.

## 3. Privilege Escalation (ACL Abuse)
If you have `WriteDacl` on the domain, you can give yourself `GetChanges` and `GetChangesAll` rights. This is the **DCSync** privilege.

We use **PowerView** or **BloodyAD** to modify the ACL.
```powershell
Add-DomainObjectAcl -TargetIdentity "DC=htb,DC=local" -PrincipalIdentity svc-alfresco -Rights DCSync
```

## 4. Exploitation
Now `svc-alfresco` can sync passwords.
```bash
secretsdump.py htb/svc-alfresco:s3rvice@10.10.10.161
```
We dump the Administrator hash.
Done.

## Conclusion
Understanding **Active Directory ACLs** is critical. A user with no admin rights can still own the domain if the group nesting allows it.
