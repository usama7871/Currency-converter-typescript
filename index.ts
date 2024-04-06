import * as readlineSync from 'readline-sync';

// Define a class for the currency converter
class CurrencyConverter {
    private exchangeRates: { [currency: string]: number };

    constructor() {
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
    public convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
        // Retrieve exchange rates for the given currencies
        const baseRate = this.exchangeRates[fromCurrency.toUpperCase()];
        const targetRate = this.exchangeRates[toCurrency.toUpperCase()];

        // Check if both currencies are supported
        if (!baseRate || !targetRate) {
            throw new Error('Invalid currency code.');
        }

        // Perform the currency conversion
        const convertedAmount = (amount / baseRate) * targetRate;
        return convertedAmount;
    }

    // Method to retrieve supported currencies
    public getSupportedCurrencies(): string[] {
        return Object.keys(this.exchangeRates);
    }
}

// Create an instance of the CurrencyConverter class
const converter = new CurrencyConverter();

// Supported currency codes
const supportedCurrencies = converter.getSupportedCurrencies();

// Prompt user for amount
const amount = parseFloat(readlineSync.question('Enter amount: '));

// Prompt user for source currency
console.log('Supported currencies:', supportedCurrencies.join(', '));
const fromCurrency = readlineSync.question('Enter source currency: ').toUpperCase();

// Prompt user for target currency
console.log('Supported currencies:', supportedCurrencies.join(', '));
const toCurrency = readlineSync.question('Enter target currency: ').toUpperCase();

// Perform currency conversion
try {
    const convertedAmount = converter.convertCurrency(amount, fromCurrency, toCurrency);
    console.log(`Converted ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`);
} catch (error: any) {
    console.error('Currency conversion failed:', error.message);
}
