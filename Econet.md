# 1.  Arch Introduction

![econet_arch](img/econet_arch.bmp)



# 2. Download & Building Source

Source File Tree, files structure based on Econet en_7580 sdk.

```shell
root@michael-HP-Pro-3330-MT:/home/michael/Code/michael/7528/org# tree ./ -d -L 1
./
├── app_bsp
├── apps
├── bootrom
│	(bootloader source file)
├── doc
├── filesystem
├── global_inc
├── kernel_ext
├── lib_install
├── linux-3.18.21
│	(linux kernel)
├── linux-ecnt
├── modules
├── Project
├── tools
├── version
└── windows_rndis_driver
```



## 2.1 Make Building

decompress SDK and building the source

```shell
root@:# mkdir -p releasebsp
root@:# cp releasebsp_profilename_relasedate.tgz ./releasebsp
root@:# tar -xzvf releasebsp_profilename_relasedate.tgz
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT clean 
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT All
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT kernel_clean kernel
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT bootbase_clean bootbase
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT buildimage
```

generate image at  ''*releasebsp/Project/images/tcboot.bin* " , "*releasebsp/Project/images/tclinux.bin*"

to build misc image by following:

```shell
root@:# ./addoob tclinux_allinone_nand tclinux_allinone_nand_ecc 2048 64
root@:# ./addhdr tclinux_allinone_nand_ecc ap_mstc.bin
```





# 3. BootLoader

Source file tree (based  on en7528). 

```shell
bootrom/
├── start.S_7510_final 
│	(Boot1 assembly code to init CPU,clock,  calibration DDR, )
├── strat.S
│	(copy from "start.S_7510_final".)
├── bootram/
│	(main bootbase driver such as network ,flash and bootbase command.)
├── ddr_cal_en7512/
│	( )	
├── spram_ext/
├── lzma/
├── unopen_img/
├── verify/
├── bootload.c
├── header.c
├── byteswap.c
├── lzmaload.c
├── mic.c
│	( copy 'mi.cfg' and make to global var on tcboot.bin)
├── make_bootbase
└── Makefile
```

(Note: the Econet's boot-loader same as u-boot, driver's source files at  *bootrom/bootram* )



## 4. Make flash misc image

```mermaid
graph LR
prepare[build image] -->|cat * > allinone|cat(padding)
	cat -->|byteswap| byteswap(little endian)
	byteswap -->|trx| trx(add crc head)
    trx -->|add oob&hard|final[tclinux_allinone_nand]
```



## 5. CFG command

```shell
# tcapi show Account_TelnetEntry
OID [183:1][TelnetEntry]:
	[Active = Yes]
	[telnet_username = e8telnet]
	[telnet_passwd = e8telnet]
	[telnet_port = 23]

# prolinecmd restore default

# sys led on
```



