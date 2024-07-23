import printer from '@grandchef/node-printer';
import EventEmitter from './event-emitter.js';

class ReceiptPrinter {}

class SystemReceiptPrinter extends ReceiptPrinter {

	#emitter;
	
	#options = {};

	constructor(options) {
		super();

		this.#emitter = new EventEmitter();

        this.#options = {
			name:		options.name || '',
        }
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

export default SystemReceiptPrinter;