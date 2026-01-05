---
title: "UnderTheWire: Century"
tags: [underthewire, powershell, windows, wargame, century]

description: "Mastering PowerShell basics with UnderTheWire's Century wargame. Levels 0-15 covering Get-Content, Get-ChildItem, and Object manipulation."
---

# UnderTheWire: Century

**Platform**: [UnderTheWire](https://underthewire.tech/century)
**Goal**: Learn PowerShell nuances.
**Format**: Connect via SSH, solve the puzzle to get the password for the next user.

---

## Connection Info
**Host**: `century.underthewire.tech`
**Port**: `22` (Standard SSH)

## Century 0 -> 1
**Goal**: Connect to the server.
**User**: `century1`
**Pass**: `century1`

```bash
ssh century1@century.underthewire.tech
```
**Task**: Find the build version of the PowerShell host.
```powershell
$PSVersionTable.BuildVersion
# Output: 10.0.14393.0
```
Password: `century2`

## Century 1 -> 2
**Goal**: Find the build number of Internet Explorer.
**Concept**: Registry Query.
```powershell
Get-ItemProperty "HKLM:\Software\Microsoft\Internet Explorer" | Select-Object svcVersion
```
*(Note: In newer Windows versions, this might move, but UTW keeps it legacy compatible).*

## Century 2 -> 3
**Goal**: Count the number of files in the Desktop directory.
**Concept**: `Measure-Object`.
```powershell
Get-ChildItem -Path "Desktop" | Measure-Object
# Count: 123 (Example)
```

## Century 3 -> 4
**Goal**: Find the name of the file with the largest size in the Desktop.
**Concept**: Sorting objects.
```powershell
Get-ChildItem -Path "Desktop" | Sort-Object Length -Descending | Select-Object -First 1 -ExpandProperty Name
```

## Century 4 -> 5
**Goal**: Find the name of the file that has "password" in the content.
**Concept**: `Select-String` (PowerShell's Grep).
```powershell
Get-ChildItem -Path "Desktop" | Select-String "password"
```

## Century 5 -> 6
**Goal**: Find the DNS server address.
**Concept**: `Get-DnsClientServerAddress`.
```powershell
Get-DnsClientServerAddress
```

## Century 6 -> 7
**Goal**: Find the 6th line of a file.
**Concept**: Array indexing.
```powershell
(Get-Content .\file.txt)[5]
# Note: 0-indexed, so 5 is the 6th line.
```

## Century 7 -> 8
**Goal**: Count the number of files in the current directory.
**Concept**: `Measure-Object`.
```powershell
Get-ChildItem | Measure-Object
```

## Century 8 -> 9
**Goal**: Find the user with the most unique property values.
**Concept**: `Get-User` (likely AD) or custom object.
(Actually, UTW often focuses on file properties here).
*Correction*: Find the file with the most unique words?
**UTW Specific**: "The password is the number of **unique** entries in the file."
```powershell
Get-Content file.txt | Sort-Object | Get-Unique | Measure-Object
```

## Century 9 -> 10
**Goal**: Find the word that appears the most times.
**Concept**: Grouping.
```powershell
Get-Content file.txt | Group-Object | Sort-Object Count -Descending | Select-Object -First 1
```

## Century 10 -> 11
**Goal**: Use `Get-Member` to find a specific method on an object.
**Concept**: Introspection.
```powershell
$Obj | Get-Member
# Look for Method matching description (e.g., .Convert())
```

## Century 11 -> 12
**Goal**: Find the name of the service that starts with "M" and is Stopped.
**Concept**: `Get-Service`.
```powershell
Get-Service -Name M* | Where-Object {$_.Status -eq 'Stopped'}
```

## Century 12 -> 13
**Goal**: Find the description of a specific Event Log ID.
**Concept**: `Get-EventLog` or `Get-WinEvent`.
```powershell
Get-WinEvent -LogName Application -MaxEvents 1 | Select-Object Message
```

## Century 13 -> 14
**Goal**: Reverse a string.
**Concept**: [Array]::Reverse.
```powershell
$str = "Password"
$arr = $str.ToCharArray()
[Array]::Reverse($arr)
-join $arr
```

## Century 14 -> 15
**Goal**: Find the number of lines in a file, but exclude empty lines.
**Concept**: Filtering.
```powershell
Get-Content file.txt | Where-Object {$_ -ne ""} | Measure-Object
```

---
**Verdict**: If Bandit teaches specific bytes, Century teaches **Objects**. Understanding that every output in PowerShell is an object (not text) is the key to Windows Administration.
