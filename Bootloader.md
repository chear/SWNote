

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

(Note: 调试如 u-boot 中自带的 "helloworld.bin" standalone 程序，除了需要注意CONFIG_STANDALONE_LOAD_ADDR 外，还需要在用  ``go [address]`` 加载程序之前先清理 icache 和 dcache)



# 2. FIT (Flattened Image Tree) Image

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









