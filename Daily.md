## 20190422

make menuconfig
General setup  --->  

- Configure standard kernel features (for small systems)  --->
- Load all symbols for debugging/ksymoops
- Include all symbols in kallsyms
- Do an extra kallsyms pass  

 

注: 配置CONFIG_KALLSYMS_ALL之后，就不需要修改all_symbol静态变量为1了 

``` shell
                    |--------------------|
                    |                    |
                    |                    |
                    ~                    ~
                    |                    |
                    |                    |
            0xc05d 1dc0                  |
                     --------------------| _end
                    |                    |
                    |                    |
                    |    BSS             |
                    |                    |
                    |                    |
            0xc05a 4500                  |
                     --------------------| __bss_start
                    |                    |
                      0xc05a 44e8        |
                    ---------------------| _edata
                    |                    |
                    |                    |
                    |    DATA            |
                    |                    |
                    |                    |
            0xc058 2000                  |
                     --------------------| __data_start  init_thread_union
                    |                    | 
                      0xc058 1000 _etext |
                     --------------------|
                    |                    |
                    | rodata             |
                    |                    |
           0xc056 d000                  |
		             --------------------| __start_rodata
                    |                    |
                    |                    |
                    | Real text          |
                    |                    |
                    |                    |
                      0xc02a 6000   TEXT |
                     --------------------| _text        __init_end    
                    |                    |
                    | Exit code and data | DISCARD 这个section在内核完成初始化后
                    |                    |         会被释放掉
                      0xc002 30d4        |
                     --------------------| _einittext
                    |                    |
                    | Init code and data |
                    |                    |
                0xc000 8000 _stext       |
                     --------------------|<------------ __init_begin
                    |                    |
 0xc000 0000        |--------------------|

 

arch/arm/kernel/vmlinux.lds.S
```



## 20190514

### [different between device_driver and platform_driver](<https://stackoverflow.com/questions/15610570/what-is-the-difference-between-a-linux-platform-driver-and-normal-device-driver>).

1. Platform devices are **inherently not discoverable**, i.e. the hardware cannot say *"Hey! I'm present!"* to the software. Typical examples are i2c devices, `kernel/Documentation/i2c/instantiating-devices` states:

   > Unlike PCI or USB devices, I2C devices are not enumerated at the hardware level (at run time). Instead, the software must know (at compile time) which devices are connected on each I2C bus segment. So USB and PCI are *not* platform devices.

2. Platform devices are bound to drivers **by matching names**,

3. Platform devices should be **registered very early** during system boot. Because they are often critical to the rest of the system (platform) and its drivers.

So basically, the question "*is it a platform device or a standard device?*" is **more a question of which bus it uses**. To work with a particular platform device, you have to:

1. **register a platform driver** that will manage this device. It should define a *unique* name,
2. **register your platform device**, defining the same name as the driver.

> Platform driver is for those devices that are on chip.

Not true (in theory, but true in practice). i2c devices are not onChip, but are platform devices because they are not discoverable. Also we can think of onChip devices which are *normal* devices. Example: an integrated PCI GPU chip on a modern x86 processor. It is discoverable, thus not a platform device.

> Normal device driver are for those that are interfaced to the processor chip. before coming across one i2c driver.

Not true. Many *normal* devices are interfaced to the processor, but not through an i2c bus. Example: a USB mouse.

**[EDIT]** In your case, have a look to `drivers/usb/host/ohci-pnx4008.c`, which is a USB host controller platform device (Here the USB host controller is not discoverable, whereas USB devices, which will connect to it, are). It is a platform device registered by the *board file* (`arch/arm/mach-pnx4008/core.c:pnx4008_init`). And within its probe function, it registers its i2c device to the bus with `i2c_register_driver`. We can infer that the USB Host controller chipset *talks to* the CPU through an i2c bus.

Why that architecture? Because on one hand, this device can be considered a bare i2c device providing some functionalities to the system. On the other hand, it is a USB Host capable device. It needs to register to the USB stack (`usb_create_hcd`). So probing only i2c will be insufficient. Have a look to `Documentation/i2c/instantiating-devices`.



### ioremap_nocache()

```c
void __iomem * ioremap_nocache (unsigned long offset, unsigned long size);
/*
 * ioremap     -   map bus memory into CPU space
 * @offset:    bus address of the memory
 * @size:      size of the resource to map
 *
 * ioremap performs a platform specific sequence of operations to
 * make bus memory CPU accessible via the readb/readw/readl/writeb/
 * writew/writel functions and the other mmio helpers. The returned
 * address is not guaranteed to be usable directly as a virtual
 * address.
 */
```

调用ioremap_nocache()函数之后，返回一个线性地址,此时CPU 可以访问设备的内存(已经将其映射到了线性地址空间中了)，此时CPU可以使用访问内存的指令访问设备的内存空间，此时我们就可以像访问内存一样来访问设备的内存(寄存器)。

ioremap是为一段高端的物理内存建立映射（即增加相关的页表内容），驱动常用mmap为可能不连续的一系列逻辑上相关的（如整体是一个文件）物理内存段建立映射，并呈现一个连续的虚拟地址空间。

应用程序常用mmap是系统调用，只能应用程序用。 ioremap是kernel提供的函数，只能在kernel里用。
usage:

```c
// 全局定义两个变量
static void __iomem *vaddr_base;
volatile u32 rw32;

// 从物理地址 0x9C016000 开始映射 0x200 大小给虚拟地址 vaddr_base
// 只执行一次
vaddr_base = ioremap_nocache(0x9C016000, 0x200);

// 读写0x9C016000+0x100寄存器bit24~bit27为0001
rw32 = *(volatile u32*)(vaddr_base + 0x100); // 读
printk("Reg0x%x = 0x%x\n", 0x9C016000 + 0x100, rw32);
rw32 &= 0xf0ffffff;
rw32 |= 0x01000000;
*(volatile u32*)(vaddr_base + 0x100) = rw32; // 写

iounmap(vaddr_base);
```



## 20190515



