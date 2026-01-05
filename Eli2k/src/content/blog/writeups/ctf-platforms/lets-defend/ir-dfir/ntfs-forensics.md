---
title: "LetsDefend: NTFS Forensics"
tags: [letsdefend, blue-team, mft, usn-journal, timeline]

description: "Using MFT (Master File Table) analysis to prove a file existed after it was deleted."
---

# LetsDefend: NTFS Forensics

**Scenario**: Insider threat deleted confidential data.
**Artifact**: `$MFT`.

## 1. Tooling (MFTParser)
We ingest the `$MFT` file into **MFTExplorer** or **Eric Zimmerman's Tools**.

## 2. Timeline Reconstruction
We filter by "File Delete" attribute.
We find `Project_X_Plans.pdf`.
Created: 09:00.
Accessed: 09:05 (Copied to USB?).
Deleted: 09:10.
The record remains in the MFT until overwritten, marked as "Unallocated".

## Conclusion
Deleting a file on Windows just marks the MFT entry as free. The metadata (and distinct proof of existence) persists.
