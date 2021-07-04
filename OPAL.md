# 1. OPAL

## 1.1 OPAL Arch Overview

OPAL is a Linux-based, open and dynamic  platform .

![opal](./img/opal_arch.bmp)

### 1.1.1 Build Script for OpenWRT

to get correct description pls do:

```shell
$ TOPDIR=$PWD make -C package/busybox DUMP=1 V=99
Package: busybox
Menu: 1
Version: 1_20_1-5
...
```



### 1.1.2 OPAL Property

Some general principles can be applied no matter which kernel version is used in order to make binary drivers work with your custom kernel , turn on kernel debugging features such as:

```Makefile
#– CONFIG_DEBUG_KERNEL
#– CONFIG DETECT SOFTLOCKUP
#– CONFIG DEBUG KOBJECT
#– CONFIG KALLSYMS
#– CONFIG KALLSYMS ALL
```

OPAL　building procress:

![opal](./img/opal_build.bmp)

OPAL based on OpenWrt, and has 3 rules  for

- Target :  ``BuildTarget`` for Linux kernel to configure HW.
- Host: ``HostBuild``  for tools
- Package:  ``BuildPackage`` for package running on the device.

Downloading Server:

![down](./img/opal_download_server.bmp)



## 1.2 Building OPAL Source

### 1.2.1 Clone OPAL Repo by git ,and building it.


```shell
# checkout repo
chear@sw3-cbs-30:~$ git clone https://btc-git.zyxel.com/MT03749/opal
chear@sw3-cbs-30:~$ git checkout -b local_branch origin/master
# start docker container
chear@sw3-cbs-30:~$ ropd
# building whole code
cpe-opal$ make P=DX3301-T0_Generic V=99

# to building the bootloader, and generate zld.bin
cpe-opal$ make package/private/econet/en75xx-loader/{clean,prepare,compile,install} V=s

# quilt is enabled by default for kernel patches, but not for packages, using "QUILT=1" 
# for the same way.
cpe-opal$ make package/private/econet/en75xx-loader/{clean,compile} QUILT=1 V=99

# to building zyxel package ,and install to rootfs folder
cpe-opal$ make package/private/zyxel/zcfg_be/{clean,compile} V=99 & make package/intall V=99

# to building kernel module
cpe-opal$ make package/kernel/{clean,install} V=99

# to building linux kernel & rootfs ,then generate ras.bin
cpe-opal$ make P=DX3301-T0_Generic target/linux/install V=99

# to generate rootfs.squash
cpe-opal$ TOPDIR=$PWD INCLUDE_DIR=$PWD/include make -C target/linux/ firmware_release V=99
```

to running  ``make target/linux/install V=99``  ,final Makefile for **"kernel-defaults.mk"** , **"kernel-build.mk"**.

```Makefile
define Kernel/CompileImage/Default
    $(if $(CONFIG_TARGET_ROOTFS_INITRAMFS),,rm -f $(TARGET_DIR)/init)
    +$(MAKE) $(KERNEL_MAKEOPTS) $(subst ",,$(KERNELNAME))
    $(KERNEL_CROSS)objcopy -O binary $(OBJCOPY_STRIP) -S $(LINUX_DIR)/vmlinux $(LINUX_KERNEL)
    $(KERNEL_CROSS)objcopy $(OBJCOPY_STRIP) -S $(LINUX_DIR)/vmlinux $(KERNEL_BUILD_DIR)/vmlinux.elf
endefs
```



### 1.2.2 Generate patch by quilt.

```shell
# quilt series
# quilt new 449-ZYXEL_BUGFIX_test_Hsiwei.patch
# quilt add test_file.c 
(file need to edit.)
# vim test_file.c
# quilt refresh 
( generate patch for '449-ZYXEL_BUGFIX_test_Hsiwei.patch')
```



*Tips 1: to stop docker*

```shell
$ docker ps -a
$ docker stop ${container_id}
```

*Tips 2: to check and verify the ssh connection access by*

```shell
# to check client
$ ssh -vvv git@btc-git.zyxel.com
# to check server
$ ssh -d -p 23
```

*Tips 3:  to add git alias by*

```shell
$ git config --global alias.b “branch -vv” 
```

*Tips 3: to keep patch when building package*

```shell
# to building bootloader for OPAL 
$ make package/private/econet/en75xx-loader/{clean,install} V=99 QUILT=1
```

*Tips 4: 'tig' [usage by](<https://linux.cn/article-11069-1.html>)*



## 1.3  System Startup

![1619427421760](./img/opal_dx3301_startup.png)





# 2. OPAL 2.0

## 2.1 zyrepo

Clone and checkout repo by zyrepo

```shell
chear@Build_Opal_Docker$ zyrepo init -u git@btc-git.zyxel.com:opal20/manifest.git -m opal_econet_old.xml
chear@Build_Opal_Docker$ zyrepo sync
chear@Build_Opal_Docker$ zyrepo branch -b develop
chear@Build_Opal_Docker$ zyrepo branch 
chear@Build_Opal_Docker$ cd opal & make P=HGW500TX2X2E V=s
chear@Build_Opal_Docker$ zyrepo foreach -c "git status"
chear@Build_Opal_Docker$ zyrepo foreach -c "git pull origin develop --rebase"
chear@Build_Opal_Docker$ zyrepo upload -m yes
```

main files structure for opal2.0

```shell
opal2p0
  ├── acts_build.sh -> opal/scripts/acts_build.sh
  ├── econet_old
  ├── manifest
  ├── ./opal/package/
  │   ├── private
  │   ├── econet -> ../../../econet_old/econet
  │   └── zyxel -> ../../../zyxel_private/zyxel
  │   └── public-zyxel -> ../../zyxel_public/public-zyxel
  ├── opalcicd
  ├── zyrepo
  ├── .zyrepo
  │   ├── manifest
  │   ├── manifest_name
  │   ├── manifest.xml -> manifest/opal_econet_old.xml
  │   ├── zyrepo -> .zyrepo/zyrepo
  │   └── .zyrepo
  ├── zyxel_private
  └── zyxel_public
```



 