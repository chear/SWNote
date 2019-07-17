## 1. What about WAN , and why the WAN can inside  bridge or not (while display by brctl )?

WAN(Wide Area Network) , 可以在 ip 地址枯竭的时候，临时用以扩充 IP 子网。WAN interface 可以在 bridge 内，也可以不在 brideg 内， 在 bridge 内则是属于桥接模式，对应于网络的二层交换；  如果不在 bridge 内则属于路由模式对网络模型的三层路由交换。可以通过以下方式查看。

```shell
$brctl show 
```



## 2. switch bewteen ePon and gPon.

| Type  | Working Mode | OLT Note            |
| ----- | ------------ | ------------------- |
| ePon  | 4            | interface epon 0/12 |
| gPon  | 1            | interface gpon 0/2  |
| xgPon | 6            | interface epon 0/10 |

### **ePont Register:**

```shell
# atbp show
Number of MAC Addresses (1-32)    :  19  
Base MAC Address                  :  00:19:cb:0a:05:47  
Serial Number                     :  0019cb000001  
Password for Useradmin            :  0019cb000001  
SSID for first wireless (10-31)   :  Huatian  
Password for first wireless (8-31):  0019cb000001  
WAN working mode [0|1|2|3|4|5|6|7]:  4  
GPON Serial Number                :  MSTC12345678  
GPON Password                     :  1234567890  
Semi-manufactured SN              :  0Y0000000000  
```

more loid for register:

| LOID            | atbp Mac          | Real Mac       |
| --------------- | ----------------- | -------------- |
| mstcwxsw3loid26 | 00:19:CB:0A:05:57 | 0019-CB0A-0560 |
| mstcwxsw3loid27 | 00:19:CB:0A:05:67 | 0019-CB0A-0570 |

### **xgPon Register**
``` shell
# atbp show
Number of MAC Addresses (1-32)    :  19  
Base MAC Address                  :  00:19:cb:0a:05:47  
Serial Number                     :  0019cb000001  
Password for Useradmin            :  0019cb000001  
SSID for first wireless (10-31)   :  Huatian  
Password for first wireless (8-31):  0019cb000001  
WAN working mode [0|1|2|3|4|5|6|7]:  6  
GPON Serial Number                :  MSTC0B000047  
GPON Password                     :  1234567890  
Semi-manufactured SN              :  0Y0000000000 
```

(Note: should be upper case for gPon SN.)



## 3. maven problem when first clone and building MT7526G_CMCC 

When first building project for "sysapps/public/gpl/felix_framework_cuc_cmcc" with maven while should downloads many manve dependence. 

when download failed, could verify and copy the  '/home/{user_name}/.m2' to the current user home path such like :

```shell
$cp -R /home/don/.m2 /home/chear/
```
or update maven setting.xml while add Aliyun to maven repo  , in this by  '/usr/share/apache-maven-3.2.5/conf/setting.xml'
```xml
<mirrors>
 <!-- mirror
  | Specifies a repository mirror site to use instead of a given repository. The repository that
  | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
  | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
  |
 <mirror>
   <id>mirrorId</id>
   <mirrorOf>repositoryId</mirrorOf>
   <name>Human Readable Name for this Mirror.</name>
   <url>http://my.repository.com/repo/path</url>
 </mirror>
  -->
  <mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>*</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </mirror>
</mirrors>
```



## 3. different bewteen "aclocal" and "autoconf"
1. autoscan (autoconf): 扫描源代码以搜寻普通的可移植性问题，比如检查编译器，库，头文件等，生成文件configure.scan,它是configure.ac的一个雏形。
2. aclocal (automake):根据已经安装的宏，用户定义宏和acinclude.m4文件中的宏将configure.ac文件所需要的宏集中定义到文件 aclocal.m4中。aclocal是一个perl 脚本程序，它的定义是：“aclocal - create aclocal.m4 by scanning configure.ac”

```
user input files   optional input     process          output files
================   ==============     =======          ============

                    acinclude.m4 - - - - -.
                                          V
                                      .-------,
configure.ac ------------------------>|aclocal|
                 {user macro files} ->|       |------> aclocal.m4
                                      `-------'
