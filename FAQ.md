# 1. WAN 是什么 ，为什么能在 bridge 内，也能不在 bridge 内？

WAN(Wide Area Network) , 可以在 ip 地址枯竭的时候，临时用以扩充 IP 子网。WAN interface 可以在 bridge 内，也可以不在 brideg 内， 在 bridge 内则是属于桥接模式，对应于网络的二层交换；  如果不在 bridge 内则属于路由模式对网络模型的 三 层路由交换。可以通过以下方式查看。

```
$brctl show 
```





# 2. switch bewteen ePon and gPon.

ePon :
WAN working mode = 4

gPon:
WAN working mode = 1