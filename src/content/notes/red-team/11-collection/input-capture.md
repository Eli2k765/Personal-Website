---
title: Input Capture
tags: [collection, keylogging, clipboard, api]
description: Intercepting user input (keystrokes) and clipboard content.
date: 2024-01-02
---

# Input Capture (T1056)

## 1. Keylogging (API)
- **GetAsyncKeyState**: Windows API that queries "Is this key currently pressed?". Polling this rapidly reconstructs typing.
- **SetWindowsHookEx**: Installing a global hook to intercept all keyboard events. (Loud, triggers EDR).

## 2. Clipboard Monitoring
Monitoring `CF_TEXT`.
- **Value**: Users copy-paste passwords from password managers.
- **Technique**: Poll the clipboard every 1 second. if Content != PreviousContent, Log it.

## 3. Cmd/Terminal Logging
Capture input by reading `.bash_history` (Post-facto) or aliasing `sudo` to a script that logs the password.
