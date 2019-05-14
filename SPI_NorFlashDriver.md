## Nor Flash 

- Nor Flash 像内存一样是直接挂在系统总线上的，这样有足够多的地址线使得CPU能够寻址到每一个存储单元上去，这也意味着CPU能够直接通过总线访问 Nor Flash 上存储的内容，同时它还支持XIP（片选内存上执行，不用将代码拷贝到内存中，直接在 Nor Flash 上就能运行）。
- 相比较于 Nand Flash ， Nor Flash 读取速度更快，擦除和写入速度则更慢，且没有坏块。


## Glossary

- VCC, VDD, VSS：C=circuit 表示电路的意思, 即接入电路的电压， D=device 表示器件的意思, 即器件内部的工作电压，在普通的电子电路中，一般Vcc>Vdd !  ( VSS) :S=series 表示公共连接的意思，也就是负极。
(Note: 在电子电路中，VCC是电路的供电电压, VDD是芯片的工作电压,有些IC 同时有VCC和VDD， 这种器件带有电压转换功能。)

- CPOL : indicates the initial clock polarity.  CPOL=0 means the clock starts low, so the first (leading) edge is rising, and the second (trailing) edge is falling.  CPOL=1 means the clock starts high, so the first (leading) edge is falling.

- CPHA : indicates the clock phase used to sample data; CPHA=0 says sample on the leading edge, CPHA=1 means the trailing edge.  Since the signal needs to stablize before it's sampled, CPHA=0  implies that its data is written half a clock before the first clock edge.  The chipselect may have made it become available.

## SPI Summary

The **SPI ( Serial Peripheral Interface)**  is a synchronous four wire serial link used to connect microcontrollers to sensors, memory, and peripherals , widely used with embedded systems. It is a simple and efficient interface: basically a multiplexed shift register, not complicated enough to acquire a standardization body.  SPI uses a master/slave configuration.

The three or four signal wires hold a clock (**SCK**, often in the range of 1-20 MHz), a **“Master Out, Slave In” (MOSI)** data line,  a **“Master In, Slave Out” (MISO)** data line , and  **Chip Select (CS) ,other word SS  **.
(Other names are also used.) 

![spi_interface](img\spi_interface.png)

SPI is a full duplex protocol; for each bit shifted out the MOSI line (one per clock) another is shifted in on the MISO line. Those bits are assembled into words of various sizes on the way to and from system memory. An additional chipselect line is usually active-low (nCS); four signals are normally used for each peripheral, plus sometimes an interrupt. 

![spi_transmission](img\spi_transmission.png)

There are four clocking modes through which data is exchanged; mode-0 and mode-3 are most commonly used.  Each clock cycle shifts data out and data in; the clock doesn't cycle except when there is a data bit to shift.  Not all data bits are used though; not every protocol uses those full duplex capabilities.

![spi-bus-timing](img\spi-bus-timing.jpg)

![SPIModes](img\SPIModes.jpg)

