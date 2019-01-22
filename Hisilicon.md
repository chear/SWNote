# OpenWrt Introduction

[OpenWRT](https://openwrt.org/docs/guide-user/start) is embedded operation system  based on Linux for GPL open source, and also is release version for Linux suck as Ubuntu , CentOS . 

# Hisilicon Platform Introduction

## Hisilicon Arch

![hisilicon_arch](img\hisilicon_arch.png)

Hisilicon base on openWRT , OpenWrt takes a different approach to building a firmware, downloading, patch-ing and compiling everything from scratch, including the cross compiler.  OpenWrt does not contain any executables or even sources, it is an automated system for downloading the sources, patching them to work with the given platform and compiling them correctly for that platform. What this means is that just by changing the template, you can change any step in the process.



## Files Structure

```
├── Apps-plugin

│	(The third-part function, such like CMCC or CTC.)

├── buappconfig

│	(The third-part chip or hardware configeration.)

├── document

├── hisilicon

│	(The source file for gateway operations ,

│	 while cp to ./openwrt/package/gateway. hi-boot while in this folder .)

├── openwrt   

│     (The main source folder, this folder while generate 

│	after running "make" or "make chip=sd5116" .)

├── solution

│	( patch of openWRT, and open source software package.)

├── sysinfo

│	(The third-part app configeration.)

├── toolchain

│	( toolchain derictory , generate after compile.)

└── Tools 

(  **./App-plugin  ./document   ./hisilicon  ./solution  and  ./sysinfo** are store in trunk , all other folder are genreate by compile )
```

**Kernel Building path :**

`$ls openwrt/build_dir/target-arm-openwrt-linux-uclibcgnueabi/linux-sd5116_generic/`

**Rootfs Building path :**

`$ls openwrt/build_dir/target-arm-openwrt-linux-uclibcgnueabi/root-sd5116/`

## Download & Building 

```
$svn checkout http://wx-svn.zyxel.cn/SW-31/mld_sg/Hisilicon_trunk/trunk/HSANV200R010C01SPC011

$make chip=sd5116 V=s
( used to make whole target ,  V=s means  to show the  build log)
cd openwrt/
make package/gateway/{compile,install} V=s
( to build Hisilicon operation module)

make package/network/services/dnsmasq/{compile,install} V=s
( to build the opern source module.)
```

Note: if you want to update the code in trunk, please commit the code in directory solution\patch\openwrt\package\network\services\(generate patch)

```
make target/linux/install V=s
cd ..
make chip=sd5116 image V=s
```



# Hisilicon Management





# Hisilicon Data Flow Path

| Module | Description | Command Path |
| ------ | ----------- | ------------ |
| NNI    |             |              |
| UNI    |             |              |
| SEC    |             |              |
| PDU    |             |              |
| ifc    |             |              |
| ofc    |             |              |
| Nni    |             |              |
|        |             |              |

Hisi 数据交换流程包括从交换芯片到Linux 协议栈再到用户空间程序的过程。



![image](img\hisi_data_path.png)