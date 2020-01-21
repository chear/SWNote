## Mitrastar Info:

id, R00499 ,  tel 15148
ecnet pdf pwd: mstcecnt
e-school: zyxel\R00499 /pwd



## Hisilicon Support Info:

海思support:	

https://hisupport.hisilicon.com/hisupport
 mitrastarcn_002/15138!sw31



## PC Setting

networking setting :

```shell
> route print -4
===========================================================================
接口列表
 19...02 00 4c 4f 4f 50 ......Npcap Loopback Adapter
 12...00 23 55 1c 92 61 ......ASIX AX88179 USB 3.0 to Gigabit Ethernet Adapter
 10...34 64 a9 16 74 39 ......Realtek PCIe GBE Family Controller
  1...........................Software Loopback Interface 1
 15...00 00 00 00 00 00 00 e0 Microsoft ISATAP Adapter #2
 11...00 00 00 00 00 00 00 e0 Teredo Tunneling Pseudo-Interface
 17...00 00 00 00 00 00 00 e0 Microsoft ISATAP Adapter #3
 18...00 00 00 00 00 00 00 e0 Microsoft ISATAP Adapter #4
===========================================================================

IPv4 路由表
===========================================================================
活动路由:
网络目标        网络掩码          网关       接口   跃点数
          0.0.0.0          0.0.0.0    172.25.24.254     172.25.24.42     10
          0.0.0.0          0.0.0.0      192.168.1.1      192.168.1.7    276
        127.0.0.0        255.0.0.0            在链路上         127.0.0.1    306
        127.0.0.0        255.0.0.0            在链路上         127.0.0.1    286
        127.0.0.1  255.255.255.255            在链路上         127.0.0.1    306
        127.0.0.1  255.255.255.255            在链路上         127.0.0.1    286
  127.255.255.255  255.255.255.255            在链路上         127.0.0.1    306
  127.255.255.255  255.255.255.255            在链路上         127.0.0.1    286
      172.25.24.0    255.255.255.0            在链路上      172.25.24.42    266
     172.25.24.42  255.255.255.255            在链路上      172.25.24.42    266
    172.25.24.255  255.255.255.255            在链路上      172.25.24.42    266
      192.168.1.7  255.255.255.255            在链路上       192.168.1.7    276
        224.0.0.0        240.0.0.0            在链路上         127.0.0.1    306
        224.0.0.0        240.0.0.0            在链路上      172.25.24.42    266
        224.0.0.0        240.0.0.0            在链路上       192.168.1.7    276
        224.0.0.0        240.0.0.0            在链路上         127.0.0.1    286
  255.255.255.255  255.255.255.255            在链路上         127.0.0.1    306
  255.255.255.255  255.255.255.255            在链路上      172.25.24.42    266
  255.255.255.255  255.255.255.255            在链路上       192.168.1.7    276
  255.255.255.255  255.255.255.255            在链路上         127.0.0.1    286
===========================================================================
永久路由:
  网络地址          网络掩码  网关地址  跃点数
          0.0.0.0          0.0.0.0      192.168.1.1     默认
===========================================================================

> route add 192.168.0.0 MASK 255.255.255.0 192.168.1.1 metric 1 if 12
> route change 172.25.24.255 mask 255.255.255.255 172.25.24.254 metric 10 if 10
```



## Pon Info

| Type  | Working Mode | OLT Note            | Note                                    |
| ----- | ------------ | ------------------- | --------------------------------------- |
| ePon  | 0 or 4       | interface epon 0/12 |                                         |
| gPon  | 1            | interface epon 0/2  |                                         |
| xgPon | 6            | interface epon 0/10 | 1) loid, 2) mac add, 3) restore default |

**TOSA**: Transmitting Optical Sub-Assembly, 光发射组件
**ROSA**: Receiving Optical Sub-Assembly, 光接收组件
**BOSA**: Bi-Directional Optical Sub-Assembly, 光发射接收组件
TOSA 是用[LD](https://www.baidu.com/s?wd=LD&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)把电信号转化为光信号发射出去的组件，ROSA是用[PD](https://www.baidu.com/s?wd=PD&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)把接受的光信号转化为电信号的组件，把两者组合在一起就是[BOSA](http://www.fiber-optic-transceiver-module.com/brief-introduction-to-tosa-rosa-and-bosa.html)了。



## Wifi Info

| Main Board | 2.5G | 5G   |
| ---------- | ---- | ---- |
| 7580_2x2   | 7603 | 7612 |
| 7580_3x3   | 7615 | 7615 |

``` shell
## 
iwpriv ra0 e2p
[0x00A0]:C8C8

iwpriv rai0 e2p 
[0x00BE]:0083
```


``` shell
# To create new file for 2M size in windows
fsutil file createnew 2M 2097152

# For upload server & client,iperf.exe not for iperf3.exe)
iperf -S -W 1M
iperf.exe -c 91.0.0.1 -w 2M -p 5001 -i 1 -t 3600   

# For download server & client
iperf -S -W 1M
iperf.exe   -c 91.0.0.172 -w 2M -p 5001 -i 1 -t 3600
```

**(Note: iperf2 server and iperf3 client dose not work together.)**



## Main Trunk

<http://wx-svn.zyxel.cn/SW3-1/mld_sg/trunk/product/MT7526G_CMCC>

<http://wx-svn.zyxel.cn/SW3-1/mld_sg/trunk/product/MT7526G_CTC>



## ITMS

login url for ITMS/RMS ( test / test!@34 ): <http://172.25.17.232:8080/itms/pages/security/loginAction.action>

user: test pwd: test!@#$ 

GUI certification url： <http://172.25.17.232:9090/ACS-server/ACS>

hgw/hgw , itms/itms



## PQA

TR069 wan: 3003

100M band width wan: 3002  pppoe (PQATest/PQAtest@123)

1G band width wan : 3007 pppoe (no username & pwd)

LOID: 2222222222 , debug00002



## ePon(CTC)

linux

root/!@45

root/1234

root/telnetadmin

(default pwd '!@34' when reset the device)

GUI: useradmin, nE7jA%5m



## gPon(CMCC)

linux login root !@qw34er
GUI: CMCCAdmin , aDm8H%MdA



## svn server

172.25.24.233 

U/P: chear/123456 

svn auth user U/P: [chear.huang@mitrastar.com](mailto:chear.huang@mitrastar.com)/ZYWUXI04499r



## Hisilicon GUI

admin / Cmcc10086# 

CMCCAdmin / aDm8H%MdA

 root/!@qw34er

gpon registed pwd: 0000000054

[GUI upgarde](http://192.168.1.1/webcmcc/firm_upgrade.html?password=!@qw34er&username=root)

[Restore Default](http://192.168.1.1/webcmcc/gui_restore_factory.html?password=!@qw34er&username=root)



## Econet Platform FW

bootloader telecomadmin / nE7jA%5m

console	admin / 1234