[explaing about CPOL & CPHA ](https://blog.csdn.net/ce123_zhouwei/article/details/6923293)

## SPI Linux programming

The SPI bus facilities listed in Linux provide a generalized interface to declare SPI busses and devices, manage them according to the standard Linux driver model, and perform input/output operations.

The programming interface is structured around two kinds of driver, and two kinds of device. A “Controller Driver” abstracts the controller hardware, which may be as simple as a set of GPIO pins or as complex as a pair of FIFOs connected to dual DMA engines on the other side of the SPI shift register (maximizing throughput). Such drivers bridge between whatever bus they sit on (often the platform bus) and SPI, and expose the SPI side of their device as a `struct spi_master`. 

SPI devices are children of that master, represented as a [`struct spi_device`](https://www.kernel.org/doc/html/v4.14/driver-api/spi.html#c.spi_device) and manufactured from [`struct spi_board_info`](https://www.kernel.org/doc/html/v4.14/driver-api/spi.html#c.spi_board_info) descriptors which are usually provided by board-specific initialization code. A [`struct spi_driver`](https://www.kernel.org/doc/html/v4.14/driver-api/spi.html#c.spi_driver) is called a “Protocol Driver”, and is bound to a spi_device using normal driver model calls.

The I/O model is a set of queued messages. Protocol drivers submit one or more [`struct spi_message`](https://www.kernel.org/doc/html/v4.14/driver-api/spi.html#c.spi_message) objects, which are processed and completed asynchronously. (There are synchronous wrappers, however.) Messages are built from one or more [`struct spi_transfer`](https://www.kernel.org/doc/html/v4.14/driver-api/spi.html#c.spi_transfer) objects, each of which wraps a full duplex SPI transfer. A variety of protocol tweaking options are needed, because different chips adopt very different policies for how they use the bits transferred with SPI.





## XTX SPI Flash Datasheet  --(XT25F128B)

![xtx_spi_flash](img\spi_flash_datasheet.bmp)

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

![spi_flow](img\hi_spi_flow1.png)

一般的兼容新的 Flash 修改此文件中的全局数组 ```static struct hi_sfc_idc_s g_ast_spi_ids``` 增加新 Flash 的相关信息即可, FLASH ID 定义如下:

```c
/* spi chip 器件列表属性 */
struct hi_sfc_ids_s {
    hi_char8    *pc_name;
    hi_uchar8   uac_id[HI_SPI_ID_MAX_LEN];
    hi_uint32   ui_id_len;
        
    hi_uint32   ui_chip_size;
    hi_uint32   ui_erase_size;
    hi_uint32   ui_page_size;
        
    hi_sfc_ops  st_wr_ops;
    hi_sfc_ops  st_rd_ops;
        
    hi_uchar8 uc_erase_cmd;
        
    hi_sfc_clk_e em_if_clk;
    hi_uint32 (*config)(hi_void);
};
```



*board/hi_sfc_tbl.c*

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

struct hi_sfc_ids_s *hi_sfc_tbl_get_flash_type(hi_uchar8 *puc_id){
    struct hi_sfc_ids_s *pst_spi_dev;
    if(HI_NULL == puc_id){
        return HI_NULL;
    }
    /* lookup the flash id */
    for (pst_spi_dev = g_ast_spi_ids; pst_spi_dev->ui_id_len; pst_spi_dev++){
        if (hi_memcmp(puc_id, pst_spi_dev->uac_id, pst_spi_dev->ui_id_len)){
            continue;
        }
        return pst_spi_dev;
    }
    return HI_NULL; 
}
```

*driver/mtd/hi_flash.c*

( flash 层描述文件，用以加载 nand flash 或者 nor flash 驱动程序， 当前 hi5360 解决方案只支持 nor flash . )

```c
/* only support SPI flash for now.*/
hi_uint32 hi_flash_init(hi_void){
    hi_uint32 ui_ret = HI_RET_SUCC;
    hi_flash_type_e em_type = hi_flash_get_type();
    switch (em_type){
#ifdef HI_CFG_BUILD_SPI
        case HI_FLASH_TYPE_SPI_E :
            ui_ret = hi_sfc_init(CONFIG_MTD_HISI_SFC_CHIPNUM);
            if (HI_RET_SUCC != ui_ret){
                return HI_RET_FAIL;
            } 
            ui_ret = hi_flash_regfunc(&g_st_sfc_reg);   
            break;
#endif

#ifdef HI_CFG_BUILD_NAND
        case HI_FLASH_TYPE_NAND_E :
            ui_ret = hi_nand_init();
            if (HI_RET_SUCC != ui_ret){
                return ui_ret;
            }
            ui_ret = hi_flash_regfunc(&g_st_nand_reg);  
            break;
#endif
        default:
            ui_ret = HI_RET_NOTSUPPORT;
            break;
    }
    return ui_ret;
}
```



*driver/mtd/spi/hi_spi.c*

( SPI 设备描述文件，首先向芯片发送读取指令，之后根据返回芯片ID , 加载不同的芯片配置信息，并且加载 SPI 驱动，是 hsan 重要的一部分。)

```c
hi_uint32 hi_sfc_init(hi_uint32 ui_chip_num){
    if (hi_sfc_probe(ui_chip_num)){
        return HI_RET_FAIL;
    }
    return HI_RET_SUCC;
}


/******************************************************************************
  函数功能:  spi flash probe entry
  输入参数:  无
  输出参数:  无
  函数返回:  0:OK;   -1:NOK
  函数备注:  
******************************************************************************/
static hi_int32 hi_sfc_probe(hi_uint32 ui_chip_num){
    hi_int32 i_ret      = 0;
    struct hi_sfc_chip *pst_chip    = HI_NULL;
    struct hi_sfc_host *pst_host    = HI_NULL;

    /* 申请连续的内存空间，方便统一管理*/
    struct mtd_info *pst_mtd        = HI_NULL;
    hi_uint32 ui_host_size = sizeof(struct hi_sfc_host) + sizeof(struct hi_sfc_chip) + sizeof(struct mtd_info);

    g_pst_sfc_host = pst_host = (struct hi_sfc_host *)hi_malloc(ui_host_size);
    if (HI_NULL == pst_host){
        return -1;
    }
    
    hi_memset((hi_char8 *)pst_host, 0, ui_host_size);

    pst_host->pst_chip = pst_chip = (struct hi_sfc_chip *)&pst_host[1];     //point to host+sizeof(struct hi_sfc_host)
    pst_chip->pv_priv  = pst_host;

    pst_host->pst_mtd  = pst_mtd  = (struct mtd_info *)&pst_chip[1];        //point to host+sizeof(struct hi_sfc_host)+sizeof(struct sfc_chip)
    pst_mtd->priv      = pst_chip;

    /* sfc pre_init,init the sfc buffer and reg remap */
    i_ret = hi_sfc_drv_pre_init(pst_host);
    if (i_ret){
        hi_free(pst_host);
        return -1;
    }

    /* Get the flash manufacturer id and lookup if the type is supported */
    i_ret = hi_sfc_chip_init(pst_chip, ui_chip_num);
    if (i_ret){
        hi_free(pst_host);
        return i_ret;
    }
    /* spi controller innit */
    if (hi_sfc_drv_init(pst_host)){
        hi_free(pst_host);
        return -1;
    }   
    hi_sfc_mtd_contact(pst_mtd);
    return 0;
}
```

*driver/mtd/spi/hi_spi.drv.c*

( SPI Nor Flash 驱动文件，封装芯片的读写，擦除指令，并且将芯片的块大小， 页大小写入特定寄存器， 传入Linux ，Linux 取得上诉信息后即可读写块。)

```c
/******************************************************************************
  函数功能:  spi drv init
  输入参数:  host : spi driver host structure
  输出参数:  无
  函数返回:      
  函数备注:  
******************************************************************************/
hi_int32 hi_sfc_drv_init(struct hi_sfc_host *pst_host) {
    hi_uint32               ui_reg_value;
    hi_sfc_bus_config1_u    un_reg_sfc_bus_config1;
    hi_sfc_bus_flash_size_u un_reg_sfc_bus_flash_size;
    struct hi_sfc_chip *pst_chip = pst_host->pst_chip;

    hi_memset(&un_reg_sfc_bus_config1,    0, sizeof(hi_sfc_bus_config1_u)   );
    hi_memset(&un_reg_sfc_bus_flash_size, 0, sizeof(hi_sfc_bus_flash_size_u));
    
    /* 根据器件参数配置SFC con寄存器，未赋值的bit按默认值0 */
    un_reg_sfc_bus_config1.st_bits.rd_ins           = pst_chip->st_spec.st_rd_ops.uc_cmd;
    un_reg_sfc_bus_config1.st_bits.rd_mem_if_type   = pst_chip->st_spec.st_rd_ops.em_mem_if_type;
    un_reg_sfc_bus_config1.st_bits.rd_dummy_bytes   = pst_chip->st_spec.st_rd_ops.uc_dummy_bytes;
    un_reg_sfc_bus_config1.st_bits.wr_ins           = pst_chip->st_spec.st_wr_ops.uc_cmd;
    un_reg_sfc_bus_config1.st_bits.wr_mem_if_type   = pst_chip->st_spec.st_wr_ops.em_mem_if_type;
    un_reg_sfc_bus_config1.st_bits.wr_dummy_bytes   = pst_chip->st_spec.st_wr_ops.uc_dummy_bytes;
    HI_REG_WRITE(&g_pst_sfc_reg->ui_sfc_bus_config1, un_reg_sfc_bus_config1.ui_value);

    /* 根据实际Flash大小配置BUS_FLASH_SIZE */
    HI_REG_READ(&g_pst_sfc_reg->ui_sfc_bus_flash_size, un_reg_sfc_bus_flash_size.ui_value);
    un_reg_sfc_bus_flash_size.st_bits.flash_size_cs0 = hi_sfc_drv_get_bus_flash_size(pst_chip->st_spec.ui_chip_size);
    un_reg_sfc_bus_flash_size.st_bits.flash_size_cs1 = un_reg_sfc_bus_flash_size.st_bits.flash_size_cs0;
    HI_REG_WRITE(&g_pst_sfc_reg->ui_sfc_bus_flash_size, un_reg_sfc_bus_flash_size.ui_value);
    
    /* GPIO SPI管脚功能选通 */
    HI_REG_READ (HI_REG_BASE_TOP+0x0, ui_reg_value);
    ui_reg_value |= 0x1<<9;
    HI_REG_WRITE(HI_REG_BASE_TOP+0x0, ui_reg_value);
    
    /* 判断是否quad模式，quad模式需要配置HOLD及wp管脚复用 */
    if( pst_chip->st_spec.st_rd_ops.em_mem_if_type == HI_SFC_IF_QUADIN_DUALOUT_E
     || pst_chip->st_spec.st_rd_ops.em_mem_if_type == HI_SFC_IF_QUAD_IO_E
     || pst_chip->st_spec.st_rd_ops.em_mem_if_type == HI_SFC_IF_FULL_QIO_E
     || pst_chip->st_spec.st_wr_ops.em_mem_if_type == HI_SFC_IF_QUADIN_DUALOUT_E
     || pst_chip->st_spec.st_wr_ops.em_mem_if_type == HI_SFC_IF_QUAD_IO_E
     || pst_chip->st_spec.st_wr_ops.em_mem_if_type == HI_SFC_IF_FULL_QIO_E){
        HI_REG_READ (HI_REG_BASE_TOP+0x0, ui_reg_value);
        ui_reg_value |= 0x3<<10;
        HI_REG_WRITE(HI_REG_BASE_TOP+0x0, ui_reg_value);
    }

#ifdef HI_SFC_DMA_RW
    /* dma init */
    hi_sfc_drv_dma_init(pst_host);
#endif

    hi_sfc_drv_read_id(0, &g_chip_mk_id, 1); 

    return 0;
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
    hi_uint32 ui_sfc_databuffer2;       /* (0x14) -数据buffer2寄存器 */
    hi_uint32 ui_sfc_databuffer3;       /* (0x18) -数据buffer3寄存器 */
    hi_uint32 ui_sfc_databuffer4;       /* (0x1c) -数据buffer4寄存器 */
    hi_uint32 ui_sfc_databuffer5;       /* (0x20) -数据buffer5寄存器 */
    hi_uint32 ui_sfc_databuffer6;       /* (0x24) -数据buffer6寄存器 */
    hi_uint32 ui_sfc_databuffer7;       /* (0x28) -数据buffer7寄存器 */
    hi_uint32 ui_sfc_databuffer8;       /* (0x2c) -数据buffer8寄存器 */
    hi_uint32 ui_sfc_cs0config;         /* (0x30) -片选0配置寄存器 */
    hi_uint32 ui_sfc_cs1config;         /* (0x34) -片选1配置寄存器 */
    hi_uint32 ui_sfc_cs0baseaddr;       /* (0x38) -片选0基址寄存器 */
    hi_uint32 ui_sfc_cs1baseaddr;       /* (0x3c) -片选1基址寄存器 */
    hi_uint32 ui_sfc_cs1aliasaddr;      /* (0x40) -片选1的别名基地址寄存器 */
    hi_uint32 ui_sfc_timing;            /* (0x44) -设置时序参数寄存器 */
    hi_uint32 ui_reserve1[2];           /* 0x58-0x4c -保留 */
    hi_uint32 ui_sfc_intrawstatus;      /* (0x50) -中断原始状态寄存器 */
    hi_uint32 ui_sfc_intstatus;         /* (0x54) -经过屏蔽的中断状态寄存器 */
    hi_uint32 ui_sfc_intmask;           /* (0x58) -中断屏蔽寄存器 */
    hi_uint32 ui_sfc_intclear;          /* 0x5c - 中断屏清除存器*/
    hi_uint32 ui_reserve2[40];          /* 0x60-0xfc - 保留 */
    hi_uint32 ui_sfc_global_config;     /* 0x100 -全局配置寄存器 */
    hi_uint32 ui_reserve3[3];           /* 0x104-0x10c - 保留 */
    hi_uint32 ui_sfc_timing2;           /* 0x110 - Timing配置寄存器*/
    hi_uint32 ui_reserve4[3];           /* 0x114-0x11c - 保留 */
    hi_uint32 ui_sfc_int_raw_status;    /* 0x120 - 中断原始状态寄存器 */
    hi_uint32 ui_sfc_int_status;        /* 0x124 - 经过屏蔽处理的中断状态寄存器 */
    hi_uint32 ui_sfc_int_mask;          /* 0x128 - 中断屏蔽寄存器 */
    hi_uint32 ui_sfc_int_clear;         /* 0x12c - 中断清除寄存器*/
    hi_uint32 ui_reserve5[50];          /* 0x114-0x11c - 保留  */
    hi_uint32 ui_sfc_version;           /* 0x1f8 - 版本寄存器 */
    hi_uint32 ui_sfc_version_sel;       /* 0x1fc - 版本选择寄存器 */
    hi_uint32 ui_sfc_bus_config1;       /* 0x200 - 总线操作方式配置寄存器 */
    hi_uint32 ui_sfc_bus_config2;       /* 0x204 - 总线操作方式配置寄存器*/
    hi_uint32 ui_reserve6[2];           /* 0x208-0x20c - 保留  */
    hi_uint32 ui_sfc_bus_flash_size;    /* 0x210 - 总线操作方式映射尺寸寄存器 */
    hi_uint32 ui_sfc_bus_base_addr_cs0; /* 0x214 - 总线操作方式片选0映射基地址寄存器*/
    hi_uint32 ui_sfc_bus_base_addr_cs1; /* 0x218 - 总线操作方式片选1映射基地址寄存器*/
    hi_uint32 ui_sfc_bus_alias_addr;    /* 0x21c - 总线操作方式Alias映射基地址寄存器*/
    hi_uint32 ui_sfc_bus_alias_cs;      /* 0x220 -总线操作方式Alias片选指示寄存器 */
    hi_uint32 ui_reserve7[55];          /* 0x220-0x2fc - 保留  */
    hi_uint32 ui_sfc_cmd_config;        /* 0x300 -命令操作方式配置寄存器 */
    hi_uint32 ui_reserve8[1];           /* 0x304 - 保留  */
    hi_uint32 ui_sfc_cmd_ins;           /* 0x308 -命令操作方式指令寄存器 */
    hi_uint32 ui_sfc_cmd_addr;          /* 0x30c -命令操作方式地址寄存器 */
    hi_uint32 ui_reserve9[60];          /* 0x310-0x3fc - 保留  */
    hi_uint32 ui_sfc_cmd_databuf1;      /* 0x400 - 命令操作方式数据Buffer寄存器1*/
    hi_uint32 ui_reserve10[62];         /* 0x404-0x4f8 - 命令操作方式数据Buffer寄存器2~63 */
    hi_uint32 ui_sfc_cmd_databuf64;     /* 0x4fc - 命令操作方式数据Buffer寄存器64*/
}hi_sfc_reg_s;
```

## Kernel Driver

###  Flash Spec Info to Kernel

SPI Flash spec 被通过 TAG 参数形势传给 Kernel 并被解析。其过程如下：

![spi_kernel](img\spi_hi-boot_kernel.png)



‘tag‘ 定义位于 *solution/patch/openwrt/target/linux/hi5630/files/arch/arm/include/uapi/asm/setup.h*， 结构如下：

```c
struct tag {
    struct tag_header hdr;
    union {
        struct tag_core     core;
        struct tag_mem32    mem;
        struct tag_videotext    videotext;
        struct tag_ramdisk  ramdisk;
        struct tag_initrd   initrd;
        struct tag_serialnr serialnr;
        struct tag_revision revision;
        struct tag_videolfb videolfb;
        struct tag_cmdline  cmdline;
#if (defined CONFIG_HSAN)
        struct tag_flash    st_flash_info;
#endif
        /*
         * Acorn specific
         */
        struct tag_acorn    acorn;

        /*
         * DC21285 specific
         */
        struct tag_memclk   memclk;
    } u;
};
```



#### Hi-Boot Part

Hi-Boot  部分用于对地址 **0x5441000A** 写入tag 参数，源文件位于 *hisilicon/sdk/boot/hi-boot-ram/applets/boot/hi_bootm.c*

```c
#define HI_BOOTM_ATAG_FLASH         0x5441000A	
/* 产品可参考HSAN工程，将要传递给内核的参数拷贝到flash_tag中 */
static hi_bootm_tag_s *  hi_bootm_setup_flash_tag(hi_bootm_tag_s *pst_params){
    hi_uint32 ui_len   = 0;
    hi_uchar8 *puc_buf = (hi_uchar8*)&pst_params->u.st_flashinfo;
    /* 将mtd分区信息读出来，传给kernel*/
    if (hi_boot_read_flash_info(puc_buf, &ui_len)){
        return pst_params;
    }
    pst_params->st_hdr.ui_tag  = HI_BOOTM_ATAG_FLASH;
    pst_params->st_hdr.ui_size = ((sizeof(hi_bootm_tag_header_s) + ui_len)>>2) + 1;
    pst_params = hi_bootm_tag_next(pst_params);
    return pst_params;
}
```



#### Kernel Part

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

Hi-Boot 部分：

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



Kernel 部分：

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

*command/hi_cmd_sfc.c*

```c
hi_int32 hi_cmd_sfc_read(hi_cmd_tbl_t *pst_cmd, hi_int32 i_flag, hi_int32 i_argc, hi_char8 *pc_argv[])
{
    hi_uint32 ui_addr   = 0;
    hi_uint32 ui_offset = 0;
    hi_uint32 ui_len    = 0;
    
    if (i_argc < 5)
    {
        hi_cmd_usage(pst_cmd);
        return HI_RET_INVALID_PARA;
    }
    
    ui_addr   = hi_atoul(pc_argv[2], HI_NULL, 16);
    ui_offset = hi_atoul(pc_argv[3], HI_NULL, 16);
    ui_len    = hi_atoul(pc_argv[4], HI_NULL, 16);
    
    return (hi_int32)hi_sfc_read((hi_uchar8*)ui_addr, ui_offset, ui_len);
}
```
*driver/mtd/spi/hi_spi.c*

```c
/******************************************************************************
  函数功能:  sfc write data
  输入参数:  puc_buf   : data buffer
             ui_offset : start address
             ui_len    : read len
  输出参数:  无
  函数返回: 0:OK; -1:NOK
  函数备注:  
******************************************************************************/
hi_int32 hi_sfc_read( hi_uchar8 *puc_buf, hi_uint32 ui_offset, hi_uint32 ui_len )
{
    hi_uint32 ui_retlen;
    struct mtd_info *pst_mtd = g_pst_sfc_host->pst_mtd;
    
    return hi_sfc_mtd_read(pst_mtd, ui_offset, ui_len, &ui_retlen, puc_buf);
}
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





## Sample for repo "HomeStarV200R001C02SPC030T"

```shell
To seprate building kernel or boot.
# make source mod=boot
# make source mod=kernel
```

Debug with in Hi-boot

```shell
bootrom >loady 0x16344400
bootrom >run 0x16344400
( upload ddrinit64m.bin access X-Modem used to initialize ddr RAM)

bootrom >loady 0x80010000
bootrom >run 0x80010000 
(loading hi_boot.bin to board.)
```

To whole update system , at first earse the env partitions, then use tftp to update **hi_boot.bin**  , **kernel.imgs** and **rootfs.squashfs**

```shell
hi #sfc erase 0x150000 0x10000
hi #menu
##### Menu #####
[0] Update bootbin
[2] Update kernela and rootfsa
[3] Update rootfsa
[4] Update kernela
[8] Recover default environment
[9] Boot kernel from tftp
[r] Reboot
[e] Enter cmdline
Please enter your selection: 0

##### Menu #####
[0] Update bootbin
[2] Update kernela and rootfsa
[3] Update rootfsa
[4] Update kernela
[8] Recover default environment
[9] Boot kernel from tftp
[r] Reboot
[e] Enter cmdline
Please enter your selection: 2
```



## FAQ

### 1.  what about uart, SPI , i2c and CAN , and what's mean different
一般设备和设备之间的通讯，无非就是发送数据和接收数据，问题就在这里，不考虑两条电源线的情况下要多少根线来收发数据？这里Motorola公司就提出一种方案：

1.[SPI](https://www.baidu.com/s?wd=SPI&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)--Serial Peripheral Interface串行外围设备接口，是一种三线同步总线，即由1根发送线+1根接收线+1根时钟线（数据传送时序控制线）构成，由于发送和接收线是独立的，所以发送和接收可以同时进行。
(注：时钟线，简单来说，就是用来决定数据什么时候发送和什么时候不发送的，这样是为了两设备之间的同步数据传输，也可以说是数据传送指令线。)

2.[UART](https://www.baidu.com/s?wd=UART&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)(Universal Asynchronous Receiver Transmitter：通用异步收发器，也就是人们常说的串口。它其实就是[SPI](https://www.baidu.com/s?wd=SPI&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的基础上少了时钟线构成的，即由1根发送线+1根接收线构成。没有时钟线，那它怎么保证数据传送的同步性和准确性呢？这时就规定了，发送端的设备和接收端的设备发送数据和接收数据的速度必须保证相同。怎么个相同法，人们规定这个速度叫做波特率，即串口一旦工作，发送端就会按照事前设计好的波特率来发送数据，接收端也是按这个波特率来接收数据，这样就实现同步了，所以串口比较复杂，因为它需要一个波特率发生器为它提供波特率。

3.I2C--INTER-IC(INTER IC BUS：意为IC之间总线)串行总线的缩写，是PHILIPS公司推出的芯片间串行传输总线。串行总线是相对于并行总线来说的，单片机经常用到P0口来做多设备通讯的数据总线，一个8位并行数据总线，这里的串行总线即是相对这个说的。IIC由1根串行数据线（SDA）+1根串行时钟线（SCL）构成，实现了双工的同步数据传输（双向传输）。有人会凝问，一根线作为总线就算了，但是它怎么实现双向传输数据呢？你可别忘了，它还有一根时钟线，作用同spi的时钟线。所以总结一下，数据传输说白了就两种方式：有时钟线和无时钟线。至于是1根串行的数据线还是2根独立收发的数据线，就看实际场合的应用了，一根串行数据传送数据的缺点很明显，不能同时收发造就了它的不灵活性和速度慢的缺点，而有时钟线的缺点就是线多，所以IIC就是为了减少线的数量的情况下诞生的产物。无时钟线的缺点就是同步同题，两个设备使用[uart](https://www.baidu.com/s?wd=uart&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)通讯之前一定要设置好一致的波特率。所以不难看出，uart就是以上所有缺点中最好的选择，只要事先设置好一致的波特率，那么以后的通讯只需2条线，并且这时就具有SPI的优点（双向同步）又有IIC的优点(线少)，以上就是我个人的理解.



一、SPI总线说明

串行外围设备接口SPI（serial peripheral interface）总线技术是Motorola公司推出的一种同步串行接口，Motorola公司生产的绝大多数MCU（微控制器）都配有SPI硬件接口，如68系列MCU。SPI 用于CPU与各种外围器件进行全双工、同步串行通讯。SPI可以同时发出和接收串行数据。它只需四条线就可以完成MCU与各种外围器件的通讯，这四条线是：串行时钟线（CSK）、主机输入/从机输出数据线（MISO）、主机输出/从机输入数据线（MOSI）、低电平有效从机选择线CS。这些外围器件可以是简单的TTL移位寄存器，复杂的LCD显示驱动器，A/D、D/A转换子系统或其他的MCU。当SPI工作时，在移位寄存器中的数据逐位从输出引脚（MOSI）输出（高位在前），同时从输入引脚（MISO）接收的数据逐位移到移位寄存器（高位在前）。发送一个字节后，从另一个外围器件接收的字节数据进入移位寄存器中。主SPI的时钟信号（SCK）使传输同步。其典型系统框图如下图所示。

SPI主要特点有: 可以同时发出和接收串行数据;

- 可以当作主机或从机工作;
- 提供频率可编程时钟;
- 发送结束中断标志;
- 写冲突保护;
- 总线竞争保护等。

 SPI 模块为了和外设进行数据交换，根据外设工作要求，其输出串行同步时钟极性和相位可以进行配置，时钟极性（CPOL）对传输协议没有重大的影响。如果 CPOL="0"，串行同步时钟的空闲状态为低电平；如果CPOL=1，串行同步时钟的空闲状态为高电平。时钟相位（CPHA）能够配置用于选择两种不同的传输协议之一进行数据传输。如果CPHA=0，在串行同步时钟的第一个跳变沿（上升或下降）数据被采样；如果CPHA=1，在串行同步时钟的第二个跳变沿（上升或下降）数据被采样。SPI主模块和与之通信的外设音时钟相位和极性应该一致。SPI总线接口时序如图所示。



二、CAN总线 

 CAN意为Controller Area Network的缩写，意为控制区域网络。是国际上流行的现场总线中的一种。是一种特别适合于组建互连的设备网络系统或子系统。现场总线是当今自动化领域技术发展的热点之一，被誉为自动化领域的计算机局域网。它的出现为分布式控制系统实现各节点之间实时、可靠的数据通信提供了强有力的技术支持。CAN(Controller Area Network)属于现场总线的范畴，它是一种有效支持分布式控制或实时控制的串行通信网络。较之目前许多RS-485基于R线构建的分布式控制系统而言，  基于CAN总线的分布式控制系统在以下方面具有明显的优越性：

​    首先，CAN控制器工作于多主方式，网络中的各节点都可根据总线访问优先权(取决于报文标识符)采用无损结构的逐位仲裁的方式竞争向总线发送数据，且CAN协议废除了站地址编码，而代之以对通信数据进行编码，这可使不同的节点同时接收到相同的数据，这些特点使得CAN总线构成的网络各节点之间的数据通信实时性强，并且容易构成冗余结构，提高系统的可靠性和系统的灵活性。而利用RS-485只能构成主从式结构系统，通信方式也只能以主站轮询的方式进行，系统的实时性、可靠性较差；

​    其次，CAN总线通过CAN[控制器接口](https://www.baidu.com/s?wd=%E6%8E%A7%E5%88%B6%E5%99%A8%E6%8E%A5%E5%8F%A3&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)芯片82C250的两个输出端CANH和CANL与物理总线相连，而CANH端的状态只能是高电平或悬浮状态，CANL端只能是低电平或悬浮状态。这就保证不会出现象在RS-485网络中，当系统有错误，出现多节点同时向总线发送数据时，导致总线呈现短路，从而损坏某些节点的现象。而且CAN节点在错误严重的情况下具有自动关闭输出功能，以使总线上其他节点的操作不受影响，从而保证不会出现象在网络中，因个别节点出现问题，使得总线处于“死锁”状态。

​    而且，CAN具有的完善的通信协议可由CAN控制器芯片及其接口芯片来实现，从而大大降低系统开发难度，缩短了开发周期，这些是只仅仅有电气协议的RS-485所无法比拟的。另外，与其它现场总线比较而言，CAN总线是具有通信速率高、容易实现、且性价比高等诸多特点的一种已形成国际标准的现场总线。这些也是目前 CAN总线应用于众多领域，具有强劲的市场竞争力的重要原因。

CAN总线特点:

- CAN是到目前为止为数不多的有国际标准的现场总线

- CAN通讯距离最大是10公里（设速率为5Kbps）,或最大通信速率为1Mbps(设通信距离为40米)。

- CAN总线上的节点数可达110个。通信介质可在双绞线，同轴电缆，光纤中选择。

- CAN采用非破坏性的总线仲裁技术，当多个节点同时发送数据时，优先级低的节点会主动退出发送，高优先级的节点可继续发送，节省总线仲裁时间。

- CAN是多主方式工作，网上的任一节点均可在任意时刻主动地向网络上其他节点发送信息。

- CAN采用报文识别符识别网络上的节点，从而把节点分成不同的优先级，高优先级的节点享有传送报文的优先权。

-  报文是短帧结构，短的传送时间使其受干扰概率低，CAN有很好的效验机制，这些都保证了CAN通信的可靠性。

 CAN总线最初是德国BOSCH为汽车行业的监测，控制而设计的。现已应用到铁路、交通、国防、工程、工业机械、纺织、农用机械、数控、医疗器械机器人、楼宇、安防等方面。

 

三、 I2C (Inter－Integrated Circuit) 总线

I2C(Inter－Integrated Circuit)总线是一种由PHILIPS公司开发的两线式串行总线，用于连接微控制器及其外围设备。I2C总线产生于在80年代，最初为音频和视频设备开发，如今主要在服务器管理中使用，其中包括单个组件状态的通信。例如管理员可对各个组件进行查询，以管理系统的配置或掌握组件的功能状态，如电源和系统风扇。可随时监控内存、硬盘、网络、系统温度等多个参数，增加了系统的安全性，方便了管理。

I2C总线最主要的优点是其简单性和有效性。由于接口直接在组件之上，因此I2C总线占用的空间非常小，减少了电路板的空间和芯片管脚的数量，降低了互联成本。总线的长度可高达25英尺，并且能够以10Kbps的最大传输速率支持40个组件。I2C总线的另一个优点是，它支持多主控(multimastering)， 其中任何能够进行发送和接收的设备都可以成为主总线。一个主控能够控制信号的传输和时钟频率。当然，在任何时间点上只能有一个主控。

 I2C总线工作原理:

-   I2C总线是由数据线SDA和时钟SCL构成的串行总线，可发送和接收数据。在CPU与被控IC之间、IC与IC之间进行双向传送，最高传送速率100kbps。各种被控制电路均并联在这条总线上，但就像电话机一样只有拨通各自的号码才能工作，所以每个电路和模块都有唯一的地址，在信息的传输过程中，I2C总线上并接的每一模块电路既是主控器（或被控器），又是发送器（或接收器），这取决于它所要完成的功能。CPU发出的控制信号分为地址码和控制量两部分，地址码用来选址，即接通需要控制的电路，确定控制的种类；控制量决定该调整的类别（如对比度、亮度等）及需要调整的量。这样，各控制电路虽然挂在同一条总线上，却彼此独立，互不相关。

- I2C总线在传送数据过程中共有三种类型信号， 它们分别是：开始信号、结束信号和应答信号。

  开始信号：SCL为高电平时，SDA由高电平向低电平跳变，开始传送数据。 结束信号：SCL为低电平时，SDA由低电平向高电平跳变，结束传送数据。 应答信号：接收数据的IC在接收到8bit数据后，向发送数据的IC发出特定的低电平脉冲，表示已收到数据。CPU向受控单元发出一个信号后，等待受控单元发出一个应答信号，CPU接收到应答信号后，根据实际情况作出是否继续传递信号的判断。若未收到应答信号，由判断为受控单元出现故障。  

总线基本操作:

- I2C规程运用主/从双向通讯。器件发送数据到总线上，则定义为发送器，器件接收数据则定义为接收器。主器件和从器件都可以工作于接收和发送状态。 总线必须由主器件（通常为微控制器）控制，主器件产生串行时钟（SCL）控制总线的传输方向，并产生起始和停止条件。SDA线上的数据状态仅在SCL为低电平的期间才能改变，SCL为高电平的期间，SDA状态的改变被用来表示起始和停止条件。

- 控制字节

  在起始条件之后，必须是器件的控制字节，其中高四位为器件类型识别符（不同的芯片类型有不同的定义，EEPROM一般应为1010），接着三位为片选，最后一位为读写位，当为1时为读操作，为0时为写操作。

- 写操作

  写操作分为字节写和页面写两种操作，对于页面写根据芯片的一次装载的字节不同有所不同。

- 读操作

  读操作有三种基本操作：当前地址读、随机读和顺序读。图4给出的是顺序读的时序图。应当注意的是：最后一个读操作的第9个[时钟周期](https://www.baidu.com/s?wd=%E6%97%B6%E9%92%9F%E5%91%A8%E6%9C%9F&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)不是“不关心”。为了结束读操作，主机必须在第9个周期间发出停止条件或者在第9个时钟周期内保持SDA为高电平、然后发出停止条件。

在I2C总线的应用中应注意的事项总结为以下几点 :

  1） 严格按照时序图的要求进行操作，

  2） 若与口线上带内部上拉电阻的单片机接口连接，可以不外加上拉电阻。

  3） 程序中为配合相应的传输速率，在对口线操作的指令后可用NOP指令加一定的延时。

  4） 为了减少意外的干扰信号将EEPROM内的数据改写可用外部写保护引脚（如果有），或者在EEPROM内部没有用的空间写入标志字，每次上电时或复位时做一次检测，判断EEPROM是否被意外改写。

添加：I2C 总线

在现代电子系统中，有为数众多的IC 需要进行相互之间以及与外界的通信。为了提供硬件的效率和简化电路的设计，PHILIPS 开发了一种用于内部IC 控制的简单的双向两线串行总线I2C(inter IC 总线)。I2C 总线支持任何一种IC 制造工艺，并且PHILIPS 和其他厂商提供了种类非常丰富的I2C 兼容芯片。作为一个专利的控制总线，I2C 已经成为世界性的工业标准。每个I2C 器件都有一个唯一的地址，而且可以是单接收的器件（例如：LCD 驱动器）或者可以接收也可以发送的器件（例如：存储器）。发送器或接收器可以在主模式或从模式下操作，这取决于芯片是否必须启动数据的传输还是仅仅被寻址。I2C 是一个多主总线，即它可以由多个连接的器件控制。早期的I2C 总线数据传输速率最高为100Kbits/s，采用7 位寻址。但是由于数据传输速率和应用功能的迅速增加，I2C 总线也增强为快速模式（400Kbits/s）和10 位寻址以满足更高速度和更大寻址空间的需求。I2C 总线始终和先进技术保持同步，但仍然保持其向下兼容性。并且最近还增加了高速模式，其速度可达3.4Mbits/s。它使得I2C 总线能够支持现有以及将来的高速串行传输应用，例如EEPROM 和Flash 存储器。

 

四、I2S (IC Sound Bus)总线

I2S 有3个主要信号：1.串行时钟SCLK，也叫位时钟（BCLK），即对应数字音频的每一位数据，SCLK都有1个脉冲。SCLK的频率=2×采样频率×采样位数  2. 帧时钟LRCK，用于切换左右声道的数据。LRCK为“1”表示正在传输的是左声道的数据，为“0”则表示正在传输的是右声道的数据。LRCK的频率等于采样频率。3.串行数据SDATA，就是用二进制补码表示的音频数据。I2S（Inter-IC Sound Bus）是飞利浦公司为数字音频设备之间的音频数据传输而制定的一种总线标准。在飞利浦公司的I2S标准中，既规定了硬件接口规范，也规定了数字音频数据的格式。I2S有3个主要信号：1.串行时钟SCLK，也叫位时钟（BCLK），即对应数字音频的每一位数据，SCLK都有1个脉冲。SCLK的频率=2×采样频率×采样位数  2. 帧时钟LRCK，用于切换左右声道的数据。LRCK为“1”表示正在传输的是左声道的数据，为“0”则表示正在传输的是右声道的数据。LRCK的频率等于采样频率。3.串行数据SDATA，就是用二进制补码表示的音频数据。

有时为了使系统间能够更好地同步，还需要另外传输一个信号MCLK，称为主时钟，也叫系统时钟（Sys Clock），采样频率的256倍或384倍。一个典型的I2S信号见图3。（图3 I2S信号）图3

​    I2S格式的信号无论有多少位有效数据，数据的最高位总是出现在LRCK变化（也就是一帧开始）后的第2个SCLK脉冲处。这就使得接收端与发送端的有效位数可以不同。如果接收端能处理的有效位数少于发送端，可以放弃数据帧中多余的低位数据；如果接收端能处理的有效位数多于发送端，可以自行补足剩余的位。这种同步机制使得数字音频设备的互连更加方便，而且不会造成数据错位。

​    随着技术的发展，在统一的 I2S接口下，出现了多种不同的数据格式。根据SDATA数据相对于LRCK和SCLK的位置不同，分为左对齐（较少使用）、I2S格式（即飞利浦规定的格式）和右对齐（也叫日本格式、普通格式）。这些不同的格式见图4和图5。（图4 几种非I2S格式）图4（图5 几种I2S格式）图5　

​     [500)this.width=500" border="0">](http://www.edisc.com.cn/media/200107/03/NewsMedia_82.jpg)

​     [500)this.width=500" border="0">](http://www.edisc.com.cn/media/200107/03/NewsMedia_83.jpg)

​    为了保证数字音频信号的正确传输，发送端和接收端应该采用相同的数据格式和长度。当然，对I2S格式来说数据长度可以不同。



五、PCI总线

　1991年下半年，Intel公司首先提出了PCI的概念，并联合IBM、Compaq、AST、HP、DEC等100多家公司成立了PCI集团，其英文全称为：Peripheral Component Interconnect Special Interest Group(外围部件互连专业组)，简称PCISIG。PCI是一种先进的局部总线，已成为局部总线的新标准。PCI总线插槽如图所示。

 PCI局部总线的主要性能和特点 　

　PCI总线是一种不依附于某个具体处理器的局部总线。从结构上看，PCI是在CPU和原来的系统总线之间插入的一级总线，具体由一个桥接电路实现对这一层的管理，并实现上下之间的接口以协调数据的传送。管理器提供了信号缓冲，使之能支持10种外设，并能在高时钟频率下保持高性能。PCI总线也支持总线主控技术，允许智能设备在需要时取得总线控制权，以加速数据传送。

1. PCI总线的主要性能 

- 支持10台外设 
- 总线时钟频率33.3MHz/66MHz
- 最大数据传输速率133MB/s 
- 时钟同步方式 
- 与CPU及时钟频率无关
- 总线宽度 32位（5V）/64位（3.3V）
- 能自动识别外设 
- 特别适合与Intel的CPU协同工作

2. 其它特点
- 具有与处理器和存储器子系统完全并行操作的能力 
- 具有隐含的中央仲裁系统 
- 采用多路复用方式（地址线和数据线）减少了引脚数
- 支持64位寻址 ·完全的多总线主控能力 
- 提供地址和数据的奇偶校验
- 可以转换5V和3.3V的信号环境

3. PCI总线信号定义 
- 必要引脚控设备49条 
- 目标设备47条 
- 可选引脚51条（主要用于64位扩展、中 断请求、高速缓存支持等）
- 总引脚数120条（包含电源、地、保留 引脚等）




主要区别在于命令的传输：SSI协议是先传1字节的命令(7位命令+1位读写标志位），然后传输两个字节的数据；I2C可以不停地传输字节（数据或者命令），没区分发送的顺序，但是在格式上，规定某些具体数值为控制命令。所以，写I2C驱动主要是需要掌握常用的命令值。

**另外，SSI有三线制的SPI和四线MircroWire制的 ，SPI的端口分别是时钟CLK/数据时能（片选）CS/发送接受数据TxRx。而Microwire不同的是TxRx是单独一条线，不是共用的。I2C的端口是SCL和SDA，SCL是时钟线，SDA是数据线，I2C与SSI不同的是，SDA和SCL要配合使用，通过SCL在不同的电平状态下，判断SDA是起始位还是停止位，还是数据。**





### 2. U-Boot 环境是否需要使用 Flash 驱动。

u-boot 启动环境本身是需要识别 flash 芯片，其中包括 ID, Register 等。读，写的操作是通过统一的标准操作。以Hi-Boot SPI Flash 驱动为例读写操作通过 hs

   