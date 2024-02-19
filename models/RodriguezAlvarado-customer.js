/* 
    Title: RodriguezAlvarado-customer.js
    Date: 02/18/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Customer Model
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420
*/
// Import the mongoose framework
const mongoose = require('mongoose');

// Create the Schema variable
const Schema = mongoose.Schema;

// Create the lineItemSchema
const lineItemSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number
});

// Create the invoice Schema
const invoiceSchema = new Schema({
    subtotal: Number,
    tax: Number,
    dateCreated: String,
    dateShipped: String,
    lineItems: [lineItemSchema]
});

// Create the customerSchema
const costumerSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    invoices: [invoiceSchema]
});

// Export the customer model
module.exports = mongoose.model('Customer', costumerSchema);