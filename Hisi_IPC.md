# IPC Introduction	

IPC ( Linux Process Introduction) , the **Program** is image for machine code and data which is stored in disks and can be executed it is a passive static entity, but the **Process** is  program which executing under CPU, can  apply and own the system resource .  contain the program and info of current  activity it is a dynamic entity. The ways for Linux IPCs  such like **Signal** , **Pipe /FIFO** , **Message queue** , **Semaphore**, **Share Memory** , more detail check the following or [this](https://beej.us/guide/bgipc/).

## Signal

**Signals** are a limited form of [inter-process communication](https://en.wikipedia.org/wiki/Inter-process_communication) (IPC), typically used in [Unix](https://en.wikipedia.org/wiki/Unix), [Unix-like](https://en.wikipedia.org/wiki/Unix-like), and other [POSIX](https://en.wikipedia.org/wiki/POSIX)-compliant operating systems. A signal is an [asynchronous](https://en.wiktionary.org/wiki/asynchronous) notification sent to a [process](https://en.wikipedia.org/wiki/Process_(computing)) or to a specific [thread](https://en.wikipedia.org/wiki/Thread_(computer_science)) within the same process in order to notify it of an event that occurred. 

When a signal is sent, the operating system interrupts the target process' normal [flow of execution](https://en.wikipedia.org/wiki/Control_flow) to deliver the signal. Execution can be interrupted during any [non-atomic instruction](https://en.wikipedia.org/wiki/Atomic_operation). If the process has previously registered a **signal handler**, that routine is executed. Otherwise, the default signal handler is executed. 

Embedded programs may find signals useful for inter-process  communications, as the computational and memory footprint for signals is  small. 

Signals are similar to [interrupts](https://en.wikipedia.org/wiki/Interrupt), the difference being that interrupts are mediated by the processor and handled by the [kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system))  while signals are mediated by the kernel (possibly via system calls)  and handled by processes. The kernel may pass an interrupt as a signal  to the process that caused it (typical examples are [SIGSEGV](https://en.wikipedia.org/wiki/SIGSEGV), [SIGBUS](https://en.wikipedia.org/wiki/SIGBUS), [SIGILL](https://en.wikipedia.org/wiki/SIGILL) and [SIGFPE](https://en.wikipedia.org/wiki/SIGFPE)). 

Each signal has a current disposition, which determines how the  process behaves when it is delivered the signal.

( Note: 信号是Unix/Linux系统在一定条件下生成的事件。信号是一种异步通信机制，进程不需要执行任何操作来等待信号的到达。信号异步通知接收信号的进程发生了某个事件，然后操作系统将会中断接收到信号的进程的执行，转而去执行相应的信号处理程序。)



Pipe/FIFO



Socket

Message queue



Semaphore



Shared Memory