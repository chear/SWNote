##  Ctags

[reference](http://docs.ctags.io/en/latest/news.html?highlight=macro#defining-a-macro-in-cpreprocessor-input)

```shell
$ cat linux.ctags
--langdef=linux{base=C}
--kinddef-linux=s,syscall,system calls
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