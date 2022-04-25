# [ Makefile Introduction](https://seisman.github.io/how-to-write-makefile/introduction.html)

**[MakeFile](https://github.com/seisman/how-to-write-makefile)**: 用于自动化编译MakeFile定义了一系列对规则，来制定哪些文件需要先编译，那些需要后编译，那些文件需要重新编译，甚至于更复杂多功能操作，MakeFile就像一个shell脚本，可以制定操作系统命令。运行make命令，Makefile的优先选择顺序是，GNUmakefile、makefile 、Makefile 只要选中一个就不在理会其他。

包含5部分：

- 显示规则 : 说明如何生成一个或多个目标文件(包括 生成的文件, 文件的依赖文件, 生成的命令)
- 隐晦规则 :make的自动推导功能所执行的规则
- 变量定义 : Makefile中定义的变量
- 文件指示 : Makefile中引用其他Makefile; 指定Makefile中有效部分; 定义一个多行命令
- 注释 : Makefile只有行注释 "#", 如果要使用或者输出"#"字符, 需要进行转义, "#"

(Note: *make* default order **GUNmakefile > makefile > Makefile** )



## Makefile 主要参数

| **Parameter**            | **Description**                                             |
| ------------------------ | ----------------------------------------------------------- |
| --debug[=<options>]      | 输出make的调试信息, options 可以是 a, b, v                  |
| -j --jobs                | 同时运行的命令的个数, 也就是多线程执行 Makefile             |
| -r --no-builtin-rules    | 禁止使用任何隐含规则                                        |
| -R --no-builtin-variabes | 禁止使用任何作用于变量上的隐含规则                          |
| -B --always-make         | 假设所有目标都有更新, 即强制重编译                          |
| -f                       | 指定Makefile 文件                                           |
| -C                       | 指定文件夹                                                  |
| M                        | M=$(PWD) 表明然后返回到当前目录继续读入、执行当前的Makefile |

[Re1](<http://clarkgrubb.com/makefile-style-guide#phony-targets> ) , [Ref2](<https://www.cnblogs.com/wang_yb/p/3990952.html>)



## Makefile 规则

**target，prerequisites and recipe **

**target** its bases, **prerequisites** means condition for dependence, and **recipe** means for command , one of  the *target , prerequistites and recipe* compose for a **rule** .

*(Note: Makefile的基本规则，归纳起来既 . **"当一个TARGET （欲生成的目标）比它的任何一个DEPENDENCES（依赖的文件）旧时，这个TARGET就要重新生成"** .)*

```makefile
target_1 target_2 ... : prerequisites_1 prerequisites_2...
            recipe1
            recipe2
            ...
```



**依赖 (prerequisites ,dependence)**

对于Makefile，主要的是目标，条件和命令三大要素。目标 ,是要产生的东西或者要做的事情; 条件,是用于产生目标需要的文件; 命令,就是用条件转换为目标的方法。

```makefile
main.o : main.c line.h buffer.h tender.h
cc -c -o main.o main.c
#  Note: main.o 是目标，main.c ,line.h buffer.h , tender.h 是条件
#  cc 是命令，cc 是Unix 系统的 C compiler，gcc是GNU compiler ，
#  cc 来自于昂贵的Unit系统，是商业软件，可能无法下载
```



(冒号的左边至少需要一个目标，而冒号对右边可以有0个或者任意多个条件。如果没有给目标制定条件，就只有在工作路径下目标所代表的文件不存在时才会执行相应的命令去生成目标，因为没有给定条件比对时间戳)

[Ref](<https://seisman.github.io/how-to-write-makefile/introduction.html>)

**隐含规则** **Makefile 隐含规则中主要的变量名**

| **Variable** | **Descrption** |
| ------------ | -------------- |
| RM           | rm -f          |
| AR           | ar             |
| CC           | cc             |
| CXX          | g++            |

**静态模式**

静态模式可以更加容易地定义多目标的规则，可以让我们的规则变得更加的有弹性和灵活。

```txt
<targets ...> : <target-pattern> : <prereq-patterns ...>
    <commands>
    ...
```

For example:

```Makefile
objects = foo.o bar.o

all: $(objects)

$(objects): %.o: %.c
    $(CC) -c $(CFLAGS) $< -o $@
```

the *$(filter )* function used to  seperate  '*.o'  and  '*.elc' in var *$(files)*

```Makefile
files = foo.elc bar.o lose.o

$(filter %.o,$(files)): %.o: %.c
    $(CC) -c $(CFLAGS) $< -o $@
$(filter %.elc,$(files)): %.elc: %.el
    emacs -f batch-byte-compile $<
```





## automake

[automake](<http://www.gnu.org/software/automake/manual/automake.html>) use to generate Makefile.in for configure from Makefile.am



##  ifeq && ifneq

Makefile 中的 ``ifeq`` 没有 "&&"  ， "||"

```Makefile
ifeq ($（变量名）， 变量值 )
...
else ifeq ($(..), ..)
...
else
...
endif
```

and

```Makefile
## if(VALUE1 && VALUE2){...}
ifneq ($(VALUE1)$(VALUE2),)
	do something....
endif

## if(VALUE1 == V1 && VALUE2 == V2) {...}
ifeq ($(VALUE1)_$(VALUE2), V1_V2)
	do something....
endif
```

or

```Makefile
## if( VALUE1 == V1 || VALUE2 == V2 ) {...}
ifneq ($(findstring $(VALUE1)$(VALUE2),  V1  V2),)
	do something...
endif
```

Note:

| 关键字 | 功能                                              |
| ------ | ------------------------------------------------- |
| ifeq   | 判断参数是否不相等，相等为 true，不相等为 false。 |
| ifneq  | 判断参数是否不相等，不相等为 true，相等为 false。 |
| ifdef  | 判断是否有值，有值为 true，没有值为 false。       |
| ifndef | 判断是否有值，没有值为 true，有值为 false。       |





# FAQ:

## 1. different bewteen '=' , ':=' , '?=' , '+=' ?

= 是最基本的赋值 := 是覆盖之前的值 ?= 是如果没有被赋值过就赋予等号后面的值 += 是添加等号后面的值

"=" 和 ":=" 区别

1. “=” make会将整个makefile展开后，再决定变量的值。也就是说，变量的值将会是整个makefile中最后被指定的值。如下y的值将会是 “xyz bar” ，而不是 “foo bar” 。

   ```Makefile
   x = foo 
   y = $(x) bar 
   x = xyz
   #Output: 
   # y=zyx bar
   ```

2. “:=” “:=”表示变量的值决定于它在makefile中的位置，而不是整个makefile展开后的最终值.

   ```Makefile
   x := foo 
   y := $(x) bar 
   x := xyz
   #Output: 
   # y=foo bar
   ```

   



## 2. what [Makefile.am](http://Makefile.am) and [Makefile.in](http://Makefile.in)?

[Makefile.am](http://Makefile.am) is a programmer-defined file and is used by automake to generate the Makefile.in file (the .am stands for automake). The configure script typically seen in source tarballs will use the [Makefile.in](http://Makefile.in) to generate a Makefile. The configure script itself is generated from a programmer-defined file named either [configure.ac](http://configure.ac) or [configure.in](http://configure.in) (deprecated). I prefer .ac (for autoconf) since it differentiates it from the generated [Makefile.in](http://Makefile.in) files and that way I can have rules such as make dist-cleanwhich runs ``rm -f *.in`` . Since it is a generated file, it is not typically stored in a revision system such as Git, SVN, Mercurial or CVS, rather the .ac file would be.

ref: aclocal_autoconf_diff.md



## 3. what is "$@" and "$<" ?

The **$@** and **$<** are called automatic variables. The variable **$@** represents the name of the file been created (i.e. the target) and **$<** represents the first prerequisite required to create the output file.

Other way **$@** is the name of the file being generated, and **$<** the first prerequisite (usually the source file). You can find a list of all these special variables in the [GNU Make manual](http://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html#Automatic-Variables).

For example, consider the following declaration:

```
all: library.cpp main.cpp
```

In this case:

$@ evaluates to all $< evaluates to library.cpp $^ evaluates to library.cpp main.cpp

Automatic Variables description :

```
$< The name of the first prerequisite 
$? The names of all the prerequisites that are newer than the target 
$^ The names of all the prerequisites, with spaces between them 
$+ This is like `$^', but prerequisites listed more than once are 
```

duplicated in the order they were listed in the makefile .

ref: <https://stackoverflow.com/questions/3220277/what-do-the-makefile-symbols-and-mean>

*Tips :  '$@' in Makefile means for target files,  in [Shell script](<https://blog.csdn.net/qq_35744460/article/details/89702566>) means  means for paramater.*



## 4. The makefile execute order , and .PHONY

if did not specified targe ,makefile will execte the first targe in Makefile.

By default, Makefile targets are "file targets" - they are used to build files from other files. Make assumes its target is a file, and this makes writing Makefiles relatively easy:

```
#  create_one_from_the_other foo bar
foo: bar
```

However, sometimes you want your Makefile to run commands that do not represent physical files in the file system. Good examples for this are the common targets "clean" and "all". Chances are this isn't the case, but you may potentially have a file named clean in your main directory. In such a case Make will be confused because by default the clean target would be associated with this file and Make will only run it when the file doesn't appear to be up-to-date with regards to its dependencies. These special targets are called phony and you can explicitly tell Make they're not associated with files, e.g.:

```
.PHONY: clean
clean:
  rm -rf *.o
```

Now make clean will run as expected even if you do have a file named clean. In terms of Make, a phony target is simply a target that is always out-of-date, so whenever you ask make <phony_target>, it will run, independent from the state of the file system. Some common make targets that are often phony are: all, install, clean, distclean, TAGS, info, check.

Ref: makefile使用规则



## 5. Makefile & shell

1. 在Makefile中只能在target中调用Shell脚本，其他地方不能输出。
2. Makefile中的shell，每一行是一个进程，不同行之间变量值不能传递。所以，Makefile中的shell不管多长也要写在一行。
3. Makefile中的变量以$开头， 所以，为了避免和shell的变量冲突，shell的变量以$$开头
4. '@' 代表执行命令不需要返回结果 , '-'  代表创建或者删除文件，如果碰到文件不存在或者已经创建，那么希望忽略掉这个错误，继续执行， '$' 代表Makefile扩展变量
5. 在 Makefile 中定义变量需要注意

```Makefile
env = var 		# Makefile veriable
targt:
	env1=var1	# Shell veriable
```

**(在 Makefile 中编写 shell 脚本需要特别注意隐藏字符，比如回车换行符，如果隐藏字符位置不对可能会导致 Makeile 执行失败，并且较难排除。在 vim 命令模式中 :set invlist 打开或者关闭隐藏字符. )**

```makefile
#===============================================================================
# Macro
#===============================================================================
CURRENT_DIR=$(shell pwd)
Q=@
BOOTLOADER_PATH=$(CURRENT_DIR)/../platform/bootloader
LINUX_PATH=$(CURRENT_DIR)/../platform/bsp/linux-3.18.21

.PHONY:appdev_env
appdev_env:
	@if [ ! -e $(CURRENT_DIR)/sysapps/.ctagsignore ];then \
		echo "$(CURRENT_DIR)/sysapps/private/mitrastar/libplatform/realtek/960x/"  > $(CURRENT_DIR)/sysapps/.ctagsignore; \
		echo "$(CURRENT_DIR)/sysapps/public/others/openssl-0.9.7f/test/fips_aes_data/" >> $(CURRENT_DIR)/sysapps/.ctagsignore; \
		echo "svn" >> $(CURRENT_DIR)/sysapps/.ctagsignore; \
	fi;
	$(Q)cd $(CURRENT_DIR)/sysapps; \
	ctags -R --languages=c --c-kinds=+px --fields=+aiKSz --extra=+q --exclude=@.ctagsignore -f c_tags; \
	/usr/bin/find $(CURRENT_DIR)/sysapps/ -name "*.c" -o -name "*.h" -o -name "*.java" -o -name "*.cpp" -o -name "*.py" -o -name "*.sh" -o -name "*.lua" > $(CURRENT_DIR)/sysapps/cs.files;\
	cscope -b -k -q $(CURRENT_DIR)/sysapps/cs.files;
	@if [ -e $(CURRENT_DIR)/sysapps/.previm ];then\
		rm $(CURRENT_DIR)/sysapps/.previm;\
	fi;
	echo "set tags+=$(CURRENT_DIR)/sysapps/c_tags " > $(CURRENT_DIR)/sysapps/.previm 

.PHONY:clean
clean:
	$(RM) $(CURRENT_DIR)/sysapps/.previm ;\
	$(RM) $(CURRENT_DIR)/sysapps/c_tags;\
	$(RM) $(CURRENT_DIR)/sysapps/cscope* ;\
	$(RM) $(CURRENT_DIR)/sysapps/cs.files ;\
	$(RM) $(CURRENT_DIR)/sysapps/.ctagsignore;\
	$(RM) $(BOOTLOADER_PATH)/.ctagsignore;\
	$(RM) $(BOOTLOADER_PATH)/.previm;\
	$(RM) $(BOOTLOADER_PATH)/cscope*;


.PHONY:bootloader_dev_env
bootloader_env:
	@if [ ! -e $(BOOTLOADER_PATH)/.ctagsignore ];then \
		echo "svn" > $(BOOTLOADER_PATH)/.ctagsignore; \
	fi;
	$(Q)cd $(BOOTLOADER_PATH); \
	ctags -R --languages=c --c-kinds=+px --fields=+aiKSz --extra=+q --exclude=@.ctagsignore -f c_tags; \
	/usr/bin/find $(BOOTLOADER_PATH)/ -name "*.c" -o -name "*.h" -o -name "*.java" -o -name "*.cpp" -o -name "*.py" -o -name "*.sh" -o -name "*.lua" > $(BOOTLOADER_PATH)/cs.files;\
	cscope -b -k -q $(BOOTLOADER_PATH)/cs.files;
	@if [ -e $(BOOTLOADER_PATH)/.previm ];then\
		rm $(BOOTLOADER_PATH)/.previm;\
	fi;
	echo "set tags+=$(BOOTLOADER_PATH)/c_tags " > $(BOOTLOADER_PATH)/.previm 
```



## 6. 常用函数

### 6.1 'wildcard'

```Makefile
## Des: This script wile compile all the *.c source files to *.o , then next to release an executable file.
# wildcard : 扩展通配符,一般我们可以使用“$(wildcard *.c)”来获取工作目录下的所有的.c文件列表
# notdir ： 去除路径
# patsubst ：替换通配符

# Sample Makefile 
# 首先使用“wildcard”函数获取工作目录下的.c文件列表，之后将列表中所有文件名的后缀.c替换为.o。
# 得到在当前目录可生成的.o文件列表。因此在一个目录下可以使用如下内容的 Makefile 
# 将工作目录下的所有的.c文件进行编译并最后连接成为一个可执行文件
objects := $(patsubst %.c,%.o,$(wildcard *.c))
foo : $(objects)
cc -o foo $(objects)
```

### 6.2  'eval'

The [eval](<https://www.gnu.org/software/make/manual/html_node/Eval-Function.html#Eval-Function>) function is very special: it allows you to define new makefile constructs that are not constant; which are the result of evaluating other variables and functions.

```Makefile
pointer := pointed_value

define foo 
var := 123
arg := $1
$$($1) := ooooo
endef 

$(info $(call foo,pointer))
# output :
# var := 123
# arg := pointer
# $(pointer) := ooooo
# -----------------------------
# var: , arg:
# pointer: pointed_value, pointed_value:
# done.
# -----------------------------

$(eval $(call foo,pointer))
# output:
# var := 123
# arg := pointer
# $(pointer) := ooooo
# -----------------------------
# var: 123, arg: pointer
# pointer: pointed_value, pointed_value: ooooo
# done.
# -----------------------------
target:
        @echo -----------------------------
        @echo var: $(var), arg: $(arg)
        @echo pointer: $(pointer), pointed_value: $(pointed_value)
        @echo done.
        @echo -----------------------------
```

### 6.3 'foreach'

```Makefile
# $(foreach <var>,<list>,<text>)
# var：局部变量
# text：文件列表，空格隔开，每一次取一个值赋值为变量var
# commond：对var变量进行操作（一般会使用var变量，不然没意义），每次操作结果都会以空格隔开，最后返回空格隔开的列表。
 
# Sample Make
names := a b c d
files := $(foreach n,$(names),$(n).o)
# output $(files) = "a.o b.o c.o d.o"
```

### 6.4 '$(warning)'

[$(warning)](<https://www.oreilly.com/openbook/make3/book/ch12.pdf>) used to debugging the Makefile .

```Makefile
# Sample Make
$(warning THIS IS MESG OUTPUT)

$(warning A target)target: $(warning In a prerequisite list)makefile $(BAZ)
	$(warning In a command script)
 	ls
```



## 7. 字符串常用函数

### 



## 8. 'FORCE'

If a rule has no prerequisites or recipe, and the target of the rule is a nonexistent file, then `make` imagines this target to have been updated whenever its rule is run. This implies that all targets depending on this one will always have their recipe run.  This rule can call anyname ,  in this case just call ``FORCE``.

```makefile
file = test.txt
all: generate-a-file
generate-a-file: $(file) 
 
#FORCE means running target everytime
$(file): FORCE  
	@echo "Force to generate a test file for every make ..."
	rm -rf $(file) && echo `date "+%Y-%m-%d %H:%M:%S"` > $(file)
 
FORCE:
.PHONY: FORCE
```



## 9.  How to debug with Makefile

1.  use ``$(warning)`` function

2. --debug option ,  debug option format like ``--debug=option1,option2`` levels   "basic (default)", "verbose", "implicit" ,"jobs " , "all (all the previous options and is the default when using the -d option.)"

3. *make -n*  means display or show the command will be exec , but still not.