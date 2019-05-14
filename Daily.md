make menuconfig
General setup  --->  
    [*] Configure standard kernel features (for small systems)  --->
        [*]   Load all symbols for debugging/ksymoops
        [*]     Include all symbols in kallsyms
        [*]     Do an extra kallsyms pass  

 

注: 配置CONFIG_KALLSYMS_ALL之后，就不需要修改all_symbol静态变量为1了

 

 

 

 

 

 

 

 

​                   |--------------------|
                   |                    |
                   |                    |
                   ~                    ~
                   |                    |
                   |                    |
           0xc05d 1dc0        |--------------------| _end
                   |                    |
                   |                    |
                   |    BSS             |
                   |                    |
                   |                    |
           0xc05a 4500        |--------------------| __bss_start
                   |                    |
          0xc05a 44e8        |--------------------| _edata
                   |                    |
                   |                    |
                   |    DATA            |
                   |                    |
                   |                    |
           0xc058 2000        |--------------------| __data_start  init_thread_union
                   |                    | 
      0xc058 1000 _etext |--------------------|
                   |                    |
                   | rodata             |
                   |                    |
           0xc056 d000        |--------------------| __start_rodata
                   |                    |
                   |                    |
                   | Real text          |
                   |                    |
                   |                    |
     0xc02a 6000   TEXT |--------------------| _text        __init_end    
                   |                    |
                   | Exit code and data | DISCARD 这个section在内核完成初始化后
                   |                    |         会被释放掉
0xc002 30d4        |--------------------| _einittext
                   |                    |
                   | Init code and data |
                   |                    |
0xc000 8000 _stext |--------------------|<------------ __init_begin
                   |                    |
0xc000 0000        |--------------------|

 

arch/arm/kernel/vmlinux.lds.S