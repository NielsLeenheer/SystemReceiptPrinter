import resolve from '@rollup/plugin-node-resolve';

export default [
    {
		input: 'src/main.js',
		external: ['@grandchef/node-printer', '@mapbox/node-pre-gyp'],
		output: [
			{ file: 'dist/system-receipt-printer.cjs', format: 'cjs' },
			{ file: 'dist/system-receipt-printer.mjs', format: 'es' }
		],
		plugins: [
			resolve()
		]
	}
];
