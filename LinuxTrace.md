#  Kernel oops && panic

在 Linux 中 panic 的程度显然是高于oops，内核panic后，就死机了俗称内核崩溃。但是内核报oops，这个时候不见得会panic，它可能只是报个oops，杀死进程而已 。例如 [Kernel Oops和Panic是一回事吗](<http://www.eeworld.com.cn/mp/ymc/a52750.jspx>)





## arm arch







## mips arch

### Step 1.

**epc: exception program counter 异常程序计数器** ,
**ra :   return address   返回地址**

![kernel_trace_mips2](img\kernel_tarce_mips_2.png)


### Step 2.
通过 **epc** 值可知，crash的函数名为 **PpeSportDportCheck**，通过查找源文件位于*MT7526G_CTC\dev\platform\bsp\modules\private\ra_hwnat_7510\ra_nat.c*

```makefile
KERNELDIR := $(KERNEL_DIR)
#obj-$(CONFIG_RA_HW_NAT) += hw_nat.o
obj-m = hw_nat.o
hw_nat-objs := ra_nat.o foe_fdb.o util.o hwnat_ioctl.o ppe_api.o
EXTRA_CFLAGS += -g -DCONFIG_HNAT_V2 -DCONFIG_RA_HW_NAT_IPV6
#(Note: -g usd to debug info to this module)

#ifeq ($(CONFIG_RALINK_RT3052),y)
#hw_nat-objs += sys_rfrw.o
#endif

#ifneq ($(CONFIG_HNAT_V2),y)
#hw_nat-objs += acl_policy.o acl_ioctl.o
#hw_nat-objs += ac_policy.o ac_ioctl.o
#hw_nat-objs += mtr_policy.o mtr_ioctl.o
#endif

all:
	$(MAKE) -C $(KERNELDIR) M=`pwd` modules
	$(STRIP) --strip-unneeded hw_nat.ko

clean:
	$(MAKE) -C $(KERNELDIR) M=`pwd` clean
```

在 Makefile 中加入调试参数 **-g**  ，如 "**EXTRA_CFLAGS += -g**" ，重新编译。

```shell
rm -rf ../platform/bsp/modules/private/ra_hwnat_7510/ra_nat.o
make modules
```

### Step 3.
通过 ToolChain 中的工具 **mips-linux-objdump**  得到该函数名的偏移地址为 **0x00006550** 

```shell
./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -d ra_nat.o | grep PpeSportDportCheck
```

, 通过上面 crash 信息得到 crash 点的偏移为 **0x3c** ,因此真正crash的点为 **0x658c**

![1557292168621](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292168621.png)

### Step  4.  
通过 **mips-linux-addr2line**  , 找到代码对应的行数

```shell
./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-addr2line -e ra_nat.o 658c
```

![1557292180046](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292180046.png)

### Step  5.
使用 **mips-linux-objdump** 得到汇编代码。

```shell
./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -d ra_nat.o >
list
```

![1557292189854](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292189854.png)


### Step  6.   
适用 **mips-linux-objdump** ，可以获得c语言代码和对应的反汇编代码

```shell
./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -dS ra_nat.o >
list
```

![1557292213639](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292213639.png)