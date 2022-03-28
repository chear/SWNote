[TOC]

## 2022.01.06  VS Code & MinGW

**VS Code** IDE for [free download](https://code.visualstudio.com/Download), while support  c&c++ after install plug-in . **MinGW**  means *Minimalist GNU for Windows*  [downloading](https://sourceforge.net/projects/mingw/files/) , is open source GCC compiler on Windows .  [to integrate VS Code & MinGW](https://zhuanlan.zhihu.com/p/77074009) .

Access to config ``c_cpp_properties.json`` and ``tasks.json``  , then you can compile and run c files ,main configuration as follow:

``c_cpp_properties.json``

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "compilerPath": "D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe",
            "cStandard": "c99",
            "cppStandard": "gnu++14",
            "intelliSenseMode": "gcc-x86"
        }
    ],
    "version": 4
}
```

``tasks.json``

```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "cppbuild",
			"label": "C/C++: gcc.exe genKeyTools",
			"command": "D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe",
			"args": [
				"-fdiagnostics-color=always",
				"-g",
				"${fileDirname}\\*.c",
				"-o",
				"${fileDirname}\\EX3220-T0_TM_GenKeyTool_V2.3_64_v7_2.exe"
			],
			"options": {
				"cwd": "${fileDirname}"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build",
			"detail": "编译器: D:\\chear\\mingw-w64\\i686-8.1.0-posix-dwarf-rt_v6-rev0\\mingw32\\bin\\gcc.exe"
		}
	]
}
```

(Use "c&c++" plug-in  within VS Code ,its easy to conflict with "clangd" ,  when change settings for plug-in should restart VS Code. )

### VS Code & Linux

want to view the source for linux on server in **VS Code**  must install  *"remote ssh"* & *"clangd"* plug-in on VS Code , also need use ``bear`` command to generate ``compile_commands.json`` for  source index. 

For example generate source index for en75xx-loader 

```shell
# bear make package/private/econet/en75xx-loader/{clean,install} V=99
# ln -s /home/chear/cicd/opal/compile_commands.json /home/chear/cicd/opal/build_dir/target-mipsel-buildroot-linux-uclibc/linux-en75xx_hgw500tx2x2e/en75xx-loader-7.3.251.900/compile_commands.json
```

(to use "clangd" should keep confirm "compile_commands.json" with-in workspace folder.)



## 2022.03.01  Merge code into 'develop' branch

to get my log by 

```shell
$ zyrepo foreach -c  "git log CTB_7528HU_7561DU_HGW500TX2X2E_20210801 --after="2021-8-1" --format=\"%ae: %h --%ce\" --author=\"Chear Huang\""
( %h: short commit hash, %ae: author email, %ce: commit email.)

$ git reset --hard "HEAD^"
(to delete last commit.)
```





## 2022.03.09  Hisi XGPon kernel

building xgPon 

```shell
## to building kernel 
make source mod=kernel V=99;
## to building sub dir and contains Makefile.hsan
make source mod=hisilicon V=99
## to building hisilicon/gateway/service
make source mod=service V=99
```



[DNS](http://c.biancheng.net/view/6457.html) based on UDP  and default for *53* port , DNS packet as following:

![dns_packet](img/dns_packet.png)

![dns](./img/dns_packet.jpg)

![dns2](./img/dns_packet_2.jpg)





