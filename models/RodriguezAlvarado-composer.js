/* 
    Title: RodriguezAlvarado-composer.js
    Date: 02/03/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Composer Model
    Sources:
        https://github.com/Zadkiel26/pets-r-us
*/
//Import the mongoose Framework
const mongoose = require('mongoose');
//Create the variable Schema
const Schema = mongoose.Schema;
//Create the composerSchema
const composerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});
//Export the composer model
module.exports = mongoose.model('Composer', composerSchema);