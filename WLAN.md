# Basic Introduction

| Abbreviations | Full spelling         | Chinese explanation |
| ------------- | --------------------- | ------------------- |
| DA            | Destination Address   | 目的地址            |
| SA            | Source Address        | 源地址              |
| MSDU          | MAC Service Data Unit | MAC 服务数据单元    |
| SNAP          |                       | 子网络访问协议      |
| DFS           |                       | 动态频率选择        |
|               |                       |                     |
|               |                       |                     |



Distribution System (DS)

- A logical component of 802.11 used to forward frames to their destinations.
- APs are connected by DS(typically Ethernet).

Access Point (AP)

- manages wireless data traffic and controls the communication within the WLAN
- “bridges” between the wireless clients and the wired network. 

Basic Service Set( BSS )

Each BSS is assigned a BSSID, a 48-bit binary identifier that distinguishes it from
other BSSs throughout the network.  In infrastructure networks, the
BSSID is the MAC address used by the wireless interface in the access point.

1. Infrastructure BSS

   - Control by AP
   - All stations communication with AP

2. Independent BSS (Ad Hoc BSS)

   - No AP

   - Peer-to-Peer network

Extended Service Set( ESS)

- A collection of Infrastructure BSSs that connect through DS

SSID

- Service Set Identity: a string of bytes that labels the BSSID as belonging to a larger
  agglomeration 
- between 1 and 32 bytes. 

RSSI (**R**eceived **S**ignal **S**trength **I**ndication)

- The optional part of the wireless transmission layer, is used to determine the link quality and whether to
  increase the broadcast transmission intensity.

RSNI (**R**eceived **S**ignal to **N**oise **I**ndicator)

- An indication of the signal to noise plus interference ratio of a received IEEE 802.11 frame. RSNI is defined by the ratio of the received signal power (RCPI-ANPI) to the noise plus interference power (ANPI) as measured on the channel and at the antenna connector used to receive the frame.

RCPI (**R**eceived **C**hannel **P**ower Indicator)

- An indication of the total channel power (signal, noise and interference) of a
  received IEEE 802.11 frame measured on the channel and at the antenna connector
  used to receive the frame.

