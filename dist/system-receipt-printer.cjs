'use strict';

var printer = require('@grandchef/node-printer');

class EventEmitter {
    constructor(device) {
        this._events = {};
    }

    on(e, f) {
        this._events[e] = this._events[e] || [];
        this._events[e].push(f);
    }

    emit(e, ...args) {
        let fs = this._events[e];
        if (fs) {
            fs.forEach(f => {
                setTimeout(() => f(...args), 0);
            });
        }
    }        
}

class ReceiptPrinterDriver {}

class SystemReceiptPrinter extends ReceiptPrinterDriver {

	#emitter;
	
	#options = {};

	constructor(options) {
		super();

		this.#emitter = new EventEmitter();

        this.#options = {
			name:		options.name || '',
        };
	}

	async connect() {
		this.#emitter.emit('connected', {
			type: 'system'
		});
	}

	async listen() {
		return false;
	}

	async disconnect() {
		this.#emitter.emit('disconnected');
	}
	
	print(command) {
		return new Promise((resolve, reject) => {
			printer.printDirect({
				data: command, 
				printer: this.#options.name, 
				type: 'RAW', 
				
				success: (job) => {
					resolve(job);
				}, 

				error: (error) => {
					reject(error);
				}
			});
		});
	}

	addEventListener(n, f) {
		this.#emitter.on(n, f);
	}

	static getPrinters() {
		return printer.getPrinters();
	}
}

module.exports = SystemReceiptPrinter;
