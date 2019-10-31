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









