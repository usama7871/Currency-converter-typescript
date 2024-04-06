"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
// Define a class for the currency converter
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
        // Initialize exchange rates manually
        this.exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 109.61,
            AUD: 1.29,
            CAD: 1.25,
            CHF: 0.92,
            CNY: 6.44,
        };
    }
    // Function to perform currency conversion
    CurrencyConverter.prototype.convertCurrency = function (amount, fromCurrency, toCurrency) {
        // Retrieve exchange rates for the given currencies
        var baseRate = this.exchangeRates[fromCurrency.toUpperCase()];
        var targetRate = this.exchangeRates[toCurrency.toUpperCase()];
        // Check if both currencies are supported
        if (!baseRate || !targetRate) {
            throw new Error('Invalid currency code.');
        }
        // Perform the currency conversion
        var convertedAmount = (amount / baseRate) * targetRate;
        return convertedAmount;
    };
    // Method to retrieve supported currencies
    CurrencyConverter.prototype.getSupportedCurrencies = function () {
        return Object.keys(this.exchangeRates);
    };
    return CurrencyConverter;
}());
// Create an instance of the CurrencyConverter class
var converter = new CurrencyConverter();
// Supported currency codes
var supportedCurrencies = converter.getSupportedCurrencies();
// Prompt user for amount
var amount = parseFloat(readlineSync.question('Enter amount: '));
// Prompt user for source currency
console.log('Supported currencies:', supportedCurrencies.join(', '));
var fromCurrency = readlineSync.question('Enter source currency: ').toUpperCase();
// Prompt user for target currency
console.log('Supported currencies:', supportedCurrencies.join(', '));
var toCurrency = readlineSync.question('Enter target currency: ').toUpperCase();
// Perform currency conversion
try {
    var convertedAmount = converter.convertCurrency(amount, fromCurrency, toCurrency);
    console.log("Converted ".concat(amount, " ").concat(fromCurrency, " to ").concat(convertedAmount.toFixed(2), " ").concat(toCurrency));
}
catch (error) {
    console.error('Currency conversion failed:', error.message);
}
