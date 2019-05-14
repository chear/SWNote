#  Linux Oops and paints









## ARM 







## MIPS



**epc: exception program counter 异常程序计数器**
**ra :   return address   返回地址**

![kernel_trace_mips2](img\kernel_tarce_mips_2.png)





通过epc值可知，crash的函数名为：PpeSportDportCheck，通过搜索可知该函数在MT7526G_CTC\dev\platform\bsp\modules\private\ra_hwnat_7510\ra_nat.c



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



```shell
rm -rf ../platform/bsp/modules/private/ra_hwnat_7510/ra_nat.o
make modules
```





4./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -d ra_nat.o | grep PpeSportDportCheck，得到该函数名的偏移地址：0x00006550,通过上面crash信息得到crash点的偏移为0x3c,因此真正crash的点为0x658c





![1557292168621](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292168621.png)





5./opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-addr2line
-e ra_nat.o 658c
, 找到代码对应的行数	



![1557292180046](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292180046.png)







6. /opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -d ra_nat.o >
  list, 得到汇编代码。。



![1557292189854](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292189854.png)







7. /opt/trendchip/mips-linux-uclibc-4.9.3/usr/bin/mips-linux-objdump -dS ra_nat.o >
  list   可以获得c语言代码和对应的反汇编代码



![1557292213639](C:\Users\R00499\AppData\Roaming\Typora\typora-user-images\1557292213639.png)