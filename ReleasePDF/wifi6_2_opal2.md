# 1. Introduction

文档用于将 wifi6 升级至 OPAL系统海外版。

![hw](../img/wifi6_1.jpg)

(Note： wifi6 登录用户名密码为 root/!@34qwer )

 

# 2. Backup File in wifi6

开机进入 wifi6 系统，并备份 wifi cal 文件。

```shell
# cd /usr/local/factory
# tftp -p -l RT30xxEEPROM.bin 192.168.18.7
```

保存 Wifi 6 的 SerialNumber 以及 Mac 信息用于升级后恢复。

```shell
# sys atsh
FW       Version       : 1.00(XXC.0)b4_210128.28.STD
Bootbase Version       : V1.02 | 01/28/2021
Vendor Name            : Suning
Product Model          : SH-LYQ01
HW version             : V1.0
Province               : STD
Serial Number          : 501101000003376
First MAC Address      : 7089CCFF99B8
Last MAC Address       : 7089CCFF99BB
MAC Address Quantity   : 04
Default Country Code   : DE
Boot Module Debug Flag : 00
Kernel      Checksum   : ff5720d0
RootFS      Checksum   : 6fb9e25a
RomFile     Checksum   : 0000f3bb
RomFile-D   Checksum   : N/A
Main Feature Bits      : 00
Other Feature Bits     :
                5a 59 80 0d 00 00 01 37-35 32 38 00 00 00 00 01
                00 00 00 00 00 00 00 00-00 00 00 00 00 00

UserPassword           : rrfrk6#q
SerialNumber81         : 0Y2109028016
WiFi24SSID value       : Biu-p6EY
WpaPskKey              : c7d5cf63
```



# 3.  Upgrade 

下载 OPAL2 Alpha 版下载地址: ``\\172.25.5.39\firmware\WX\HGW-500TX2X2-E v3\Alpha\V535YAC0a1.zip``

进入 zloader 并运行

```shell
ZHAL> atub YAC100.bm
(升级 bootbase)

ZHAL> atbt 1
ZHAL> atur V535YAC0a1.bin,1
(升级完 bootbase 后，再以同样方式升级 kernel & rootfs)

ZHAL> atwz 7089CCFF99D8,1,1,0,16
( zloader update MAC )
```

配置 tftp 服务端如下，并单击 put按钮

![upgrade](E:/Resource/MitrastarNote/img/upgrade1.bmp)





# 4. Recover Backup

进入 zloader 恢复出厂设置 (root, e78a2a88) ， Product Model 为 ``HGW-500TX2X2-E v3`` 则 bootbase 升级成功。

```shell
ZHAL> atbt 1
ZHAL> atcr
Also erase misc partition done.
(擦除 /data 分区，回复出厂设置
ZHAL> atsh
Firmware Version       : V5.35(YAC.0)a1
Bootbase Version       : V1.00 | 06/30/2021  2:40:45
Vendor Name            : ZyXEL
Product Model          : HGW-500TX2X2-E v3
Serial Number          : 5011010000033
First MAC Address      : EC3EB3C9B260
Last MAC Address       : EC3EB3C9B275
MAC Address Quantity   : 22
Default Country Code   : FF
Boot Module Debug Flag : 01
RootFS      Checksum   : d7f4a748
Kernel      Checksum   : 85c8286f
Main Feature Bits      : 00
Other Feature Bits     :
840d893c: 00000000 00000000 00000000 00000000
840d894c: 00000000 00000000 00000000 0000
```

恢复之前备份的 wifi cal 文件， SN 以及 Mac 地址

```shell
# cd /tmp
# tftp -g -r RT30xxEEPROM.bin 192.168.1.7
# mtd writeflash /tmp/RT30xxEEPROM.bin 131072 172032 reservearea
(恢复 wifi cal 文件)

# sys atwz 7089CCFF99B8 FF 01 00 16
# sys atsn 5011010000033
( OPAL Exernal 的 SN 最大长度为 13)
```



# FAQ

###  1.  Update Debug Flag accss Multiboot

修改 Debug Flag 参考  [EX3301_root_pwd.txt](\\172.25.5.39\cpeswdoc\cpesw\Document\SW3 Training Slides\OPAL\Manufacture\EX3301_root_pwd.txt)  ， 需要注意的是使用此文档可以修改 Memory Buffer 中的 Debug Flag ， 同时要求Serial Number 不能为空，否则 ``atse``  返回空值, 之后使用 ``atwz`` 命令写入 mtd flash

```shell
atwz 7089CCFF97B0,ff,1,0,10
```

当 Serial Number 为空时可以使用  [MultiBootSrv_192.168.1.99.exe](\\172.25.5.39\cpeswdoc\cpesw\Document\SW3 Training Slides\OPAL\Manufacture\Multiboot\MultiBootSrv_192.168.1.99.exe.7z)  来修改 Debug Flag，如

![debug_flag](../img/debug_flag.bmp)





### 2.  OPAL Upgarde bootbase & kernel

上电进入 zloader,  使用 ``atub`` 升级 bootbase

```shell
ZHAL> atdc
ZHAL> atub YAC100.bm 
```

重启之后再次进入 zloader ，使用 ``atur`` 升级 Kernel & Rootfs

```shell
ZHAL> atdc
ZHAL> atur V535YAC0b1.bin
```

在 zloader 命令环境下设置mac 地址

```shell
ZHAL> atwz 7089CCFF99EC,ff,1,0,10
(参数分别为 [MAC addr], [Country code], [EngDbgFlag], [FeatureBit], [MAC Number])
```



### 3. OPAL Update wifi calibration

更新 WiFi Cal 文件需要将 RT30xxEEPROM.bin 写入系统的 reservearea 分区， 步骤如下:

1. 打开tftp软件

![upgrade](E:/Resource/MitrastarNote/img/tftp_sop.png)

2. 通过 tftp 软件下载校准文件如RT30xxEEPROM.bin ， 并写入 reservearea 分区

```shell
# cd /tmp/
# tftp -g -r RT30xxEEPROM.bin 192.168.123.7
# mtd writeflash /tmp/RT30xxEEPROM.bin 4096 172032 reservearea
```

(Note: OPAL2 External B1 版本 br0 Mac 地址为 192.168.123.1 )

 