```

3. autoheader(autoconf): 根据configure.ac中的某些宏，比如cpp宏定义，运行m4，声称config.h.in

```
user input files    optional input     process          output files
================    ==============     =======          ============

                    aclocal.m4 - - - - - - - .
                                             |
                                             V
                                     .----------,
configure.ac ----------------------->|autoheader|----> autoconfig.h.in
                                     `----------'
```

4. automake: automake将Makefile.am中定义的结构建立Makefile.in，然后configure脚本将生成的Makefile.in文件转换为Makefile。如果在configure.ac中定义了一些特殊的宏，比如AC_PROG_LIBTOOL，它会调用libtoolize，否则它会自己产生config.guess和config.sub

```
user input files   optional input   processes          output files
================   ==============   =========          ============

                                     .--------,
                                     |        | - - -> COPYING
                                     |        | - - -> INSTALL
                                     |        |------> install-sh
                                     |        |------> missing
                                     |automake|------> mkinstalldirs
configure.ac ----------------------->|        |
Makefile.am  ----------------------->|        |------> Makefile.in
                                     |        |------> stamp-h.in
                                 .---+        | - - -> config.guess
                                 |   |        | - - -> config.sub
                                 |   `------+-'
                                 |          | - - - -> config.guess
                                 |libtoolize| - - - -> config.sub
                                 |          |--------> ltmain.sh
                                 |          |--------> ltconfig
                                 `----------'
```

5. autoconf:将configure.ac中的宏展开，生成configure脚本。这个过程可能要用到aclocal.m4中定义的宏。

```
user input files   optional input   processes          output files
================   ==============   =========          ============

                   aclocal.m4 - - - - - -.
                                         V
                                     .--------,
configure.ac ----------------------->|autoconf|------> configure ----->autoconfig.h,Makefile
```



## 4. Print sal log for Hisilicon platfrom 

``` shell
cli /home/cli/log_cmd/log/cfg_set -v module 0xF0001000 dbg 0xff print 0xff sys 0

cli /home/cli/log_cmd/log/cfg_set -v module 0xF6003000 dbg 0xff print 0xff sys 0
(to debug wan.)

cli /home/cli/log_cmd/log/cfg_set -v module 0xF7003000 dbg 0xff print 0xff sys 1
```



## 5. Transfer data with in Hisilicon platform

``` shell
cli /home/cli/hal/port/port_mirror_set -v igr 0x200 egr 0x200 dport 0
```





## 6. Linux Tools diagrams

**Linux Static Performance Tools**

![linux_staic_performance_tools](img\linux_static_tools.jpg)

**Linux bcc /Berkeley Packet Filter Trancing Tools**

![linux_bpf_tools](img\linux_bpf_tools.jpg)

**Linux Tuning Tools**

![linux_tuning_tools](img\linux_tuning_tools.jpg)

**Linux Benchmark Tools**

![linux_benchmark_tools](img\linux_benchmark_tools.jpg)

**Linux Observability Tools**

![linux_observability_tools](img\linux_observability_tools.jpg)

![linux_observability_tools_sar](img\linux_6.jpg)

![linux_observability_tools_perf](img\linux_perf_tools.jpg)



## 7. Switch the province

```shell
root@OpenWrt:~# hi_cfg set sysinfo.province jt
root@OpenWrt:~# hi_cfg config
root@OpenWrt:~# sync
root@OpenWrt:~# reboot
root@OpenWrt:~# hi_cfc test restore
```




## 8. ebtables & iptables
[ebtables](<http://ebtables.netfilter.org/misc/ebtables-man.html>) is an application program used to set up and maintain the tables of rules (inside the Linux kernel) that inspect Ethernet frames. It is analogous to the **iptables**application, but less complicated, due to the fact that the Ethernet protocol is much simpler than the IP protocol.  more detail in [ebtables/iptables interaction on a Linux-based bridge](<http://ebtables.netfilter.org/br_fw_ia/br_fw_ia.html>)





