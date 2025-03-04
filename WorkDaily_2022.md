[TOC]

## 2022.01.06  VS Code & MinGW

**VS Code** IDE for [free download](https://code.visualstudio.com/Download), while support  c&c++ after install plug-in . **MinGW**  means *Minimalist GNU for Windows*  [downloading](https://sourceforge.net/projects/mingw/files/) , is open source GCC compiler on Windows .  [to integrate VS Code & MinGW](https://zhuanlan.zhihu.com/p/77074009) .

Access to config ``c_cpp_properties.json`` and ``tasks.json``  , then you can compile and run c files ,main configuration as follow:

``c_cpp_properties.json``

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "compilerPath": "D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe",
            "cStandard": "c99",
            "cppStandard": "gnu++14",
            "intelliSenseMode": "gcc-x86"
        }
    ],
    "version": 4
}
```

``tasks.json``

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "cppbuild",
			"label": "C/C++: gcc.exe genKeyTools",
			"command": "D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe",
			"args": [
				"-fdiagnostics-color=always",
				"-g",
				"${fileDirname}\\*.c",
				"-o",
				"${fileDirname}\\EX3220-T0_TM_GenKeyTool_V2.3_64_v7_2.exe"
			],
			"options": {
				"cwd": "${fileDirname}"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build",
			"detail": "编译器: D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe"
		}
	]
}
```

(Use "c&c++" plug-in  within VS Code ,its easy to conflict with "clangd" ,  when change settings for plug-in should restart VS Code. )

### VS Code & Linux

want to view the source for linux on server in **VS Code**  must install  *"remote ssh"* & *"clangd"* plug-in on VS Code , also need use ``bear`` command to generate ``compile_commands.json`` for  source index. 

For example generate source index for en75xx-loader 

```shell
# bear make package/private/econet/en75xx-loader/{clean,install} V=99
# ln -s /home/chear/cicd/opal/compile_commands.json /home/chear/cicd/opal/build_dir/target-mipsel-buildroot-linux-uclibc/linux-en75xx_hgw500tx2x2e/en75xx-loader-7.3.251.900/compile_commands.json
```

(to use "clangd" should keep confirm "compile_commands.json" with-in workspace folder.)

*to generate 'compile_commands.josn' on workspace folder.*

```shell
# cd package/private/zyxel/esmd && TOPDIR=/work/cpe-opal/EXTDISK/opal20/opal INCLUDE_DIR=/work/cpe-opal/EXTDISK/opal20/opal/include bear make V=ss
```



## 2022.03.01  Merge code into 'develop' branch

to get my log by 

```shell
$ zyrepo foreach -c  "git log CTB_7528HU_7561DU_HGW500TX2X2E_20210801 --after="2021-8-1" --format=\"%ae: %h --%ce\" --author=\"Chear Huang\""
( %h: short commit hash, %ae: author email, %ce: commit email.)

$ git reset --hard "HEAD^"
(to delete last commit.)
```





## 2022.03.09  Hisi XGPon kernel

building xgPon 

```shell
## to building kernel 
make source mod=kernel V=99;
## to building sub dir and contains Makefile.hsan
make source mod=hisilicon V=99
## to building hisilicon/gateway/service
make source mod=service V=99
```



