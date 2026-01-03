---
title: Screen Capture
tags: [collection, screenshots, spying, vnc]
description: Taking screenshots of the user's desktop to gather intelligence.
date: 2024-01-02
---

# Screen Capture (T1113)

A picture is worth a thousand passwords.

## 1. Windows Native
- **PowerShell**: `[System.Windows.Forms.SendKeys]::SendWait("{PrtSc}")` (Visible).
- **C# / GDI+**: Invoking the GDI+ API to capture the screen buffer silently.
- **Tools**: Cobalt Strike `screenshot`.

## 2. Linux (X11)
- **Tool**: `xwd -root -display :0` (Legacy X11).
- **Wayland**: Much harder (secure by design). Requires compromising the compositor.

## 3. Triggered Screenshots
Wait for the user to open "KeePass" or "Chrome", then snap a picture.
