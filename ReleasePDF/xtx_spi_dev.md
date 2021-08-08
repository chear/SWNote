# SPI Nor Flash Development Guide For Hisi

## Hi-Boot based for hi5630

![hisilicon_arch](..\img\hi_5630.png)

​	hi -boot 是基于 u-boot 裁剪 、修改而来，编译生成目标文件非常小。hi -boot 已经适配了验证 所需的外围芯 外围芯 片，若产品板外围芯片型号与单板上外围芯片型号不同时，需要适当修改相关硬件驱动代码,由于 Hi 5630 内部封装了 DDR 和一个 GEPHY，主要外围芯片为 FLASH 和外置以太 PHY.  ( [HW datasheet](pdf_resource/Hi5630HV110_G.Hn_PLC_datasheet_01.pdf))

**Note:  DDR 地址空间 0x80000000 ~ 0xFFFFFFFF , Flash 的地址空间 0x00000000 ~ 0x03FFFFFF**

hi-boot 主要文件结构如下:

```shell
.
├── applets
│   (应用程序,包括启动内核,hiboot 命令选择界面以及 tftp等)
├── arch
│   (芯片,架构的相关代码， 包括启动代码、CRG等)
├── board
│   (板级适配代码，包括 Flash 兼容,GPIO复用配置等)
├── command
│   (所有命令的实现)
├── drivers
│   (驱动)
├── include
│  	(header)
├── init
│   (启动代码以及环境变量配置)
├── lib
│   (基本 lib 实现以及解压实现)
├── mm
│   (内存管理)
├── multiupg
│   (组播升级)
├── net
│   (协议栈)
├── startcode
│   (第一阶段启动代码)
└── tools
    (压缩工具以及 ddr 初始化实现)
```

Hi-Boot startup flow :

![1556275484136](..\img\hi_startup_process.png)

 



## XTX Nor Flash Datasheet


![xtx_spi_flash](..\img\spi_flash_datasheet.bmp)

**Note:  for this chip to switch std spi and quad spi is cause about driver ,not for hardware link.**



## Status Register
| S7   | S6   | S5   | S4   | S3   | S2   | S1   | S0   |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| SRP0 | BP4  | BP3  | BP2  | BP1  | BP0  | WEL  | WIP  |

**WIP bit**
The Write In Progress (WIP) bit indicates whether the memory is busy in program/erase/write status register progress. When WIP bit sets to 1, means the device is busy in program/erase/write status register progress, when WIP bit sets 0, means the device is not in program/erase/write status register progress.

**WEL bit**
The Write Enable Latch (WEL) bit indicates the status of the internal Write Enable Latch. When set to 1 the
internal Write Enable Latch is set, when set to 0 the internal Write Enable Latch is reset and no Write Status
Register, Program or Erase command is accepted.

**BP4, BP3, BP2, BP1, BP0 bits**
The Block Protect (BP4, BP3, BP2, BP1, BP0) bits are non-volatile. They define the size of the area to be
software protected against Program and Erase commands. These bits are written with the Write Status Register (WRSR) command. When the Block Protect (BP4, BP3, BP2, BP1, BP0) bits are set to 1, the relevant memory area (as defined in Table1) becomes protected against Page Program (PP), Sector Erase (SE) and Block Erase (BE) commands. The Block Protect(BP4, BP3, BP2, BP1, BP0) bits can be written provided that the Hardware Protected mode has not been set. The Chip Erase (CE) command is executed if the Block Protect (BP2, BP1, BP0) bits are 0 and CMP=0 or the Block Protect (BP2, BP1, BP0) bits are 1 and CMP=1.


| S15      | S14  | S13      | S12  | S11  | S10  | S9   | S8   |
| -------- | ---- | -------- | ---- | ---- | ---- | ---- | ---- |
| Reserved | CMP  | HOLD/RST | WPS  | LB1  | LB0  | QE   | SRP1 |

**SRP1, SRP0 bits**
The Status Register Protect (SRP1 and SRP0) bits are non-volatile Read/Write bits in the status register. The
SRP bits control the method of write protection: software protection, hardware protection, power supply lockdown or one-time programmable protection.