[DNS](http://c.biancheng.net/view/6457.html) based on UDP  and default for *53* port , DNS packet as following:

![dns_packet](img/dns_packet.png)

![dns](./img/dns_packet.jpg)

![dns2](./img/dns_packet_2.jpg)





## 2022.04.11 Create gitlab-runner for CI/CD

prepare create new user and generate public key by  ``ssh-keygen`` , then add this user to 'docker' group

```shell
# sudo useradd -m sw3_pub
# sudo passwd sw3_pub
# sudo usermod -aG docker sw3_pub
# ssh-keygen -t ed25519
```

get docker image and register *gitlab-runner* on *172.25.24.30*

```shell
$ docker run -d -p 5000:5000 --restart=always --name registry -v /srv/registry:/var/lib/registry registry:2

$ docker run -d --name gitlab-runner --restart always -v /srv/gitlab-runner/config:/etc/gitlab-runner -v /var/run/docker.sock:/var/run/docker.sock -v /home/gitlab-runner_volumes:/home/gitlab-runner_volumes --dns 172.21.5.1 gitlab/gitlab-runner:ubuntu-v12.8.0

$ docker run --rm --add-host pkgtarball.mitrastar.com:172.25.24.30 -it cpe-docker-registry.zyxel.com:5000/my-build-server3:v1.01 bash
```

login to gitlab container and make certification for url *btc-git.zyxel.com*

```shell
$ docker exec -it gitlab-runner bash
root@:/# openssl s_client -connect btc-git.zyxel.com:443 -showcerts < /dev/null | openssl x509 -outform PEM > /etc/ssl/certs/btc-git.zyxel.com.crt

root@:/# gitlab-runner --debug register -n --tls-ca-file="/etc/ssl/certs/btc-git.zyxel.com.crt" --name ctb_build-it --url https://btc-git.zyxel.com/ -r 6wunkyzuVyTPXxN_6y8N --executor docker --docker-image cpe-docker-registry.zyxel.com:5000/my-build-server3:v1.01 --docker-dns 172.21.5.1 --docker-volumes /mnt/gitlab-runner_volumes_1/build:/mnt/build/:rw --docker-volumes /mnt/gitlab-runner_volumes_1/builds:/builds:rw --docker-volumes /mnt/gitlab-runner_volumes_1/script:/script:rw  --docker-volumes /mnt/gitlab-runner_volumes_1/gitlab-daily-build-image:/gitlab-daily-build-image:rw --docker-volumes /opt/tools/zyrepo:/opt/tools/zyrepo:rw --docker-volumes /home/sw3_pub/.ssh:/root/.ssh:rw --tag-list "tagsBuildCTBOPAL2-it"  --docker-tlsverify false

root@:/# gitlab-runner list

root@:/# gitlab-runner unregister --tls-ca-file="/etc/ssl/certs/btc-git.zyxel.com.crt" --url https://btc-git.zyxel.com/ --token tkCsX-fJygTdtgjvNqvQ

root@:/# gitlab-runner restart
```



## 202.04.25  install 'tldr' within docker container

```shell
$ mkdir -p ~/.tldr/tldr
$ sudo git clone https://codechina.csdn.net/mirrors/tldr-pages/tldr.git ~/.tldr/tldr
$ sudo apt-get update
$ sudo apt-get install tldr
```



## 2022.04.26 MTK  SDK porting

generate *u-boot* config and building *u-boot* by:

```shell
$ tar -xf uboot-2022.04_0421_formal.tar.xz
$ cd uboot-mtk-20220412-sb
## make mt7981_spim_nand_rfb_defconfig
$ make 
$ make CROSS_COMPILE=/usr/bin/aarch64-linux-gnu-
```

 to generate configuration by  ``./script/kconfig/Makefile``

```Makefile
%config: scripts_basic outputmakefile FORCE
	$(Q)$(MAKE) $(build)=scripts/kconfig $@
## Express commands:
## make -f ./scripts/Makefile.build obj=scripts/kconfig mt7981_spim_nand_rfb_defconfig


%_defconfig: $(obj)/conf
	$(Q)$< $(silent) --defconfig=arch/$(SRCARCH)/configs/$@ $(Kconfig)
## Express commands: 
## scripts/kconfig/conf  --defconfig=arch/../configs/mt7981_spim_nand_rfb_defconfig Kconfig
```

to generate *u-boot.bin*

```shell
./tools/mkimage -T mtk_image -a 0x41e00000 -e 0x41e00000 -n "media=snand;nandinfo=2k+64" -d u-boot.bin u-boot-mtk.bin >/dev/null ;
```

generate bootloader

```shell
$ cp u-boot.bin  ../atf-20220421-d0152f6db/
$ make menuconfig && make
## Express:
## make -f /work/cpe-opal/mtk_porting/atf-20220421-d0152f6db/Makefile PLAT="mt7981" CROSS_COMPILE="/usr/bin/aarch64-linux-gnu-" BOOT_DEVICE="spim-nand" NMBM=1 NAND_TYPE="spim:2k+64" DRAM_USE_DDR4=0 DDR3_FREQ_2133=1 BOARD_BGA=1 LOG_LEVEL=20 BL33="./u-boot.bin" clean
## make -f /work/cpe-opal/mtk_porting/atf-20220421-d0152f6db/Makefile PLAT="mt7981" CROSS_COMPILE="/usr/bin/aarch64-linux-gnu-" BOOT_DEVICE="spim-nand" NMBM=1 NAND_TYPE="spim:2k+64" DRAM_USE_DDR4=0 DDR3_FREQ_2133=1 BOARD_BGA=1 LOG_LEVEL=20 BL33="./u-boot.bin"  all fip

```

to upgrade by bootloader by *MTK* sdk

```shell
MT7981> mtkupgrade bl2
## bl2.img
MT7981> mtkupgrade fip
## fip.bin
MT7981> mtkupgrade simg
## bootloader-factory.bin
```



## 2022.05.16  Push code to remote repo

```shell
## git fetch origin [remote_branch]:[local_branch]
$ git fetch origin develop:develop
## '--allow-unrelated-histories' means merge different repo code.
$ git merge local_develop --allow-unrelated-histories
```



## 2022.05.20  ``find -exec`` CMD

```shell
 $ find ./ -name "*.tgz" -exec mv {} ../../mt7981_cicd/opal20/opal/dl/ \;
```





## 2022.06.01 Bundle mt7981-loader with OpwnWrt Makefile

### 1. create new package and bundle source code to OpenWrt

Create new package 'test' structure as following,  this package just print many '#' symbol and generate *a.out* when compile this package, and copy file *a.out* to rootfs.

```shell
# tree package/mtk/test/
package/mtk/test/
|-- Makefile
└-- just_test-2.0	
    └-- Makefile
```

*package/mtk/test/Makefile*  as following

```Makefile
include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/kernel.mk

#These lines concatanate the package name and list the URL location from which the package source code is to be downloaded
PKG_NAME:=just_test
PKG_VERSION:=2.0
PKG_RELEASE:=1
PKG_NAME_VER:= $(PKG_NAME)-$(PKG_VERSION)

#PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
#PKG_SOURCE_URL:=@ZyXEL_SITE/private/ZyXEL
#DL_DIR:=$(TOPDIR)/dl/private

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
#MAKE_PATH:=just_test-2.0
#PACKAGE_DIR:=$(BIN_DIR)/packages/private
#PATCH_DIR:=patches-$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk

define Package/just_test
	SECTION:=net
	CATEGORY:=Zyxel Packages
	TITLE:= ZyXEL Test fun.
#	DEPENDS:=@ZYXEL_ONECONNECT
endef

define Package/just_test/description
	Going down this fun.
endef

define Package/just_test/config
	#select PACKAGE_zcmd if PACKAGE_zcfg
endef

define Package/just_test/clean
$(info chear_debug: just_test clean fun.)
endef


define Build/Prepare
	rm -rf $(PKG_BUILD_DIR)
	$(info chear_debug: just_test Prepare fun, $(PKG_BUILD_DIR))
	$$(call link_files,$(PKG_NAME_VER),$(BUILD_DIR))
endef

define Package/just_test/compile
	$(MAKE) -C $(PKG_BUILD_DIR)	all
endef

define Package/just_test/install
	$(INSTALL_DIR) $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/a.out $(1)/usr/bin/
endef

$(eval $(call BuildPackage,just_test))
```

to building new package.

```shell
# make pacakge/mtk/test/compile V=s
```



##  2022.06.15  UBI(Unsorted Block Images) FS

**UBIFS** is file system developed by Nokia engineers , is next generation of the JFFS2 . One thing to understand that UBIFS is very different to any traditional file system 

- it **does not** work on top of block devices (like `hard drives`, `MMC/SD cards`, `USB flash drives`, `SSDs`, etc). 
- UBIFS was designed to work on top of *raw* flash, which has nothing to do with block devices. 
- UBIFS does not work on `MMC cards` and the like -they look like block devices to the outside world 
- `MMC cards` implement **FTL (Flash Translation Layer)** support in hardware, which simply speaking emulates a block device on top of the built-in raw flash.  More detail [pdf](<http://www.linux-mtd.infradead.org/doc/ubifs.pdf>)



![raw_ftl](./img/Raw_vs_FTL.bmp)

mtd and ubi

![mtd_ubi](./img/mtd_vs_ubi.bmp)

![maping](./img/mtd_ubi_mapping.png)





## 2022.07.11  led-gpio driver for Linux 5.4

very useful command to find out kernel source , refs [Programmer’s Guide for ARMv8.pdf](blob:https://doczz.net/c828dee6-356a-4775-bf66-061174dc3462)

```shell
# find ./drivers/leds/ -name "*.o"  |awk '{print $1}' |sed 's/\.o/\.c/g' |xargs grep -n "_led_probe"
```

### u-boot

```text
cmd"atled" --> cmd "do_led"--> drivers/leds/led-uclass.c --> drivers/gpio/gpio-uclass.c
(zloader)		(u-boot)													     |	
								driver/pinctrl/mediatek/pinctrl-mtk-common.c <---|
			void mtk_rmw(struct udevice *dev, u8 i, u32 reg, u32 mask, u32 set)
```

### kernel

*Documentation/devicetree/bindings/leds/common.txt*  

*Documentation/devicetree/bindings/leds/leds-gpio.txt*

ex3320-t0-tm.dts* for leds

```c
zyleds {
    compatible = "gpio-leds";

    led_red_inet {
        label = "zyled-red-inet";
        gpios = <&pio 28 GPIO_ACTIVE_LOW>;
        default-state = "off";
    };
    led_blue_inet {
        label = "zyled-blue-inet";
        gpios = <&pio 31 GPIO_ACTIVE_LOW>;
        default-state = "keep";
    };
}
```

match to driver within *led-gpio.c*

```c
static const struct of_device_id of_gpio_leds_match[] = {
      { .compatible = "gpio-leds", },
      {},
 };
```

led working flow in kernel such like:

```mermaid
graph LR
A("./driver/leds/leds-gpio.c")-->B("./leds/led-class.c")
B-->E("./leds/ledtrig-timer.c")
```



## 2022.07.11  MTK Secure Boot

building uboot:

```shell
# cd uboot-mtk-20220412-sb
# make mt7981_spim_nand_sb_rfb_defconfig
# make V=s FIT_KEY=./../keys/fit_key.crt
```

building **atf (Arm Trust Firmware)**

```shell
# cd atf
# make distclean
# export CROSS_COMPILE=/usr/bin/aarch64-linux-gnu-
# make PLAT="mt7981" BL33=../Uboot-upstream/u-boot.bin BOOT_DEVICE="spim-nand" NMBM=1 NAND_TYPE="spim:2k+64" DRAM_USE_DDR4=0 DDR3_FREQ_2133=1 BOARD_BGA=1 LOG_LEVEL=20 MBEDTLS_DIR=../tools/mbedtls-mbedtls-2.24.0/ TRUSTED_BOARD_BOOT=1 GENERATE_COT=1 ROT_KEY=../keys/fip_private_key.pem BROM_SIGN_KEY=../keys/bl2_private_key.pem all fip
```

building kernel & rootfs

```shell
# git clone --branch openwrt-21.02 https://git.openwrt.org/openwrt/openwrt.git
# cp -Rf tools/mtk-wifi-mt7981/* openwrt/
# echo "src-git mtk_openwrt_feed https://git01.mediatek.com/openwrt/feeds/mtk-openwrt-feeds" >>feeds.conf.default
# cd openwrt
# ./autobuild/clean-staging.sh
# ./autobuild/mt7981-AX3000-sb/lede-branch-build-sanity.sh
```



## 2022.09.8  IGMP version 3

IGMP Snooping

![snoooping](./img/igmp_snooping.bmp)

IGMP proxy

![igmp](./img/igmp_proxy.bmp)



### IGMPv3 Membership Query Message Format

```text
  0                   10                  20                  30
  0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |  Type = 0x11  | Max Resp Code |           Checksum            |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |                         Group Address                         |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 | Resv  |S| QRV |     QQIC      |     Number of Sources (N)     |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |                       Source Address [1]                      |
 +-                                                             -+
 |                       Source Address [2]                      |
 +-                              .                              -+
 .                               .                               .
 .                               .                               .
 +-                                                             -+
 |                       Source Address [N]                      |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

 **Code**: Initialized to zero by the sender; ignored by receivers.

 **Max Resp Code**  field:

  The value is in units of 1/10 second.

 If Max Resp Code < 128, Max Resp Time = Max Resp Code

 If Max Resp code >= 128, Max Resp Time = (mant | 0x10) << (exp + 3)

```text
      0 1 2 3 4 5 6 7
     +-+-+-+-+-+-+-+-+
     |1| exp | mant  |   
     +-+-+-+-+-+-+-+-+
```

(Note :  IGMPv1 MRC 10sec , IGMPv2 MRC 0~25.5 sec , IMPv3  MRC : 0~52.90 minutes )

 **Querier’s Query Interval Code**  field:

 If QQIC < 128, QQI = QQIC

 If QQIC >= 128, QQI = (mant | 0x10) << (exp + 3)

```text
      0 1 2 3 4 5 6 7                      0 1 2 3 4 5 6 7
     +-+-+-+-+-+-+-+-+    Calculate       +-+-+-+-+-+-+-+-+
     |1| exp | mant  |     MAX Val        |1|1 1 1|1 1 1 1|
     +-+-+-+-+-+-+-+-+                    +-+-+-+-+-+-+-+-+
```

 **QRV**: Querier’s Robustness Variable

 **S Flag**: Suppress Router-Side Processing

​           

### IGMPv3 Membership Report Message Format

```text
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |  Type = 0x22  |    Reserved   |           Checksum            |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |           Reserved            |  Number of Group Records (M)  |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 .                                                               .
 .                        Group Record [1]                       .
 .                                                               .
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 .                                                               .
 .                        Group Record [2]                       .
 .                                                               .
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |                               .                               |
 .                               .                               .
 |                               .                               |
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 .                                                               .
 .                        Group Record [M]                       .
 .                                                               .
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

![report](./img/igmp_packet.bmp)



## 2022.09.29

to debugging ``zywifid``  ,  need patch *package/system/procd/patches/000-ZYXEL_init.patch*  , and cmd below:

```shell
# zywlctl loglevel set debug,info,warning
```

WPS  working process.

```text
(key press wps button)
zybtnchk -->  sendMsgHdr->type = ZCFG_MSG_WPS_START_ONBOARDING;
			  sendMsgHdr->srcEid = ZCFG_EID_ZYBTNCHK;
			  sendMsgHdr->dstEid = ZCFG_EID_WIFID;
					|
					|----
					|	
					v			  
zywifid     zyWifiWPSOnboarding --> zymtk_wps_onboarding 
										rm /data/map_cfg_agent_bh_profile.txt
										/usr/bin/wappctrl ra0 wps_pbc
										|
										|--> zymtk_iwpriv_set_ssid
										|--> zymtk_iwpriv_set_radio
```



````shell
 wps key poress                                mesh key press (controller)
        |                                              |
        |                                              |
        v                                              v
ZCFG_MSG_WPS_ACTION_CANCEL    ZCFG_MSG_WPS_START_ONBOARDING    ---->
( esmd send to zywifid)                              |     beWifi_StartWpsOnboarding
        |                                            |
        |                                            |
        |                                            v
        v
ZCFG_MSG_WPS_HWBTN_PRESS or 
ZCFG_MSG_WPS_SWBTN_PRESS
(esmd send to zywifid)
        |
        |
        v
wl_handle->beWifi_StartWpsHWPBC
````



