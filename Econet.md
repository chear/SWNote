[TOC]

# 	1.  Arch Introduction

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
│	( DO NOT CARE.s)
├── filesystem
│	( the generate fs at 'filesystem/usr/')
├── global_inc
├── kernel_ext
├── lib_install
├── linux-3.18.21
│	( linux kernel source .)
├── linux-ecnt
│	( Econet kernel source files ,should be copy and replace with-in 'linux-3.18.21' 
│	 by same folder.)
├── modules
├── Project
│	( platform configuration files.)
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
root@:# fakeroot make PROFILE=NP_EN7561D_LE_7592_7613_NORD_64M_demo CUSTOM=CT clean 
root@:# fakeroot make PROFILE=NP_EN7561D_LE_7592_7613_NORD_64M_demo CUSTOM=CT All
root@:# fakeroot make PROFILE=NP_EN7561D_LE_7592_7613_NORD_64M_demo CUSTOM=CT kernel_clean kernel
root@:# fakeroot make PROFILE=NP_EN7561D_LE_7592_7613_NORD_64M_demo CUSTOM=CT bootbase_clean bootbase
root@:# fakeroot make PROFILE=NP_EN7561D_LE_7592_7613_NORD_64M_demo CUSTOM=CT buildimage
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

whole bootloader make command:

```Makefile
make -C bootram  TCSUPPORT_SECURE_BOOT_AES=0 TCSUPPORT_BB_CHECK=1 TCSUPPORT_BB_FIX_UNOPEN=1 TCSUPPORT_SPI_CONTROLLER_ECC=1 TCSUPPORT_SPI_NAND_FLASH_ECC_DMA=1 TCSUPPORT_MIPS_1004K=1 L2CACHE_LOCK_CODE=1 TC3262=1 SIS_DDR_PHY=1 RT63365=1 MT75XX_REDUCE_SIZE=1 TCSUPPORT_CPU_EN7528=1 MT75XX_REDUCE_SIZE=1 TCSUPPORT_CPU_EN7512=1 64M=1 TR068_LED=1 TCSUPPORT_FREE_BOOTBASE=1 CONFIG_DUAL_IMAGE=1 TCSUPPORT_BB_256KB=1 MT75XX_NAND=1 EN7512_NAND=1 TCSUPPORT_10G_FPGA_DDR4=1 SPI_NAND_FLASH_DEBUG=1 SPI_CONTROLLER_DEBUG=0 SPI_ECC_DEBUG=0 SPI_NFI_DEBUG=0 BOOT_LZMA_SUPPORT=1

```



## 4. Image process

```mermaid
graph LR
prepare[build image] -->|cat * > allinone|cat(padding)
	cat -->|byteswap| byteswap(little endian)
	byteswap -->|trx| trx(add crc head)
    trx -->|add oob&hard|final[tclinux_allinone_nand]
```

```Makefile
cat tcboot.bin padding_b ctromfile.cfg padding_f tclinux.bin > tclinux_allinone
```

misc image layout (based on en7528)

```shell
       0x000007000000 -------------------|
                    |    reservearea     |
       0x000006dc0000 -------------------|
                    |     ...            |
       0x000005280000 -------------------|
                    |     plugin         |
       0x000004e80000 -------------------|
                    |     log            |
       0x000004c80000 -------------------|
                    |     ubifs          |
       0x000003880000 -------------------|
                    |     opt1           |
       0x000003880000 -------------------|
                    |     opt0           |
          0x002880000 -------------------|------------------------------------
                    |     linux  B       |	tclinux_slave.bin,zize=0x1400000
                    |     rootfs B       |  (20M)
          0x001480000 -------------------|------------------------------------
                    |     rootfs A       |                      
           			| -------------------|  tclinux.bin size=0x50000
                    |     kernel A       |  (20M)
             0x080000 -------------------|------------------------------------
                    |     romfile        |  romfile.gz, size=0x40000 (256k)
             0x040000 -------------------|------------------------------------
                    |     bootloader     |	tcboot.bin, size=0x40000 (256k)
             0x000000 -------------------|------------------------------------
```



## 4.1 process to building tclinux.bin

making tclinux.bin based for en7528 , profile based CT_EN7561D_LE_7592_7613_AP_demo

```Makefile
make -j 16 -C /home/chear/MTK/tclinux_phoenix_ctc_20200308/linux-3.18.21 linux.7z
../tools/lzma e linux.bin linux.7z
../tools/trx/trx -f linux.7z -o linux.7z.trx -c ../tools/trx/trx_config
../../tools/trx/trx -k 4149365 -r 15364054 -u 0x80002000 -f tclinux -o tclinux.bin -c ../../tools/trx/trx_config
```



## 5. CFG command

```shell
# tcapi show Account_TelnetEntry
OID [183:1][TelnetEntry]:
	[Active = Yes]
	[telnet_username = e8telnet]
	[telnet_passwd = e8telnet]
	[telnet_port = 23]

# tcapi set Account_MfgMode Active "Yes"
(Note: update romfiles)
# tcapi save

# prolinecmd restore default

# sys led on
```

**(Note:  default backup romfile path: userfs/romfile.cfg , running romfile path: /dev/mtdblock1 )**

​	





Econet restore default command:

```shell
# prolinecmd romfileselect set ctromfile_prd.cfg
# tcapi show System_Entry 
# prolinecmd restore default
```

