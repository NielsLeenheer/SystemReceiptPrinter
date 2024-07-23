import SystemReceiptPrinter from "../src/main.js";
import ThermalPrinterEncoder from "../../ThermalPrinterEncoder/dist/thermal-printer-encoder.mjs";


const printer = new SystemReceiptPrinter({
    name: 'Star_TSP143__STR_T_001__2',
});

const encoder = new ThermalPrinterEncoder({
    language: 'star-prnt',
});

printer.addEventListener('connected', async () => {
    console.log('Connected to printer');

    encoder
        .newline()
        .newline()
        .newline()
        .line('|- 32 -------------------------|')
        .line('|- 35 ----------------------------|')
        .line('|- 42 -----------------------------------|')
        .line('|- 48 -----------------------------------------|')
        .newline()
        .newline()
        .line('Fonts:')
        .size('normal').text('Font A: abcedfghijklmnopqrstuvwxyz1234567890').size('normal').newline()
        .size('small').text('Font B: abcedfghijklmnopqrstuvwxyz1234567890').size('normal').newline()
        .newline()
        .line('Width:')
        .width(1).text('1: abcdefghijkl').width(1).newline()
        .width(2).text('2: abcdefghijkl').width(1).newline()
        .width(3).text('3: abcdefghijkl').width(1).newline()
        .width(4).text('4: abcdefghijkl').width(1).newline()
        .newline()
        .line('Height:')
        .height(1).text('1: abcdefghijkl').height(1).newline()
        .height(2).text('2: abcdefghijkl').height(1).newline()
        .height(3).text('3: abcdefghijkl').height(1).newline()
        .height(4).text('4: abcdefghijkl').height(1).newline()
        .newline()
        .line('Width + Height:')
        .width(1).height(1).text('1: abcdefghijkl').height(1).width(1).newline()
        .width(2).height(2).text('2: abcdefghijkl').height(1).width(1).newline()
        .width(3).height(3).text('3: abcdefghijkl').height(1).width(1).newline()
        .width(4).height(4).text('4: abcdefghijkl').height(1).width(1).newline()
        .newline()
        .newline();

    encoder
        .line('EAN13:')
        .barcode('123456789012', 'ean13', 60)
        .newline()

    encoder
        .line('EAN8:')
        .barcode('12345678', 'ean8', 60)
        .newline()   

    encoder
        .line('UPC:')
        .barcode('12345678901', 'upca', 60)
        .newline()        

    encoder
        .line('Code 39:')
        .barcode('1234ABCDEF$', 'code39', 60)
        .newline()      

    if (encoder.language === 'escpos') {
        encoder
            .line('Codabar:')
            .barcode('1234ABCDEF$', 'codabar', 60)
            .newline()        
    }

    encoder
        .line('Code 93:')
        .barcode('1234ABCDEF', 'code93', 60)
        .newline()       

    encoder
        .line('Code 128:')
        .barcode('12345678', 'code128', 60)
        .newline()            

    encoder
        .line('ITF:')
        .barcode('12345678', 'itf', 60)
        .newline()            

    encoder
        .line('QR code:')
        .qrcode('https://nielsleenheer.com')
        .newline()
        .newline()

    encoder
        .line('Cutter:')
        .line('how many lines we need to feed before cutting')
        .line('8 -------------------------')
        .line('7 -------------------------')
        .line('6 -------------------------')
        .line('5 -------------------------')
        .line('4 -------------------------')
        .line('3 -------------------------')
        .line('2 -------------------------')
        .line('1 -------------------------')
        .cut()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .newline()
        .cut()

    await printer.print(encoder.encode());
    await printer.disconnect();
});

printer.addEventListener('disconnected', () => {
    console.log('Disconnected from printer');
});

printer.connect();
