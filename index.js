#! /usr/bin/env node
'use strict'

const csv = require('fast-csv');
let array = [];

const file = process.argv[2];

if (!file) {
	console.log('Oops, something went wrong...');
	return;
}

// Parse the original CSV file
csv
	.fromPath(file, {
		headers: true,
		delimiter: ';'
	})
	.on('data', (data) => {
		// Push each row to the array
		array.push(data);
	})
	.on('end', () => {

		// Write new file with correct
		// CSV formatting

		const options = {
			headers: true,
			delimiter: ';',
			quote: '"',
			quoteHeaders: true,
			quoteColumns: true
		};

		csv.writeToString(array, options, (err, data) => {
			if (err) throw err;
			console.log(data);
		})
	});