**QE bit**
The Quad Enable (QE) bit is a non-volatile Read/Write bit in the Status Register that allows Quad operation.
When the QE bit is set to 0 (Default) the WP# pin and HOLD# pin are enable. When the QE pin is set to 1,
the Quad IO2 and IO3 pins are enabled. (The QE bit should never be set to 1 during standard SPI or Dual SPI operation if the WP# or HOLD# pins are tied directly to the power supply or ground).

**LB1, LB0, bits**
The LB1, LB0, bits are non-volatile One Time Program (OTP) bits in Status Register (S11-S10) that provide
the write protect control and status to the Security Registers. The default state of LB1-LB0 are0, the security
registers are unlocked. The LB1-LB0 bits can be set to 1 individually using the Write Register instruction. The LB1-LB0 bits are One Time Programmable, once its set to 1, 2 pages of Security Registers will become read-only permanently, and the other 2 pages of Security Registers cannot be erased.

**CMP bit**
The CMP bit is a non-volatile Read/Write bit in the Status Register (S14). It is used in conjunction the BP4-
BP0 bits to provide more flexibility for the array protection. Please see the Status register Memory Protection table for details. The default setting is CMP=0.

**WPS bit**
The WPS Bit is used to select which Write Protect scheme should be used. When WPS=0, the device will
use the combination of CMP, BP (4:0) bits to protect a specific area of the memory array. When WPS=1, the device will utilize the Individual Block Locks to protect any individual sector or blocks. The default value for all Individual Block Lock bits is 1 upon device power on or after reset.

**HOLD/RST bit**
The HOLD/RST bit is used to determine whether HOLD# or RESET# function should be implemented on the
hardware pin for 8-pin packages. When HOLD/RST=0, the pin acts as HOLD#, When the HOLD/RST=1, the pin acts as RESET#. However, the HOLD# or RESET# function are only available when QE=0, If QE=1, The HOLD# and RESET# functions are disabled, the pin acts as dedicated data I/O pin.



## Nor Flash Device Driver

Hi5630 只支持 SPI Flash ,相关代码位于 ```driver/mtd/spi``` , 寄存器方式读写 Flash 的驱动已经实现并验证。不同厂商，型号的Flash 兼容相关配置文件在 ```board/hi_sfc_tbl.c``` 里定义。driver 流程如下：

![spi_flow](..\img\hi_spi_flow1.png)

一般的兼容新的 Flash 修改此文件中的全局数组 ```static struct hi_sfc_idc_s g_ast_spi_ids``` 增加新 Flash 的相关信息即可 , *board/hi_sfc_tbl.c*

( flash 设备描述文件,用于存储芯片的板级配置信息，包括芯片名称,  ID,  ID 长度,  芯片大小，擦除块大小，页大小，芯片读取指令（或者高速读取指令），flash 芯片写入指令 （或者高速写入指令）， 擦除指令，以及时钟和 高速读写寄存器配置指令（对于普通读取指令为 HI_NULL） .)

```c
/* spi dev table */
static struct hi_sfc_ids_s g_ast_spi_ids[] ={
    /* chip name | chip id | id len | chip sieze | erase size | page size | write cmd | read cmd | erase cmd | config function */
    /* chear:  XTX  datasheet, for stand or quad SPI r/w. */
    {
        "XT25F128B",        /* chip name */
        {0x0b,0x40,0x18},   /* chip id */
        3,                  /* id len */
        0x1000000,          /* chip sieze  */
        0x10000,            /* erase size */
        0x100,              /* page size */

        /* Standard SPI read/write
         * { dummy byte | write cmd | read cmd }
         */
//        {HI_SFC_IF_STD_E, 0, HI_SPI_CMD_PP } ,    /* write opts*/ 
//        {HI_SFC_IF_STD_E, 0, HI_SPI_CMD_READ},    /* read opts */ 
//        HI_SPI_CMD_SE,
//        HI_SFC_CLK_50M_E,
//        HI_NULL                                   /* set to NULL if not QUAD mode */

        /* QUAD SPI read/write 
         */               
        {HI_SFC_IF_QUADIN_DUALOUT_E, 0, 0x32},     		       /* Quad Page Program  */
        {HI_SFC_IF_QUAD_IO_E, 3, HI_SPI_CMD_READ_QUAD_ADDR},    /* QUAD I/O */
        HI_SPI_CMD_SE,
        HI_SFC_CLK_50M_E,
        hi_sfc_xtx_config        
    }
};

/*
 * Des: used quad spi mode for xtx chip, this sample code for u-boot
 */
static hi_uint32 hi_sfc_xtx_config(hi_void){
    hi_uint32 i;
    hi_uint32 ui_regLow;
    hi_uint32 ui_regHigh;

    /* enable mult I/O mode. */
    for(i=0; i<HI_SFC_MAX_CHIP_CS; i++){
        /* read status reg */
        hi_sfc_drv_read_reg(&ui_regLow, HI_SPI_CMD_RDSR, 1, i);

        /* read config reg */
        hi_sfc_drv_read_reg(&ui_regHigh, HI_SPI_CMD_RDSR2, 1, i);

        /* set QE bit to 1 */
        ui_regHigh |= 1<<1;
        ui_regLow |= ui_regHigh<<8;

        /* write status reg */
        hi_sfc_drv_write_reg(ui_regLow, HI_SPI_CMD_WRSR, 2, i);
    }
    return HI_RET_SUCC;
}
```

*driver/mtd/spi/hi_spi_drv.h*

( 0x10A20000 寄存器描述文件 )

```c
typedef struct 
{
    hi_uint32 ui_sfc_con;               /* (0x00) -SFC模块配置寄存器 */
    hi_uint32 ui_sfc_cmd;               /* (0x04) -命令设置寄存器 */
    hi_uint32 ui_sfc_ins;               /* (0x08) -指令寄存器 */
    hi_uint32 ui_sfc_addr;              /* (0x0c) -地址寄存器 */
    hi_uint32 ui_sfc_databuffer1;       /* (0x10) -数据buffer1寄存器 */
  	...
    hi_uint32 ui_sfc_cmd_databuf64;     /* 0x4fc - 命令操作方式数据Buffer寄存器64*/
}hi_sfc_reg_s;
```




## Kernel Driver

###  Flash Spec Info to Kernel

SPI Flash spec 被通过 TAG 参数形势传给 Kernel 并被解析。其过程如下：

![spi_kernel](..\img\spi_hi-boot_kernel.png)

tag 定义位于 *solution/patch/openwrt/target/linux/hi5630/files/arch/arm/include/uapi/asm/setup.h*， 结构如下：

```c
struct tag {
    struct tag_header hdr;
    union {
        struct tag_cmdline  cmdline;
#if (defined CONFIG_HSAN)
        struct tag_flash    st_flash_info;
#endif
    } u;
};
```

Hi-Boot  部分用于对地址 **0x5441000A** 写入tag 参数，源文件位于 *hisilicon/sdk/boot/hi-boot-ram/applets/boot/hi_bootm.c*

```c
#define HI_BOOTM_ATAG_FLASH         0x5441000A	
/* 产品可参考HSAN工程，将要传递给内核的参数拷贝到flash_tag中 */
static hi_bootm_tag_s *  hi_bootm_setup_flash_tag(hi_bootm_tag_s *pst_params)
{
    hi_uint32 ui_len   = 0;
    hi_uchar8 *puc_buf = (hi_uchar8*)&pst_params->u.st_flashinfo;

    /* 将mtd分区信息读出来，传给kernel*/
    if (hi_boot_read_flash_info(puc_buf, &ui_len))
    {
        return pst_params;
    }

    pst_params->st_hdr.ui_tag  = HI_BOOTM_ATAG_FLASH;
    pst_params->st_hdr.ui_size = ((sizeof(hi_bootm_tag_header_s) + ui_len)>>2) + 1;
    pst_params = hi_bootm_tag_next(pst_params);

    return pst_params;
}
```



Kernel 部分则是从内存 **0x5441000A** 中读取参数， 并且解析 Flash spec 信息 , 源文件位于 *solution/patch/openwrt/target/linux/hi5630/files/arch/arm/kernel/atags_parse.c* 过程如下： 

```c
#if (defined CONFIG_HSAN)
#define ATAG_FLASH          0x5441000a
char g_ac_flash_info[2048];
char *g_pc_flash_info;

static int __init parse_tag_flash(const struct tag *tag)
{
    memcpy(g_ac_flash_info, tag->u.st_flash_info.ac_flash_info, 2048);
    g_pc_flash_info = &g_ac_flash_info[0];
    
    return 0;
}
__tagtable(ATAG_FLASH, parse_tag_flash);
#endif
```

### SPI Register Base

SPI 寄存器通过固定地址传递给kernel, 代码如下

Hi-Boot 部分, 源代码位于 *hisilicon/sdk/boot/hi-boot-ram/drivers/mtd/spi/hi_sfc_drv.c*：

```c
#define HI_SFC_REG_BASE                 0x10A20000

/******************************************************************************
  函数功能:  spi drv first init(to init sfc buffer & reg ioremap)
  输入参数:  host : sfc driver host structure
  输出参数:  无
  函数返回:  0:OK;  -1:ioremap error(kernel only)       
  函数备注:  
******************************************************************************/
hi_int32 hi_sfc_drv_pre_init(struct hi_sfc_host *pst_host)
{    
    /* regbase ioremap */
    g_pst_sfc_reg = (hi_sfc_reg_s *)HI_SFC_REG_BASE;

    /* ioremap */
    pst_host->pv_iobase = (hi_void *)HI_SFC_CS0_BUFFER_BASE;
    
    /* set iobase reg */
    HI_REG_WRITE(&g_pst_sfc_reg->ui_sfc_bus_base_addr_cs0, HI_SFC_CS0_BUFFER_BASE);
    HI_REG_WRITE(&g_pst_sfc_reg->ui_sfc_bus_base_addr_cs1, HI_SFC_CS1_BUFFER_BASE);

    return 0;
}

```



Kernel 部分 ，源文件位于 *solution/patch/openwrt/target/linux/hi5630/files/drivers/mtd/hsan/sfc/hi_sfc_drv.c*：

```c
#define HI_MTD_SFC_REG_BASE_ADDRESS            0x10A20000

/******************************************************************************
  函数功能:  spi drv first init(to init sfc buffer & reg ioremap)
  输入参数:  host : sfc driver host structure
  输出参数:  无
  函数返回:  0:OK;  -1:ioremap error(kernel only)       
  函数备注:  
******************************************************************************/
hi_int32 hi_sfc_drv_pre_init(struct hi_sfc_host *pst_host)
{    
    /* regbase ioremap */
    g_pst_sfc_reg = (hi_sfc_reg_s *)ioremap_nocache(HI_MTD_SFC_REG_BASE_ADDRESS, sizeof(hi_sfc_reg_s));
    if (HI_NULL == g_pst_sfc_reg)
    {
        return -1;
    }
    
    return 0;
}
```



## Tools for debug SPI Flash

source at *command/hi_cmd_sfc.c*

```shell
sfc - sfc sub-system
Usage:
sfc read - addr off|partition size
sfc write - addr off|partition size
    read/write 'size' bytes starting at offset 'off'
    to/from memory address 'addr'.
sfc erase [clean] [off size] - erase 'size' bytes from
    offset 'off' (entire device if not specified)
sfc dump off <size> - dump size of data
sfc wp_set 0|1 - disable/enable spi-flash write protection
sfc status_read - show flash status register value
sfc status_write value - write flash status register with value(0x0~0xff)
	
```

Example:

```shell
hi # sfc read 0x80000000 0x150000 10
( sfc read data.) 
hi # md 0x80000000 10
( memory display )
```

```shell
hi # sfc status_read
status S15 - S0 register: 0x00000200
( to read and display status register.)
```