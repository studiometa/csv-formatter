#! /usr/bin/env node
'use strict'

const csv = require('fast-csv');
let array = [];

const file = process.argv[2] ? process.argv[2] : `${__dirname}/annuaire_vignoble_31-05-2016.csv`;

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