IPC Introduction





## Signal



## Pipe/FIFO

The **pipe** in Linux is identical in concept to the pipe in Unix, and is a core element of the Unix philosophy. The core idea that relates to pipes is you can pipeline simple apps together and create a complex operation using pipes instead of needing large, complex applications.

​	父进程和子进程之间，或者两个兄弟进程之间，可以通过系统调用建立起一个单向的通信管道。但是这种管道只能由父进程开建立，对于子进程来说是静态的，与生俱来的。管道两端的进程各自都将该管道视作一个文件。一个进程写，另一个进程读。并且，通过管道传递的内容遵循“先入先出”（FIFO）的原则。每个管道都是单向的，需要双向通信时就要建立两个管道。



Socket

Message queue



Semaphore



Shared Memory