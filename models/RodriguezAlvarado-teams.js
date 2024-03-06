/* 
    Title: RodriguezAlvarado-teams.js
    Date: 03/06/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Teams Model
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420
*/
// Import mongoose framework
const mongoose = require('mongoose');

// Create Schema variable
const Schema = mongoose.Schema;

// Create player schema
const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    salary: Number
});

// Create team schema
const teamSchema = new Schema({
    name: String,
    mascot: String,
    players: [playerSchema]
});

// Export the team model
module.exports = mongoose.model('Teams', teamSchema);