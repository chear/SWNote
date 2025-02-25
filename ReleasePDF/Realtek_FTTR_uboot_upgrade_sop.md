

# 1. upgrade fpga in uboot

系统上电后按任意键即进入 uboot 命令行，升级 FPGA 分区需要 *fpgafs* 文件

```shell
TAURUS# run upfpga
```



## 2. upgrade bootloader in uboot

升级 bootloader 需要 *taurus_spi_nand_loader.img* 文件，进入uboot 后输入命令为

```shell
TAURUS# run upb
```



## 3. upgrade kernel & rootfs & config & fpga

升级除 bootloader 以外的所有分区。

```shell
TAURUS# run upt
```

