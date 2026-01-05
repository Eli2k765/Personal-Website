---
title: "OverTheWire: Bandit"
tags: [overthewire, linux, wargame, bandit, bash, ssh]

description: "A complete walkthrough of the Bandit wargame from OverTheWire. Levels 0-10 covering SSH, file manipulation, and data encoding."
---

# OverTheWire: Bandit

**Platform**: [OverTheWire](https://overthewire.org/wargames/bandit/)
**Goal**: Learn the basics of Linux, Bash, and SSH.
**Format**: Each level provides a password to the next.

---

## Level 0 -> 1
**Goal**: Connect to the server.
**Host**: `bandit.labs.overthewire.org`
**Port**: `2220`
**User**: `bandit0`
**Pass**: `bandit0`

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```
Once connected, reading the README:
```bash
cat readme
# Password for Level 1
```

## Level 1 -> 2
**Goal**: Read a file named `-`.
**Concept**: Dashes usually mean "Standard Input". To specify a file named dash, use the relative path.
```bash
cat ./-
```

## Level 2 -> 3
**Goal**: Read a file with spaces in the name.
**Concept**: Quoting or escaping.
```bash
cat "spaces in this filename"
# OR
cat spaces\ in\ this\ filename
```

## Level 3 -> 4
**Goal**: Read a hidden file in `inhere`.
**Concept**: Hidden files start with `.`.
```bash
cd inhere
ls -la
cat .hidden
```

## Level 4 -> 5
**Goal**: Find the only human-readable file in `inhere`.
**Concept**: `file` command.
```bash
cd inhere
file ./*
# ./-file07: ASCII text
cat ./-file07
```

## Level 5 -> 6
**Goal**: Find a file that is 1033 bytes, not executable, and human-readable.
**Concept**: `find` command.
```bash
find . -type f -size 1033c ! -executable
# ./maybehere07/.file2
cat ./maybehere07/.file2
```

## Level 6 -> 7
**Goal**: Owned by user `bandit7`, group `bandit6`, size 33 bytes.
**Concept**: `find` with user/group.
```bash
find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
# /var/lib/dpkg/info/bandit7.password
```

## Level 7 -> 8
**Goal**: Password is next to the word "millionth".
**Concept**: `grep`.
```bash
grep "millionth" data.txt
```

## Level 8 -> 9
**Goal**: A unique line in `data.txt`.
**Concept**: `sort` and `uniq`.
```bash
sort data.txt | uniq -u
```

## Level 9 -> 10
**Goal**: One of the few human-readable strings, preceded by several '='.
**Concept**: `strings`.
```bash
strings data.txt | grep "===="
```

## Level 10 -> 11
**Goal**: Base64 encoded.
**Concept**: `base64` decoding.
```bash
base64 -d data.txt
```

## Level 11 -> 12
**Goal**: ROT13 encoded string.
**Concept**: `tr` (Translate characters).
```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

## Level 12 -> 13
**Goal**: Hexdump -> Gzip -> Bzip2 -> Tar (Repeatedly).
**Concept**: Reverse engineering compression.
1.  Create a temp directory: `mkdir /tmp/myname; cd /tmp/myname`
2.  Hexdump reverse: `xxd -r data.txt > data`
3.  Check file type: `file data` (It's gzip).
4.  Rename and decompress: `mv data data.gz; gzip -d data.gz`
5.  Repeat `file` check and decompress (bzip2, tar) until you get ASCII text.

## Level 13 -> 14
**Goal**: Use an SSH private key found in the previous level.
**Concept**: SSH Identity File.
```bash
ssh -i sshkey.private bandit14@localhost -p 2220
```

## Level 14 -> 15
**Goal**: Submit current password to port 30000 on localhost.
**Concept**: `nc` (Netcat) or `telnet`.
```bash
echo "PASSWORD_HERE" | nc localhost 30000
```
*(The password for bandit14 is needed here).*

## Level 15 -> 16
**Goal**: Submit password to port 30001 using SSL.
**Concept**: `openssl s_client`.
```bash
openssl s_client -connect localhost:30001
```

## Level 16 -> 17
**Goal**: Port Scanning (Range 31000-32000). Finding an SSL port that echoes back credentials.
**Concept**: `nmap` inside the box.
```bash
nmap -p 31000-32000 localhost --open
```
Connect to the open SSL port with `openssl s_client`. It returns an RSA Private Key.

## Level 17 -> 18
**Goal**: Diff two files.
**Concept**: `diff`.
```bash
diff passwords.old passwords.new
```

## Level 18 -> 19
**Goal**: SSH works, but `.bashrc` logs you out immediately ("Byebye!").
**Concept**: SSH Command Execution (bypassing the login shell).
```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat readme"
# OR
ssh bandit18@bandit.labs.overthewire.org -p 2220 "/bin/sh"
```

## Level 19 -> 20
**Goal**: A `setuid` binary that executes commands as the next user.
**Concept**: Exploiting binaries.
```bash
./bandit20-do cat /etc/bandit_pass/bandit20
```

---
**Verdict**: Bandit is the absolute best starting point for anyone new to Linux security.
