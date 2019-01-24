# OpenWrt Introduction

[OpenWRT](https://openwrt.org/docs/guide-user/start) is embedded operation system  based on Linux for GPL open source, and also is release version for Linux suck as Ubuntu , CentOS .  OpenWrt did not contain any source code , this composed by each patch and zip.

# Hisilicon Platform Introduction

## Hisilicon Architecture

![hisilicon_arch](img\hisilicon_arch.png)

Hisilicon base on openWRT , OpenWrt takes a different approach to building a firmware, downloading, patch-ing and compiling everything from scratch, including the cross compiler.  OpenWrt does not contain any executables or even sources, it is an automated system for downloading the sources, patching them to work with the given platform and compiling them correctly for that platform. What this means is that just by changing the template, you can change any step in the process.

Sub-system Interface Introduction

| Interface Name | Description | Interact Subsystem    | Responsible                                                  | Type    |
| -------------- | ----------- | --------------------- | ------------------------------------------------------------ | ------- |
| HAL            | 配置，查询  | CFE, Services         | 硬件抽象层，对上层软件提供统一的业务化API层，屏蔽底层芯片具体实现和差异。 | outside |
| CFE            |             | Services              | 核心转发引擎，用于实现业务报文的软、硬加速转发功能，对上层软件提供控制API。 | outside |
| SAL            |             | CM                    | 网管业务抽象层，提供各类网关业务由cm模块封装接口，不对子系统以外提供接口。扩展sal层的功能，把业务实现也包含进入sal中。 | inside  |
| SML            |             | OMCI,OAM              | OMCI，OAM的业务抽象层                                        | inside  |
| CM             |             | CMS,CT Smart,CM Smart | 配置管理层，包括：对上层提供统一的业务管理API，供CWMP、WEB、IPC Service、Smartgateway等模块使用。屏蔽下层各业务子系统或模块的实现细节，负责将上层模块的不同数据模型转换成内部的数据模型，并调用下层子系统的API下发业务配置。内部还实现了对配置数据文件的管理和读、写等功能。 | inside  |
| IPC            | 访问控制    | CM,CMS ,Services      | 进程间通信模块，主要完成系统内部进程间互相通信，以及用户态访问内核态等功能。 | inside  |
| Notifiter      |             |                       | 事件管理模块，提供事件注册、管理、分发等功能。               |         |
| UCM            |             |                       | 统一配置管理模块，为业务模块提供统一配置方法和配置文件的管理等功能。 |         |
| IPC Services   |             |                       | 中国电信智能网关规定的dbus适配接口，按电信规定的API实现，对接上层中间件。模块内部调用CM子系统的API下发业务配置。 |         |
| OSGi           |             | Plug-in Bundle        | 提供插件服务                                                 |         |

![hi_subsystem](img/hi_subsytem_internal_exchange.png)


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



# Hisilicon Configure Management




