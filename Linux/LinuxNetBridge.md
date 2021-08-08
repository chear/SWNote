# 1. [Net:Bridge](https://www.cnblogs.com/wanderxjtu/archive/2009/04/20/1439997.html)

A bridge is a way to connect two [Ethernet](http://en.wikipedia.com/wiki/Ethernet) segments together in a protocol independent way. Packets are forwarded based on Ethernet address, rather than IP address (like a router). Since forwarding is done at Layer 2, all protocols can go transparently through a bridge. A Linux bridge is more powerful than a pure hardware bridge because it can also filter and shape traffic. The combination of bridging and firewalling is done with the companion project [ebtables](http://ebtables.sourceforge.net/).

## 1.1 Module Loading

If the module is configured and installed correctly, it will get automatically loaded on the first **brctl** command.

 ```shell
#
 ```



# 2. Spanning Tree Protocol

If you are running multiple or redundant bridges, then you need to enable the Spanning Tree Protocol ([STP](http://www.linuxfoundation.org/en/Net:Bridge_STP)) to handle multiple hops and avoid cyclic routes.



## 2.1 STP tuning

There are a number of parameters related to the [Spanning Tree Protocol](http://www.linuxfoundation.org/en/Net:Bridge_STP) that can be configured. The code autodetects the speed of the link and other parameters, so these usually don't need to be changed.



## 2.2 Bridge priority

Each bridge has a relative priority and cost. Each interface is associated with a port (number) in the STP code. Each has a priority and a cost, that is used to decide which is the shortest path to forward a packet. The lowest cost path is always used unless the other path is down. If you have multiple bridges and interfaces then you may need to adjust the priorities to achieve optimium performance. The bridge with the lowest priority will be elected as the root bridge. The root bridge is the "central" bridge in the spanning tree.



## 2.3 Path priority and cost

Each interface in a bridge could have a different speed and this value is used when deciding which link to use. Faster interfaces should have lower costs. For multiple ports with the same cost there is also a priority





## 2.4 Forwarding delay

Forwarding delay time is the time spent in each of the Listening and Learning states before the Forwarding state is entered. This delay is so that when a new bridge comes onto a busy network it looks at some traffic before participating.



## 2.5 Hello time

Periodically, a hello packet is sent out by the Root Bridge and the Designated Bridges. Hello packets are used to communicate information about the topology throughout the entire Bridged Local Area Network.

If a another bridge in the spanning tree does not send out a hello packet for a long period of time, it is assumed to be dead. This timeout is set with:



# 4. Creating a bridge device

```shell
# ifconfig eth0 0.0.0.0
# ifconfig eth1 0.0.0.0
# brctl addbr mybridge
# brctl addif mybridge eth0
# brctl addif mybridge eth1
# ifconfig mybridge up
```

