/* 
    Title: RodriguezAlvarado-person.js
    Date: 02/11/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Person Model
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420
*/
// Import the mongoose Framework
const mongoose = require('mongoose');
// Create the variable Schema
const Schema = mongoose.Schema;
// Create the roleSchema
const roleSchema = new Schema({
    text: String
});
// Create the dependentSchema
const dependentSchema = new Schema({
    firstName: String,
    lastName: String
});
// Create the personSchema
const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: String
});
// Export the person model
module.exports = mongoose.model('Person', personSchema);