# Introduction

Most Makefiles within the kernel are kbuild Makefiles that use the kbuild infrastructure. This chapter introduces the syntax used in the kbuild makefiles. The preferred name for the kbuild files are 'Makefile' but 'Kbuild' can be used and if both a 'Makefile' and a 'Kbuild' file exists, then the 'Kbuild' file will be used.

The kbuild Makefile specifies object files for vmlinux in the (obj-y) lists.  These lists depend on the kernel configuration. Kbuild compiles all the ``$(obj-y) `` files.  It then calls   "(AR) rcSTP" to merge these files into one built-in.a file.

This is a thin archive without a symbol table. It will be later linked into vmlinux by *scripts/link-vmlinux.sh* .    The order of files in $(obj-y) is significant.  Duplicates in the lists are allowed: the first instance will be linked into built-in.a and succeeding instances will be ignored.  Link order is significant, because certain functions    (module_init() / __initcall) will be called during boot in the order they appear. So keep in mind that changing the link order may e.g. change the order in which your SCSI  controllers are detected, and thus your disks are renumbered.

The most simple kbuild makefile contains:

```Makefile
obj-y += foo.o
obj-$(CONFIG_FOO) += foo.o
```

Built-in object goals :

```shell
$(obj-y) 
$(obj-m) 
#drivers/isdn/i4l/Makefile
obj-$(CONFIG_ISDN_I4L) += isdn.o
isdn-y := isdn_net_lib.o isdn_v110.o isdn_common.o

$(<module_name>-y)
```

Loadable module goals:

```Makefile
obj-m = test.o
#drivers/isdn/i4l/Makefile
obj-$(CONFIG_ISDN_PPP_BSDCOMP) += isdn_bsdcomp.o
```

Library file goals :

Objects listed with obj-* are used for modules, or  combined in a built-in.a for that specific directory.There is also the possibility to list objects that will be included in a library, lib.a.    All objects listed with lib-y are combined in a single library for that directory. Objects that are listed in obj-y and additionally listed in  lib-y will not be included in the library, since they will be accessible anyway. For consistency, objects listed in lib-m will be included in lib.a.

```Makefile
# arch/x86/lib/Makefile
lib-y    := delay.o
```

Compilation flags:

```makefile
obj-$(CONFIG_IPV6) += ipv6.o

CFLAGS_icmp.o = -DDEBUG
CFLAGS_exthdrs.o= -DDEBUG
CFLAGS_ip6_input.o = -DDEBUG
ipv6-objs :=    af_inet6.o anycast.o ip6_output.o ip6_input.o addrconf.o \
						addrlabel.o \
						route.o ip6_fib.o ipv6_sockglue.o ndisc.o udp.o udplite.o \
						raw.o icmp.o mcast.o reassembly.o tcp_ipv6.o ping.o \
						exthdrs.o datagram.o ip6_flowlabel.o inet6_connection_sock.o \
						udp_offload.o seg6.o fib6_notifier.o rpl.o

# ccflags-y specifies options for compiling with $(CC).
# drivers/acpi/acpica/Makefile
ccflags-y           := -Os -D_LINUX -DBUILDING_ACPICA
ccflags-$(CONFIG_ACPI_DEBUG)    += -DACPI_DEBUG_OUTPUT

# asflags-y specifies assembler options
# arch/sparc/kernel/Makefile
asflags-y := -ansi

# ldflags-y specifies options for linking with $(LD).
# arch/cris/boot/compressed/Makefile
ldflags-y += -T $(srctree)/$(src)/decompress_$(arch-y).lds

# ccflags-remove-y, asflags-remove-y These flags are used to remove particular flags for the compiler, assembler invocations.
ccflags-remove-$(CONFIG_MCOUNT) += -pg
```

 Simple Host Program

```Makefile
# Using C++ for host programs
# If qconf is composed of a mixture of .c and .cc files, 
# then an additional line can be used to identify this.
hostprogs-y   := qconf
qconf-cxxobjs := qconf.o
qconf-objs    := check.o

# To set flags that will take effect for all host programs created
HOST_EXTRACFLAGS += -I/usr/include/ncurses

# To set specific flags for a single file the following construction is used:
HOSTCFLAGS_piggyback.o := -DKERNELBASE=$(KERNELBASE)

# When there is no suitable special rule, and the host program
# shall be built when a makefile is entered, the $(always)
# variable shall be used.
hostprogs-y   := lxdialog
always        := $(hostprogs-y)
```

Kbuild clean infrastructure, "make clean" deletes most generated files in the obj tree where the kernel is  	compiled. This includes generated files such as host programs. Kbuild knows targets listed in $(hostprogs-y), $(hostprogs-m), $(always), $(extra-y) and $(targets). They are all deleted during "make clean".

```Makefiles
clean-files := crc32table.h
```

