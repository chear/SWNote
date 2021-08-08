# 1. MIPS

MIPS 作为业界最为经典的精简指令集架构之一，MIPS是出现最早的商业 RISC 架构芯片之一 ， 刚开始对标的产品是 Intel 的 x86 系列和 ARM 最基本的区别是 ARM 面向低功耗的移动端业务。MIPS CPU的一次操作可加载或存储1到8个字节的数据

## 1.1 [MIPS 指令](<https://www.cnblogs.com/kingwolfofsky/archive/2011/09/02/2163457.html>)

### 1.1.1 空操作

nop、ssnop（不能和其他指令同时发射，至少需要一个时钟周期）

 

### 1.1.2 寄存器间的数据传送指令

move、movf、movt、movn、movz（后四个为条件传递指令）

 

### 1.1.3  常数加载指令

dla、la（获取某些标号地址或程序中变量地址的宏指令）；

dli、li（加载常数立即数指令）；

lui（加载高位立即数指令）

 

### 1.1.4 算术/逻辑操作指令

addu、addiu、daddu，daddiu（加法指令）；

dsub、sub（会触发溢出陷入的减法操作）；

dsubu、subu（普通减法指令）；

abs、dabs（求绝对值操作）；

dneg、neg、dnegu、negu（一元非操作）；

and、andi、or、ori、xor、xori、nor、not（按位逻辑指令）；

drol、dror、rol、ror（循环左移和右移）；

dsll、dsll32、dsllv（64位左移，低位补零）；

dsra、dsra32、dsrav（64位算术右移指令）；

dsrl、dsrl32、dsrlv（64位逻辑右移指令）；

sll、sllv（32位左移指令）；

sra、srav（32位算术右移指令）；

srl、srlv（32位逻辑右移指令）；

slt、slti、sltiu、sltu（硬件指令，条件满足就写入1，否则写0）；

seq、sge、sgeu、sgt、sgtu、sle、slue、sne（根据更复杂的条件设置目的寄存器的宏指令）

 

### 1.1.5 整数乘法、除法以及求余指令

ddiv、ddivu、div、divu（整数除法的3操作数宏指令分别处理64位或32位有符号或无符号数）；

divo、divou（明确该指令是带有溢出检查的除法指令）；

dmul、mul（3操作数64位或32位乘法指令，没有溢出检查）；

mulo、mulou、dmulo、dumlou（乘法宏指令，如果结果不能存入一个通用寄存器，发生溢出，触发异常）；dmult、dmultu、mult、multu（执行有符号/无符号32/64位乘法的机器指令）；

drem、dremu、rem、remu（求余操作）；

mfhi、mflo、mthi、mtlo（用于访问整数乘除单元的结果寄存器hi和lo）

 

### 1.1.6 存取指令（内存访问指令）

lb、lbu（加载一个字节，高位可以补零，或进行符号扩展，以补充整个寄存器的长度）；

ld（加载一个双字）；

ldl、ldr、lwl、lwr、sdl、sdr、swl、swr（向左、向右加载、存储一个字、双字）；

lh、lhu（加载一个半字，高位可以补零，或进行符号扩展，以补充整个寄存器的长度）；lw、lwu（加载一个字）；pref、prefx（把数据预取到缓冲）；sb、sd、sh、sw（存储字节、双字、半字、字）；uld、ulh、ulhu、ulw、usd、usw、ush(地址非对齐的数据存取宏指令)；l.d、l.s、s.d、s.s（存取双精度和单精度浮点数的指令，地址必须对齐）；ldxcl、lwxcl、sdxcl、swxcl（采用基址寄存器+偏移寄存器的寻址方式存取指令）；

 

### 1.1.7 跳转、分支和子程序调用指令

j（无条件跳转到一个绝对地址，访问256M的代码空间）；

jal、jalr（直接或间接子程序调用，这种跳转不仅能跳转到指定地址，而且可以顺便把返回地址（当前指令地址+8）放到ra寄存器中）；

b（基于当前指令地址的无条件相对跳转）；

bal（基于当前地址的函数调用指令）；

bc0f、bc0f1、bc0t、bc0t1、bc2f、bc2f1、bc2t、bc2t1（根据协处理器0和2的条件标志进行跳转）；

bc1f、bc1f1、bc1t、bc1t1（根据浮点条件标志位进行跳转）；

beq、beq1、beqz、beqz1、bge、bge1、bgeu、bgeu1、bgez、bgez1、bgt、bgt1、bgtu、bgtu1、bgtz、bgtz1、ble、ble1、bleu、bleu1、blez、blez1、blt、blt1、bltu、bltu1、bltz、bltz1、bne、bnel、bnez、bnezl（双操作数和单操作数的比较跳转指令）；

bgeza1、bgeza11、bltza1、bltza11（如果需要 ，这些指令是用于有条件函数调用的原始机器指令）；

 

### 1.1.8 断点及陷阱指令

break（产生一个“断点”类型的异常）；

sdbbp（产生EJTAG异常的断点指令）；

syscall（产生一个约定用于系统调用的异常类型）；

teq、teqi、tge、tgei、tgeiu、tgeu、tlt、tlti、tltiu、tltu、tne、tnei（条件异常指令，对一个或两个操作数进行条件测试）；

 

　

### 1.1.9 协处理器0的功能

cfc0、ctc0（把数据拷进和拷出协处理器0的控制寄存器）；

mfc0、mtc0、dmfc0、dmtc0（在通用寄存器和协处理器0寄存器之间交换数据）；

cfc2、ctc2、dmfc2、dmtc2、mfc2、mtc2（协处理器2的指令）； 



## 1.2 Sample

C code:

```c
/* Example to illustrate mips register convention
* -Author: BNN
* 11/29/2001
*/

int addFunc(int,int);
int subFunc(int);

void main(){
	int x,y,z;
	x= 1;
	y=2;
	z = addFunc(x,y);
}

int addFunc(int x,int y){
	int value1 = 5;
	int value2;
	value2 = subFunc(value1);
	return (x+y+value2);
}

int subFunc(int value){
	return value--;
}
```



# 2. ARM

ARM 常见的跳转指令有 B, BL, MOV,LDR,









## Sample Assembler

[url](<https://blog.csdn.net/dog250/article/details/106004503>) to show the way to hack ELF executable file.

