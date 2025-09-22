

# 1.  ARM Cache

ICache (Instruction Cache) and DCache (Data Cache) are types of cache memory used in modern processors to improve performance by reducing the time it takes to access instructions and data from the main memory. This is not only for ARM ,also used for other platform such like x86, MIPS, PowerPC

- ### ICache (Instruction Cache)

  - **Purpose**: Stores instructions fetched from the main memory.
  - **Function**: When the CPU needs to execute an instruction, it first checks the ICache. If the instruction is found (cache hit), it is fetched from the ICache, which is much faster than fetching from the main memory. If not found (cache miss), the instruction is fetched from the main memory and stored in the ICache for future use.

  ### DCache (Data Cache)

  - **Purpose**: Stores data fetched from the main memory.
  - **Function**: When the CPU needs to read or write data, it first checks the DCache. If the data is found (cache hit), it is accessed from the DCache. If not found (cache miss), the data is fetched from or written to the main memory and stored in the DCache for future use.

```text
+-----------------+
|     CPU Core    |
|  +-----------+  |
|  |  ICache   |  |  <-- L1 Cache (Instruction)
|  +-----------+  |
|  +-----------+  |
|  |  DCache   |  |  <-- L1 Cache (Data)
|  +-----------+  |
+-----------------+
        |
        v
+-----------------+
|     L2 Cache    |  <-- Unified Cache (Instruction + Data)
+-----------------+
        |
        v
+-----------------+
|     L3 Cache    |  <-- Shared Cache (Instruction + Data)
+-----------------+
        |
        v
+-----------------+
|     Main Memory |
+-----------------+
```

**(Note: 调试如 u-boot 中自带的 "helloworld.bin" standalone 程序，除了需要注意CNFIG_STANDALONE_LOAD_ADDR 外，还需要在用  ``go [address]`` 加载程序之前先清理 icache 和 dcache)**

# 2. TPL and SPL

**TPL (Tertiary Program Loader)** ,  **SPL(Second Program Loader)**

TPL 必须适配 SRAM 的容量限制（通常为几十 KB），因此代码需高度精简.

## 启动流程

1. BootROM 
   - 芯片上电后，BootROM 从存储介质（eMMC/SD）加载 TPL 到 SRAM 并执行 。
2. TPL 阶段 
   - 初始化 DDR，跳转回 BootROM 。
3. SPL 阶段 
   - BootROM 加载 SPL 到 DDR，SPL 完成剩余初始化并加载 U-Boot 。
4. U-Boot 阶段 
   - 加载内核、设备树并启动系统

在 U-Boot 2023 中，**TPL 是平台启动的关键阶段** ，通过分阶段初始化（TPL → SPL → U-Boot）解决了 SRAM 容量限制问题，并实现了 DDR 初始化的开源化。其设计体现了嵌入式系统中“渐进式初始化”的典型思想



# 3. FIT (Flattened Image Tree) Image

用于 U-Boot 引导加载程序。FIT 镜像格式允许将多个镜像（如内核、设备树、文件系统等）打包到一个单一的镜像文件中，并且可以包含镜像的元数据和签名信息。

```text
FIT Image
├── Header (FIT Header)
├── Device Tree Structure
│   ├── / (root node)
│   ├── images/
│   │   ├── kernel@1
│   │   ├── fdt@1
│   │   └── ramdisk@1
│   └── configurations/
└── Data Section (实际的二进制数据)

Memory Layout:
+------------------+ <- fit_addr
|   FIT Header     |
+------------------+
|   Device Tree    |
|   Structure      |
+------------------+ <- data_offset
|   Binary Data    |
|   (kernel,       |
|    dtb, etc)     |
+------------------+
```

常用命令

```shell
# 查看 FIT 镜像内部结构
fdtdump fitImage.fit

# 查看 FIT image 内容
mkimage -l image.fit     # 只显示结构信息
mkimage -l -v image.fit  # 显示详细信息

# 提取内容
dumpimage -i image.fit -p 0 kernel.bin  # 提取第一个组件
```

对应的 ``*.dts``

```json
/dts-v1/;
/ {
    description = "U-Boot TPL FIT Image";
    #address-cells = <1>;
    images {
        tpl {
            description = "TPL Image";
            data = /incbin/("tpl.bin");
            type = "firmware";
            arch = "arm";
            compression = "none";
            load = <0x80000000>;
            entry = <0x80000000>;
            
            signature {
                algo = "sha256,rsa2048";
                key-name-hint = "dev-key";
            };
            
            // 如果启用加密
            cipher {
                algo = "aes-cbc";
                key-name-hint = "enc-key";
            };
        };
    };

    configurations {
        default = "conf-1";
        conf-1 {
            description = "TPL Configuration";
            firmware = "tpl";
            signature-1 {
                algo = "sha256,rsa2048";
                key-name-hint = "dev-key";
                sign-images = "firmware";
            };
        };
    };
};
```









