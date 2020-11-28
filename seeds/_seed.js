
const fs = require('fs');

const Barangay = JSON.parse(fs.readFileSync(`${__dirname}/barangay.json`, 'utf-8'));
const City = JSON.parse(fs.readFileSync(`${__dirname}/city.json`, 'utf-8'));
const Municipality = JSON.parse(fs.readFileSync(`${__dirname}/municipality.json`, 'utf-8'));
const Province = JSON.parse(fs.readFileSync(`${__dirname}/province.json`, 'utf-8'));
const Region = JSON.parse(fs.readFileSync(`${__dirname}/region.json`, 'utf-8'));

console.log('NUM OF BARANGAYS: ', Barangay.barangay.length)
console.log('NUM OF CITIES: ', City.city.length)
console.log('NUM OF MUNICIPALITIES: ', Municipality.municipality.length)
console.log('NUM OF PROVINCES: ', Province.province.length)
console.log('NUM OF REGIONS: ', Region.region.length)