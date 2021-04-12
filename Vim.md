##  Ctags

**Universal-Ctags** replace to **Exuberant-Ctags**  ,and more powerful , source at [Github](<https://github.com/ universal-ctags/ctags>) , [Docs](<http://docs.ctags.io/en/latest/news.html?highlight=macro#defining-a-macro-in-cpreprocessor-input>)

linux.ctags to define macro for *SYSCALL_DEFINE0*  to *SYSCALL_DEFIN9*

```shell
$ cat linux.ctags
--langdef=linux{base=C}								# define language "linux"
--kinddef-linux=s,syscall,system calls				# letter,name,description
--regex-linux=/SYSCALL_DEFINE[0-9]\(([^, )]+)[\),]*/\1/s/   
```





```shell
$ ./ctags --options=NONE --options=./linux.ctags -x --_xformat="%20N %10K %10l"  -o - input.c
ctags: Notice: No options will be read from files or environment
         setpriority    syscall      linux
        set_one_prio   function          C
     SYSCALL_DEFINE3   function          C
```

**Note:  exuberant-ctags repository was started by Reza Jelveh and was later moved to the universal-ctags organization.**



### Ctags ignore files

``--exclude=@.ctagsignore``  to specify excluded dir for the ``catgs``  , for ``-R .``  should be setting absolute path :

```shell
# cd makecode/sysapps/private/mitrastar/libCmd/
# ctags --options=NONE --options=/home/chear/.vim_runtime/ctags_parser/linux.ctags --langmap=c:+.h --extras=+q --if0=no -o c_tags --verbose=true --exclude=@.ctagsignore -R .
# cat .ctagsignore
BROADCOM/* 
```

``-R `pwd` `` should be setting for full path ,

```shell
# ctags --options=NONE --options=/home/chear/.vim_runtime/ctags_parser/linux.ctags --langmap=c:+.h --extras=+q --if0=no -o c_tags --verbose=true --exclude=@.ctagsignore -R `pwd`

/home/chear/HGW-500TX2X2-E/dev/makecode/sysapps/private/mitrastar/libCmd/BROADCOM/*
```

ZTE :

```Makefile
tags ctags:
	ctags -w -o $(obj)ctags `$(FIND) $(FINDFLAGS) $(TAG_SUBDIRS) \
                                                -name '*.[chS]' -print`

etags:
    etags -a -o $(obj)etags `$(FIND) $(FINDFLAGS) $(TAG_SUBDIRS) \
                                                -name '*.[chS]' -print`

( finally command ./ctags -w -o ctags `find -L tools  arch/arm/cpu/zx279128s/ arch/arm/lib/ common/ drivers/crypto/ drivers/i2c/ drivers/mtd/ drivers/mtd/nand/ drivers/mtd/spi/ drivers/net/ drivers/net/phy/ drivers/rtc/ drivers/serial/ drivers/spi/ drivers/usb/ulpi/ lib/libfdt/ lib/ lib/lzma/ lib/lzo/ lib/zlib/ net/ board/zxic/zx279128sevb/ include -name '*.[chS]' -print` )
```





## Quilt

[Quilt](<http://savannah.nongnu.org/projects/quilt>) is a tool to manage a **series of patches** relative to a common code base.

the following command contain whole process to **create ,apply , remove and delete patch** in *open/built-dir/* 

```shell
$ cd oenwrt/built-dir/
$ quilt new 01_test.diff
(Create new patch named 01_test.diff )
$ quilt edit FILE_NAME
$ quilt refresh
(Apply the patch.)
$ quilt series
(Display the quilt list)
$ quilt pop
(Remove the quilt patch)
$ quilt delete
(Remove and delete patch from quilt list )
```



## syntax
**[syntax](<http://vimcdoc.sourceforge.net/doc/syntax.html#:syn-include>)** its internal function within vim.  It used to highlight the keyword for easy to read.  Also the **[filetype](<http://vimcdoc.sourceforge.net/doc/filetype.html#remove-filetype>)** is internal function . Vim can detect the type of file that is edited , This is done by checking the  file name and sometimes by inspecting the contents of the file for specific text. when specify the **filetype**  for edited file means  specify the same for **syntax** , and then should display highlight keyword as defined, such as following.

```vim
:set filetype=make
:set filetype=idl
:set syntax=sh
```



## cscope

**cscope** its powerful than **ctags**.

**(Note: with-in Hisilicon project , cscope  can not recognize symbol like 'hi_void' ,so can not use to find function. )**