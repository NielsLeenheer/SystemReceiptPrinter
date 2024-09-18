# SystemReceiptPrinter

This is an library that allows you to print to a receipt printer using the system printer driver.

## What does this library do?

In order to print a receipt on a receipt printer you need to build the receipt and encode it as in the ESC/POS or StarPRNT language. You can use the [`ReceiptPrinterEncoder`](https://github.com/NielsLeenheer/ReceiptPrinterEncoder) library for this. You end up with an array of raw bytes that needs to be send to the printer. One way to do that is using the system printer driver.

## Installation

If you want to use this libary, first install the package using npm:

    npm install @point-of-sale/system-receipt-printer --save

In your project you can then import it, if you use ES6 modules:

```js
import SystemReceiptPrinter from '@point-of-sale/system-receipt-printer';

let receiptPrinter = new SystemReceiptPrinter();
```

Or require it, if you are using CommonJS:

```js
let SystemReceiptPrinter = require('@point-of-sale/system-receipt-printer');

let receiptPrinter = new SystemReceiptPrinter();
```

## Configuration

When you create the `SystemReceiptPrinter` object you can specify a number of options to help with the library with connecting to the device. 

### Printer settings

When a printer is connected to your system, it will get assigned a unique name. Provide that name when you instantiate the `SystemReceiptPrinter` object:

- `name`: The name of the printer.

For example, to print on the printer `Star_TSP143__STR_T_001_`:

```js
const receiptPrinter = new SystemReceiptPrinter({ 
    name:   'Star_TSP143__STR_T_001_'
});
```

## Connect to a receipt printer

The actually connect to the printer you need to call the `connect()` function. To find out when a receipt printer is connected you can listen for the `connected` event using the `addEventListener()` function.

```js
receiptPrinter.addEventListener('connected', device => {
    console.log(`Connected to printer`);
});
```

The callback of the `connected` event is passed an object with the following properties:

-   `type`<br>
    Type of the connection that is used, in this case it is always `system`.


## Commands

Once connected you can use the following command to print receipts.

### Printing receipts

When you want to print a receipt, you can call the `print()` function with an array, or a typed array with bytes. The data must be properly encoded for the printer. 

For example:

```js
/* Encode the receipt */

let encoder = new ReceiptPrinterEncoder({
    language:  'esc-pos',
    codepageMapping: 'epson'
});

let data = encoder
    .initialize()
    .text('The quick brown fox jumps over the lazy dog')
    .newline()
    .qrcode('https://nielsleenheer.com')
    .encode();

/* Print the receipt */

receiptPrinter.print(data);
```


### Disconnect from the printer 

When you are done with printing, you can call the `disconnect()` function. This will terminate the connection to the printer. If the connection to the printer is closed, the library will emit a `disconnected` event.

```js
receiptPrinter.addEventListener('disconnected', () => {
    console.log(`Disconnected from the printer`);
});

receiptPrinter.disconnect();
```

### Find all printers

The `SystemReceiptPrinter` object has a static function that you can call to get a list of all printers that are available on your system:

```js
let printers = SystemReceiptPrinter.getPrinters();

[
    {
        name: 'Star_TSP143__STR_T_001_',
        isDefault: false,
        options: { ... },
        status: 'IDLE'
    }, 

    {
        name: 'Star_TSP654__STR_T_001_',
        isDefault: false,
        options: { ... },
        status: 'IDLE'
    }
]
```

## License

MIT