# Flash Basic

![flash](img\flash.png)

*Note: What follows is a high-level description of the generic behaviour of flash. There are thousands of different NAND chips available, each potentially with slightly different instruction sets, block/page sizes, performance characteristics etc.*

- The **package** is the memory chip, i.e. the black rectangle with little electrical connectors sticking out of it. If you look at an SSD, a flash card or the internals of a flash array you will see many flash packages, each of which is produced by one of the big flash manufacturers: Toshiba, Samsung, Micron, Intel, SanDisk, SK Hynix. These are the only companies with the multi-billion dollar fabrication plants necessary to make NAND flash.
- Each package contains one or more **dies** (for example one, two, or four). The die is the smallest unit that can independently execute commands or report status.
- Each die contains one or more **planes** (usually one or two). Identical, concurrent operations can take place on each plane, although with some restrictions.
- Each plane contains a number of **blocks**, which are the smallest unit that can be erased. Remember that, it’s really important.
- Each block contains a number of **pages**, which are the smallest unit that can be programmed (i.e. written to).

The important bit here is that program operations (i.e. writes) take place to a page, which might typically be 8-16KB in size, while erase operations take place to a block, which might be 4-8MB in size. Since a block needs to be erased before it can be programmed again (*sort of, I’m generalising to make this easier), all of the pages in a block need to be candidates for erasure before this can happen.

**(Note: **

- **[MTD is neither a block nor a char device.]((<http://linux-mtd.infradead.org/faq/general.html#L_mtd_what>) )  **
- **Ext2 ,ext3 and FAT are file systems work with block device not for MTD devices, MTD device work with jffs2 or squashFS . **
- **the /dev/mtdblockX device nodes  are simple Flash Translation Layers (FTLs) over the MTD devices.) **

