---
title: Escape to Host
tags: [priv-esc, container, docker, kubernetes, cloud]
description: Breaking out of a container to gain access to the underlying host or cluster.
date: 2024-01-02
---

# Escape to Host (T1611)

You have a shell, but `whoami` says `root` and `ps` shows only 4 processes. You are in a container.

## 1. Privileged Containers
If the container runs with `--privileged`, it has access to host devices.
- **Check**: `ip link` (Look for many interfaces). `fdisk -l` (Can you see the host disk?).
- **Exploit**: Mount the host disk.
  ```bash
  mkdir /mnt/host
  mount /dev/sda1 /mnt/host
  cat /mnt/host/etc/shadow
  ```

## 2. Docker Socket Mount
If `/var/run/docker.sock` is mounted inside the container.
- **Attack**: You can talk to the Docker Daemon on the host. Use the Docker CLI (or curl) to spawn a NEW container that mounts the host root directory.

## 3. Kernel Exploits (Dirty Pipe / Dirty Cow)
Containers share the host kernel. A kernel exploit works on both.
- If the host kernel is old, compiling an exploit inside the container can crash or root the *host*.
