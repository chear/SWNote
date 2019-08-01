# Linux ELF

Linux ELF (**[Executable and Linkable Format](<https://ctf-wiki.github.io/ctf-wiki/executable/elf/elf-structure-zh/>)**)  defines the structure for binaries, libraries, and core files. The formal specification allows the operating system to interpreter its underlying machine instructions correctly. ELF files are typically the output of a compiler or linker and are a binary format. With the right tools, such file can be analyzed and better understood. 

(Tips: for windows platform using **PE ([Portable Executable](<https://en.wikibooks.org/wiki/X86_Disassembly/Windows_Executable_Files>)**) format )

The **type** field tells us what the purpose of the file is. There are a few common file types.

- CORE (value 4)
- DYN (Shared object file), for libraries (value 3) , suck like *.so file.
- EXEC (Executable file), for binaries (value 2)
- REL (Relocatable file), before linked into an executable file (value 1) , such like *.o file.

For executable files there are four main sections, Each of these sections is loaded with different access rights, which can be seen with **readelf -S**.

**.text**

Contains executable code. It will be packed into a segment with read and execute access rights. It is only loaded once, as the contents will not change. This can be seen with the **objdump** utility.

**.data**

Initialized data, with read/write access rights

**.bss**

Uninitialized data, with read/write access rights (=WA)

**.rodata**

Initialized data, with read access rights only (=A).

```shell
                    |--------------------| 0x00
                    |    ELF Header      |
                    |--------------------| 
                    |Program Header Table|
                    |--------------------| 
                    |    .Text			 |
                    |--------------------| 
                    |    .rodata		 |
            		|--------------------|
                    |	    ...			 |
                    |--------------------|
                    |	  .data			 |
            		|--------------------|
                    |    Section Header  |
                    |    Table optional	 |
 			        |--------------------| 0xFF
```

(Note: Stack/Heap are in-memory structures which are created/modified during run-time so in essence they are not in the file itself - they can't be. Think of them as a special place in memory where each and every program can store run-time data and by run-time data I mean variables. function invocations, return values and all the nitty-gritty stuff that are hapening on the low level.)

*Commands to see section and headers*

- dumpelf
- elfls -p /bin/ps
- eu-readelf –section-headers /bin/ps
- readelf -S /bin/ps
- objdump -h /bin/ps



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