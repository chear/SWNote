## Hisilicon CM (Config Management)

### CM Introduction

As the fallowing shows , the CM provide interface to upper protocol such like Web or TR069 to control  the system service and even hardware. 

![cm_structure](img\hisi_cm_structure.png)

CM could be :

- Operating business logical 
  provide  API  , received and collect configure message from WEB , Tr069  or other module , to forward and convert the format to SAL.

- Store data

- Initialize configuration ,CM loading configurations  by sequence and dependency  when device  startup 


**CM Flow Process**

![image](img\hi_cm_process.png)


### CM Architecture
CM Contains two part: 

**mib** (source at:  HSANV200R010C01SPC011/hisilicon/gateway/service/cm/mib/) 

​	To store the data , loading , initialize and maintenance database in memory.

**odl** (source at:  HSANV200R010C01SPC011/hisilicon/gateway/service/cm/odl/)

​	To operating the data , logical verify ,event callback.

**(Note:  "log_voice_cli odl odl_log " to open CM Logs) **

```shell
hisilicon/gateway/service/cm/
├── dhcpSimulation
├── downloadDiag
├── ftp
├── lanhost
├── mib
├── mib
   ├── defaultconfig.xml
   ├── include
   ├── Makefile
   └── source
├── odl
   ├── cli
   ├── include
   ├── Makefile
   └── source
├── odlapi
├── pppem
├── samba
├── service
├── stats
├── storage
├── timer
└── usbmount
```
![image](img\hi_cm_structure.png)





#### GPon Service Interaction

![image](img\hi_cm.png)

#### Web Service Interaction

![image](img\hi_cm2.png)

### Related API

source at: HSANV200R010C01SPC011/hisilicon/gateway/service/cm/odl/odlapi/

```c
word32 igdCmConfAdd(uword32 tab_id, uword8 *pucInfo, uword32 len);
word32 igdCmConfDel(uword32 tab_id, uword8 *pucInfo, uword32 len); 
word32 igdCmConfSet(uword32 tab_id, uword8 *pucInfo, uword32 len); 
word32 igdCmConfGet(uword32 tab_id, uword8 *pucInfo, uword32 len); 
word32 igdCmConfGetEntryNum(uword32 tab_id, uword32 *entrynum); 
word32 igdCmConfGetAllEntry(uword32 tab_id, uword8 *pucInfo, uword32 len); 
word32 igdCmOamCtrl(uword32 ulCmd); 

hi_int32 hi_notifier_create(hi_char8 *pc_name, hi_uint32 ui_data_size)； 
#define HI_DEF_NCALL(nt_name, type, data)； 
hi_int32 hi_notifier_call(hi_char8 *pc_name, hi_void *pv_data); 
```


### CM Sample


```c



```

