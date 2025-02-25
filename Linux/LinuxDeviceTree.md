# 1. Basic Data Format

The *[device tree](https://elinux.org/Device_Tree_Usage)* is a simple tree structure of nodes and properties.  Properties are key-value pairs, and node may contain both properties and child nodes.  

The following  does show the format and structure of nodes and properties , but doesn't describe anything. 

```c
/dts-v1/;
/* '/' means single root node  */
/ {
    node1 {
        a-string-property = "A string";
        a-string-list-property = "first string", "second string";
        // hex is implied in byte arrays. no '0x' prefix is required
        a-byte-data-property = [01 23 34 56];
        child-node1 {
            first-child-property;
            second-child-property = <1>;
            a-string-property = "Hello, world";
        };
        child-node2 {
        };
    };
    node2 {
        an-empty-property;
        a-cell-property = <1 2 3 4>; /* each number (cell) is a uint32 */
        child-node1 {
        };
    };
};
```

(Note:  *.dtsi  header such like *.h  to include dts source file.)

## 1.1 Device Node

Every device in the system is represented by a device tree node.  node name form  such like , 

```c
<name>[@<unit-address>]
```

<name> is a simple ascii string and can be up to  31 characters in length.  

<unit-address> is included if the node describes a device with  an address.  In general, the unit address is the primary address used to  access the device, and is listed in the node's `reg` property.  We'll cover the reg property later in this document. such like

```c
/{
    /* define note pwn and register client for "driver/pwn/"*/
	pwm: pwm@10048000 {
		compatible = "mediatek,mt7981-pwm";
		reg = <0 0x10048000 0 0x1000>;
		#pwm-cells = <2>;
		clocks = <&infracfg_ao CK_INFRA_PWM_STA>,
			 <&infracfg_ao CK_INFRA_PWM_HCK>,
			 <&infracfg_ao CK_INFRA_PWM1_CK>,
			 <&infracfg_ao CK_INFRA_PWM2_CK>,
			 <&infracfg_ao CK_INFRA_PWM3_CK>;
		clock-names = "top", "main", "pwm1", "pwm2", "pwm3";
	};
};
```



##  1.2  Node Property

###  1.2.1 'compatible' property

Every device node has a `compatible` property. `compatible` is a list of strings. The first string in the list specifies the exact device that the node represents in the form `"<manufacturer>,<model>"`.  The following strings represent other devices that the device is *compatible* with.

example for led setting *ex3320-to-tm.dts*

```shell
zyleds {
		compatible = "gpio-leds";
		led_green_inet {
			label = "zyled-green-inet";
			gpios = <&pio 4 GPIO_ACTIVE_LOW>;
			default-state = "off";
		};
};
```

corresponding  driver  *linux-5.4.194/drivers/leds/leds-gpio.c*  by  ``.compatible`` property.

```c
static const struct of_device_id of_gpio_leds_match[] = {
	{ .compatible = "gpio-leds", },
	{},
};
static struct platform_driver gpio_led_driver = {
	.probe		= gpio_led_probe,
	.shutdown	= gpio_led_shutdown,
	.driver		= {
		.name	= "leds-gpio",
		.of_match_table = of_gpio_leds_match,
	},
};
module_platform_driver(gpio_led_driver);
```



### 1.2.2 'phandle' property

phandle 属性通过一个唯一的 u32 整数指向 DeviceTree 中的其他节点.



## 1.3 *[Addressing](https://elinux.org/Device_Tree_Usage)*

Devices that are addressable use the following properties to encode address information into the device tree: 

- `reg`
- `#address-cells`
- `#size-cells`

Each [addressable](https://kernel.meizu.com/device-tree.html) device gets a `reg` which is a list of tuples in the form `reg = <address1 length1 [address2 length2] [address3 length3] ... >`.   Each tuple represents an address range used by the device.  Each  address value is a list of one or more 32 bit integers called *cells*.  Similarly, the length value can either be a list of cells, or empty. 

Since both the address and length fields are variable of variable size, the `#address-cells` and `#size-cells`  properties in the parent node are used to state how many cells are in  each field.  Or in other words, interpreting a reg property correctly  requires the parent node's #address-cells and #size-cells values.  To  see how this all works, lets add the addressing properties to the sample  device tree, starting with the CPUs. 

ref





## 1.4 Interrupts



#  2. Describe Virtual  Sample Machine

This device contains following:

- One 32bit ARM CPU
- processor local bus attached to memory mapped serial port, spi bus  controller, i2c controller, interrupt controller, and external bus  bridge
- 256MB of SDRAM based at 0
- 2 Serial ports based at 0x101F1000 and 0x101F2000
- GPIO controller based at 0x101F3000
- SPI controller based at 0x10170000 with following devices 
  - MMC slot with SS pin attached to GPIO #1
- External bus bridge with following devices 
  - SMC SMC91111 Ethernet device attached to external bus based at 0x10100000
  - i2c controller based at 0x10160000 with following devices 
    - Maxim DS1338 real time clock.  Responds to slave address 1101000 (0x58)
  - 64MB of NOR flash based at 0x30000000

```c
/dts-v1/;

/ {
    compatible = "acme,coyotes-revenge";

    cpus {
        cpu@0 {
            compatible = "arm,cortex-a9";
        };
        cpu@1 {
            compatible = "arm,cortex-a9";
        };
    };

    serial@101F0000 {
        compatible = "arm,pl011";
    };

    serial@101F2000 {
        compatible = "arm,pl011";
    };

    gpio@101F3000 {
        compatible = "arm,pl061";
    };

    interrupt-controller@10140000 {
        compatible = "arm,pl190";
    };

    spi@10115000 {
        compatible = "arm,pl022";
    };

    external-bus {
        ethernet@0,0 {
            compatible = "smc,smc91c111";
        };

        i2c@1,0 {
            compatible = "acme,a1234-i2c-bus";
            rtc@58 {
                compatible = "maxim,ds1338";
            };
        };

        flash@2,0 {
            compatible = "samsung,k8f1315ebm", "cfi-flash";
        };
    };
};
```

