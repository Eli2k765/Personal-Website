---
title: "HTB: Bastion"
tags: [htb, windows, easy, backups, vhd, hash-dump]

description: "Mounting remote VHD backup files to steal SAM hives."
---

# Hack The Box: Bastion

**Machine IP**: `10.10.10.134`
**OS**: Windows
**Difficulty**: Easy

Bastion focuses on the dangers of unsecured Backup storage.

## 1. Reconnaissance
Port 445 (SMB) allows anonymous listing.
Share: `Backups`.
Inside, we find a massive file: `Backup 2019-02-22 124351.vhd` (Virtual Hard Disk).

## 2. Exploitation (VHD Mounting)
We can't just download 50GB. We mount it remotely.
```bash
guestmount --add /mnt/backups/Backup.vhd --inspector --ro /mnt/vhd
```
Now we can browse the backup as a local filesystem.

### SAM Dumping
We navigate to `/mnt/vhd/Windows/System32/config`.
We copy `SAM` and `SYSTEM`.
We use `samdump2` to extract hashes.
```bash
samdump2 SYSTEM SAM
```
We get the NTLM hash for `Administrator` and `L4mpje`.
We crack `L4mpje`'s hash: `bureaulampje2019`.

## 3. SSH Access
We SSH in as `L4mpje`.
`ssh L4mpje@10.10.10.134`

## 4. Privilege Escalation
We look for other software. `mRemoteNG` is installed. This is a connection manager that encrypts passwords weakly.
We find the config file `confCons.xml`.
We decrypt the stored password for Administrator using a known mRemoteNG decryptor script.
**Password**: `thXLHM96BeKL0dr298qJ8w==` (Decrypted: `!053!53305!`)

We login as Admin.

## Conclusion
Backups are gold mines. If you can read the backup, you can steal the identity of the machine from the past.
