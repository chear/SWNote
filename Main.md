### Mitrastar Info

id, R00499 ,  tel 15148

ecnet pdf pwd: mstcecnt

### Pon Info

| Type  | Working Mode | OLT Note            | Note                                    |
| ----- | ------------ | ------------------- | --------------------------------------- |
| ePon  | 4            | interface epon 0/12 |                                         |
| gPon  | 1            | interface epon 0/2  |                                         |
| xgPon | 6            | interface epon 0/10 | 1) loid, 2) mac add, 3) restore default |


### Wifi Info
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
# For upload server & client
iperf -S -W 1M
iperf.exe -c 91.0.0.1 -w 2M -p 5001 -i 1 -t 3600

# For download server & client
iperf -S -W 1M
iperf.exe   -c 91.0.0.172 -w 2M -p 5001 -i 1 -t 3600
```



### Main Trunk

<http://wx-svn.zyxel.cn/SW3-1/mld_sg/trunk/product/MT7526G_CMCC>

<http://wx-svn.zyxel.cn/SW3-1/mld_sg/trunk/product/MT7526G_CTC>

### ITMS

login url (IE only): <http://172.25.17.232:8080/itms/pages/security/loginAction.action>

user: test pwd: !@qw34er certification url： <http://172.25.17.232:9090/ACS-server/ACS>

### ePon(CTC)

linux

root/!@45

root/1234

root/telnetadmin

(default pwd '!@34' when reset the device)

GUI: useradmin, nE7jA%5m

### gPon(CMCC)

linux login root !@qw34er
GUI: CMCCAdmin , aDm8H%MdA

### svn server

172.25.24.233 

U/P: chear/123456 

svn auth user U/P: [chear.huang@mitrastar.com](mailto:chear.huang@mitrastar.com)/ZYWUXI04499r

### Hisilicon GUI

admin / Cmcc10086# 

CMCCAdmin / aDm8H%MdA

 root/!@qw34er

gpon registed pwd: 0000000054

# Econet







# Hisilicon:

