# 1.  Arch Introduction

![econet_arch](img/econet_arch.bmp)



# 2. Download & Building Source

files structure based on Econet en_7580 sdk.

```shell
root@michael-HP-Pro-3330-MT:/home/michael/Code/michael/7528/org# tree ./ -d -L 1
./
├── app_bsp
├── apps
├── bootrom
├── doc
├── filesystem
├── global_inc
├── kernel_ext
├── lib_install
├── linux-3.18.21
├── linux-ecnt
│
├── modules
├── Project
├── tools
├── version
└── windows_rndis_driver
```



decompress SDK and building the source

```shell
root@:# mkdir -p releasebsp
root@:# cp releasebsp_profilename_relasedate.tgz ./releasebsp
root@:# tar -xzvf releasebsp_profilename_relasedate.tgz
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT clean 
root@:# fakeroot make PROFILE=CT_EN7528_LE_7592_7613_JOYME3_demo CUSTOM=CT All
```

generate image at  ''*releasebsp/Project/images/tcboot.bin* " , "*releasebsp/Project/images/tclinux.bin*"

