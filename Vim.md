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



## quilt

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





