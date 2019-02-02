# Hisilicon Data Flow Path

## Hisilicon Chip  Architecture

![image](E:/Resource/MitrastarNote/img/onu_chip_arch.png)
以 Hisi 5116 为例，ONU 芯片包含两部分：交换核和 ARM 核。 数据流转发主要发生在交换芯片内。ARM 芯片用以运行 Linux 系统软件，交换芯片顾名思义则提供数据交换功能。 交换芯片包含多个用户侧以太网端口， 一个 Pon 网络口，以及多个 cpu 端口，芯片交换对底层屏蔽并由HAL（Hardware Abstraction Layer） 层接口进行封装， 提供 API 与应用层交互。ARM 芯片也通过 HAL 对交换芯片进行配置调用。

PLOAM (Physical Layer OAM)，OMCI (ONU Management and Control Interface)，OAM，MPCP (Multi-Point Control Protocol) 通过Pon 通道单独完成。

**对比 Ecnet Data Path Arch:**
![image](E:/Resource/MitrastarNote/img/ecnet_data_path_arch.png)

## Frame Forward

| Sub-Module                   | Description                    | Command Path                               |
| ---------------------------- | ------------------------------ | ------------------------------------------ |
| NNI/Pon                      | 网络侧端口                     | /home/cli/chip/nni                         |
| UNI                          | 用户侧端口 FE, GE              | /home/cli/chip/uni                         |
| SEC (Security)               | 安全模块                       | /home/cli/hal/sec                          |
| PDU (Protocol Data Unit)     |                                | /home/cli/chip/pdu                         |
| ifc (input flow controller)  | 流分类                         | /home/cli/hal/flow/ifc_*                   |
| ofc (output flow controller) | 流分类                         | /home/cli/hal/flow/ofc_*                   |
| NniMap (Nni)                 |                                |                                            |
| L2                           | 芯片交换 L2 模块，用于二层转发 | /home/cli/chip/l2                          |
| L3                           | 芯片交换 L3 转发，用于三层转发 | /home/cli/chip/l3                          |
| QoS                          | 质量服务                       | /home/cli/chip/qos , /home/cli/hal/qos/    |
| CNT                          | 统计                           | /home/cli/hal/cnt/* , /home/cli/chip/cnt/* |

### Switch Exchange Forward

![image](E:/Resource/MitrastarNote/img/hisi_data_path.png)
	Hisi 数据交换流程包括从交换芯片到Linux 协议栈再到用户空间程序的过程。(注：511xs 不支持L3模块 )

1. UNI --> SEC: 对报文进行 vlan 过滤，源mac过滤，ip过滤
2. SEC --> PDU: 依据配置对报文进行捕获，丢弃。 
3. PDU --> ifc : 可以执行的动作主要有报文编辑（tag 切换操作、IP MAC 切换等）及后续操作指示（丢弃、指定
   出口转发、L3 转发、入口流car 操作、统计等）。
4. ifc - -> Bridge : 报文经过入口流分类处理后，根据转发指示进入bridge 二层桥接转发或者L3 三层转发模块。报文在bridge 转发模块主要依据报文的vlan 及mac 地址，进行目的端口查找转发处理，同时如果是多播报文，在此进行转发复制操作，多播报文的识别包括基于mac 地址或
   mac 地址和vlan 进行复制。
5. Bridge --> ofc : 报文在ofc 出口流分类模块主要依据报文的出端口、vlan、pri、dscp 等信息对报文进行匹配分类，满足规则报文进行编辑和转发等处理，其动作与ifc 基本一致
6. ofc --> Nnimap : 处理后，对于出口非PON 的报文，直接进入Qos|Queue 模块进行发送。若发送出口为PON 口，则还需要进入Nnimap 模块进行上行映射查表，找到G/Epon 模块配置的tcont 或者llid。
7. Qos --> NNI : 在QoS 模块，报文将依据之前模块的car 标记以及配置的car 模块进行car 处理(Ifc,ofc
   均可以指定报文做car)。Car 处理完成后进入队列，在调度器调度下进行出队列发送到
   实际转发出口。

### ARM Forward

![image](E:/Resource/MitrastarNote/img/hi_arm_data_path.png)
(CFE 以对应的物理端口虚拟lan1、lan2，分别对应物理端口GE0、FE1（UNI)  ,端口+vlan 虚拟出wan.100,wan.200 )

软件转发处理报文 （对于需要进入CPU 做由软件处理的报文）：

1. CPU  --> pie : 在交换芯片内被送到CPU 口，经由pie 驱动进行接收。在pie 与linux 网络协议栈之间，通过CFE 虚拟出不同的网络接口。报文从芯片交换进入CPU 口后会携带其原始如端口信息，若由GE0 进入交换的报文，在进入CFE 后，按入端口GE0 查找。找到以端口GE0 虚拟出的lan1 网络接口，并由此接口接收报文送到Linux 网络协议栈。同理，原始入口为FE1 的报文在CFE 内将由lan2接收并送到网络协议栈。

2. pie 收到的报文 (芯片交换 ==> ARM)，根据创建虚拟接口时的配置，匹配报文的特征进行区分后选择由不同的虚拟网络接口送到linux 网络协议栈。

   对于发送的报文(ARM ==> 芯片交换)，进入虚拟网络接口的发送时，会根据此虚拟接口的配置，对报文进行TAG 的处理，然后由PIE 发送到交换芯片的CPU 端口。

   （类似的从NNI(G/EPON)接收带100 vlan 的报文先按原始入端口进行查找，找到wan 虚拟网络接口，然后按vlan 查找，找到基于vlan 映射的wan.100，并由其接收。同样，NNI 接收的带200 vlan 的报文将由wan.200 接收。从wan.100、wan.200 发送出去的报文也会被打上100、200 的vlan 再发送出去。）

### Bridge Forward

虚拟网络接口 lan1, lan2, wan.100 都在桥内，互相之间可以进行桥接转发。报文由桥内网络接口收后，如果是广播或组播报文，在桥内广播。即在除入口外的桥内其他接口上复制转发，并把报文由桥设备 br-lan 送至内核协议栈。 如从 lan1 进入的广播报文，会被复制3份， lan2， wan.100 各一份送出去，最后由桥网络接口 br-lan 接受并送到内核的协议栈 （IP，ARP的协议）

对于单播报文，首先判断其Dmac 是否桥本身的mac 地址。若是，则由桥接口收送内核。否则，查找桥下的fdb 表。 Fdb 表在报文接收的 时候会学习报文的smac 和对应的 和对应的 网络接口。在发送查找时，以报文的 dmac 查找 ，查找 ，mac 对应的网 络接口。若找到对应的网 络接口，则从此网将报文发送出去；否则在 除入口 外的桥内其他接口上复制转发。

### Router Forward

路由转发报文的 dmac 必须是对应的具有  IP 转发能力网络接口本身的 mac 。 对于lan 侧，只有桥网络接口具有 ip 转发能力 （br-lan 有 ip ，桥下的其他网络接口不允许有 ip ），br-lan 统一处理 ip 转发。 故上行数据流的 dmac 是 br-lan 的mac ，由桥转发流程可知，对于 dmac 为桥的报文，直接由 br-lan 接受并送到 ip 协议栈。 ip 协议栈内， 按报文的 Dip (Destination ip) 查找路由表，若为本地报文，则由本地接受。否则找到出口 dev 以及下一跳， 通过 ARP 协议获取下一条的 mac 地址，组装报文发出。



## Data Transmission Model

1. **首包交CPU由软件转发，由软件控制数据流的走向。** 
   1. 芯片交换L2模块，配置广播报文，未知单播报文交CPU，由软件处理 
   2. 芯片交换PDU模块，配置组播协议报文(IGMP|MLD)都交CPU，由软件处理。
   3. Flow 模块，配置IFC使目的MAC与桥设备(br-lan)MAC相等的报文指定去做硬件NAT加速。（初始硬件NAT表为空，由于加速失败也会交CPU，由软件处理）
   4. Port 模块，配置LAN侧所有端口，入口untag报文打上deftag。出口带deftag的报文剥除tag。（默认deftag 的vid是1）
2. **数据流在软件走通后，配置芯片交换各模块功能，使其实现与软转发相同功能。 **
3. **数据流由芯片交换转发，软件只进行监测（控制老化等）**

## Hisilicon Command 

### Debug Command

| Command Nme                                                  | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| hi_cfm set sysinfo.gateway_mac 00:00:23:e2:04:01             | 修改网络信息，设备MAC地址，                                  |
| hi_cfm test restore                                          | 回复出产设置                                                 |
| cli /home/cli/hal/port/port_mirror_set -v igr 0x200 egr 0x200 dport 0 | 镜像 PON 口的包到 lan 0 侧, (values should be reset when powoff) |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |



### General Command

| Name                                    | Description                    | Note                                                         |
| --------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| cli /home/cli/hal/cnt/queuecnt_all_get  | 所有队列统计dump               | 打印出交换芯片所有入队列和出队列的报文数目， 可以认为队列是据转发最后一步，出队列后由个链路mac 进行发送 （或PIE驱动进行接受），默认打印到 std_out 流（串口） |
| cli /home/cli/hal/qos/egr_sch_dump      | 队列端口查询                   | 查询pid和 port 端口 对应关系如下表                           |
| cli /home/cli/hal/cnt/queuecnt_all_clr  | 队列统计清除                   |                                                              |
| cli /home/cli/hal/cnt/dropreason_get –v | 丢包原因统计，基于数据入口     | cli /home/cli/hal/cnt/dropreason_get -v igr 0                |
| cli /home/cli/hal/cnt/dropreason_clr –v | 丢包原因统计清除，基于数据入口 |                                                              |
| cli /home/cli/hal/cnt/tocpureason_get   | 报文交CPU原因统计              | 获取报文基于各种原因被送到 CPU 统计。 若通过队列统计查询到大量报文出口为 CPU， 不符合预期的话，可以使用此命令查询报文交CPU 的原因 |
| cli /home/cli/hal/cnt/tocpureason_clr   | 报文交CPU原因统计清除          |                                                              |
| cli /home/cli/hal/cnt/cnt_cpu_get       | cpu口收发包统计                |                                                              |
| cli /home/cli/hal/cnt/cnt_mc_copy_get   | 组播复制统计                   |                                                              |
| cli /home/cli/hal/cnt/cnt_mc_copy_clr   | 组播复制统计清除               |                                                              |
| cli /home/cli/hal/cnt/cnt_eth_get -v    | ETH口统计                      |                                                              |
| cli /home/cli/hal/cnt/cnt_eth_clr -v    | ETH口统计清除                  |                                                              |
| cli /home/cli/hal/cnt/cnt_epon_get      | EPON数据统计                   |                                                              |
| cli /home/cli/hal/cnt/cnt_gpon_get      | GPON数据统计                   |                                                              |



Port 和 QID 对应表

| PortID | Port Descript   | QID       |
| ------ | --------------- | --------- |
| 0      | ETH0 (lan 1)    | 81 ~ 88   |
| 1      | ETH1 (lan 2)    | 89 ~ 96   |
| 2      | ETH2 (lan 3)    | 97 ~ 104  |
| 3      | ETH3 (lan 4)    | 105 ~ 112 |
|        |                 |           |
| 12     | CPU             | 9 ~16     |
|        | TCONT0 (LLID 0) | 17 ~ 24   |
|        | TCONT1 (LLID 1) | 25 ~ 32   |
|        | TCONT2 (LLID 2) |           |
|        | TCONT3 (LLID 3) |           |
|        | TCONT4 (LLID 4) |           |
|        | TCONT5 (LLID 5) |           |
|        | TCONT6 (LLID 6) |           |
|        | TCONT7 (LLID 7) | 73 ~ 80   |

### Switch Table Search Command

| Command                                   | Description          | Note                                                         |
| ----------------------------------------- | -------------------- | ------------------------------------------------------------ |
| cli /home/cli/hal/sec/sec_vlan_dump       | 安全模块vlan过滤     | vlan 过滤（广播）规则 。若端口 开启了入口/出口 vlan过滤，则只有端口加入了对应 VLAN域，对应 vlan tag的报文才能通过. 若报文需要广播，则遍历 vlan 域内加入的端口进行复制发送。 |
| cli /home/cli/hal/flow/ifc_dump           | IFC 入口流分类规则   | 入口流 分类的表项。 主要有匹配和动作两个部分 。              |
| cli /home/cli/hal/mc/mc_dump              | 组播转发表项         |                                                              |
| cli /home/cli/hal/l2/l2_mac_dump          | L2 MAC学习表项       |                                                              |
| cli /home/cli/hal/l3/l3_ip_session_dump   | 硬件NAPT表项(L3数据) | 查看硬件加速的五元组匹配表 ,其和 l3 _act_get _act_get 结合起来看，可以确定一条流的行为. |
| cli /home/cli/hal/l3/l3_act_get           | 硬件NAPT表项动作     |                                                              |
| cli /home/cli/hal/nni/nni_pon_map_dump    | 上行映射表           |                                                              |
| cli /home/cli/hal/nni/nni_gpon_tcont_dump | GPON模式Tcont        |                                                              |
| cli /home/cli/hal/nni/nni_gpon_gem_dump   | GPON模式 gemport     |                                                              |
| cli /home/cli/hal/flow/ofc_dump           | OFC出口流分类规则    |                                                              |
| cli /home/cli/mc/get_grpinfo              | 软件记录的组播转发表 |                                                              |
| cli /home/cli/cfe/lrn/lrn_dump            | 查看加速连接         | 此命令打印出当前已经建立的 表项，类似内核contrack 。 分为原始和回应方向。 |
| cli /home/cli/cfe/lrn/lrn_flush           | 清除所有加速连接     |                                                              |
| cli /home/cli/cfe/lrn/lrn_setcfg          | 关闭加速             | -v enable 0                                                  |
| cli /home/cli/cfe/dia/dump_intf           | 查看接口参数         | ifname <接口名> e.g. (ethx , pon.xxx)                        |
| cli /home/cli/cfe/dia/hook_add            | 指定点进行报文打印   | pos ：要打印的未知(参见表3-2) cnt ：打印报文个数             |
| cli /home/cli/cfe/dia/hook_clear          | 清除打印 hook        |                                                              |

### Debug Control Command

| Command                                | Description                 | Note                                                         |
| -------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| cli /home/cli/log_cmd/log/cfg_set      | WAN  Dbg                    | -v module 0xf6003000 sys 1 dbg 0xff print 0xff flag 0        |
| cli /home/cli/log_cmd/log/cfg_set      | LAN Dbg                     | -v module 0xf6007000 sys 1 dbg 0xff print 0xff               |
| cli /home/cli/log_cmd/log/cfg_set      | QoS Dbg                     | -v module 0xf6006000 sys 1 dbg 0xff print 0xff               |
| cli /home/cli/log_cmd/log/cfg_set      | MC Dbg                      | -v module 0xf6005000 sys 1 dbg 0xff print 0xff               |
| cli /home/cli/log_cmd/log/cfg_set      | GPon OMCI ( dbg to console) | -v module 0xf2003100 sys 0 dbg 0x38 print 0x38               |
| cli /home/cli/log_cmd/log/cfg_set      | GPon OMCI ( dbg to file)    | -v module 0xf2003e00 sys 0 dbg 0x10f    cat /log/hisi/hi_omci.log |
| cli /home/cli/log_cmd/log/cfg_set      | GPon PLOAM                  | -v module 0xf9002000 sys 0 dbg 0x0 print 0x10                |
|                                        | EPon OAM                    | -v module 0xf20200000 sys 0 dbg 0x11                         |
| cli /home/cli/hal/port/port_mirror_set | 镜像报文                    | -v igr 0x200 egr 0x200 dport 1                               |



## FAQ:

### 1. 如何查看硬件加速 （NAT/NAPT）？

```
$cli /home/cli/cfe/lrn/lrn_dump
```

![image](E:/Resource/MitrastarNote/img/hi_napt_result.png)

### 2. Nnimap ?

NNI 网络侧端口所对应的 table。 对应 gPon/ePon  , 业务通道和上行通道的对应关系。

```
root@OpenWrt:~# cli /home/cli/hal/nni/nni_pon_map_dump 
vlan=3001 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 178
vlan=3009 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 178
vlan= 200 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 242
vlan=3003 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 306
vlan=3004 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 370
vlan=  46 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 434
vlan=3006 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 498
vlan=3002 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 562
vlan=3008 igr_mask=0xf00f entry_pri=1 tcont_llid=1 gemport= 626
succ.
```

### 3. dmac ,car , pri , dscp , fdb? 

dmac( destnation mac,) ;  dscp DSCP 差分服务标记字段（Different Service Code Point） , also call TOS (Type of Services) in IP frame ; pri  (priority) ;car : also call  traffic car , is for traffic flow count; fdb (Forwarding Database) : table for router forward

### 4. 如何查看 vlan 以及绑定信息?

```
cli /home/cli/hal/sec/sec_vlan_dump
```

![image](E:/Resource/MitrastarNote/img/hi_vlan_dump_result.png)

### 5. Update Devices Info

$hi_cfm set sysinfo.gateway_mac  hi_cfm get sysinfo.gateway_mac 

### 6. router forward in different WAN



7. vlan interface does forward or not ?

E