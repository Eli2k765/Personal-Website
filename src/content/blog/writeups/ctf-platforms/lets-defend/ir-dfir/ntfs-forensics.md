---
title: "LetsDefend: NTFS Forensics"
tags: [letsdefend, blue-team, forensics, mft]
date: 2024-01-01
description: MFT (Master File Table) analysis for file deletion/timestomping.
---

# LetsDefend: NTFS Forensics

**Concept**: The MFT tracks every file on an NTFS volume.

## Key Artifacts
1.  **$Standard_Information**: Timestamp can be user-modified (TimeStomping).
2.  **$File_Name**: Timestamp inherited from parent, harder to modify.
3.  **Detecting TimeStomping**: If `$SI` time is significantly *before* `$FN` time, it's suspicious.
4.  **Deleted Files**: The MFT entry remains marked as "Unallocated" until overwritten.
