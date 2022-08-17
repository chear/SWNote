# 1 . System Address layout

ARM addressing mapping.

```shell
##      |---------------|	0xFFFF FFFF FFFF FFFF
##      | kernel space  |
##		| virtual       |
##		| addressing    |
##      |---------------|	0xFFFF 0000 0000 0000
##      | illegal area  |
##      |----------- ---|	0x0000 FFFF FFFF FFFF
##      | user space    |
##		| virtual       |
##		| addressing    |
##      |---------------|	0x0000 0000 0000 0000
```



# 2 . QDMA



