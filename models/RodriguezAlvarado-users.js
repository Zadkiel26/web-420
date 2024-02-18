/* 
    Title: RodriguezAlvarado-users.js
    Date: 02/17/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Users Model
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420
*/
// Import the mongoose Framework
const mongoose = require('mongoose');
// Create the Schema variable
const Schema = mongoose.Schema;
// Create the user's Schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: [String]
});
// Export the user's model
module.exports = mongoose.model('User', userSchema);