/* 
    Title: RodriguezAlvarado-person-routes.js
    Date: 02/11/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for the person API
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420/tree/master
*/
// Import the Express Framework
const express = require('express');
// Assign a new router object for defining routes
const router = express.Router();
// Import the person model
const Person = require('../models/RodriguezAlvarado-person');

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *        - persons
 *     operationId: findAllPersons
 *     description: API to find all persons.
 *     summary: Returns an array of persons.
 *     responses:
 *       '200':
 *         description: Array of person documents.
 *       '500':
 *         description: Server expectations.
 *       '501':
 *         description: MongoDB expectations.
 */
router.get('/persons', async (req, res) => {
    try {
        Person.find({}, (err, persons) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                console.log(persons);
                res.json(persons)
            }
        });
    } catch(err) {
        res.status(500).send({
            'message': 'Server Exception'
        });
    }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - persons
 *     description: API for adding a new person object
 *     summary: Create a new person
 *     requestBody:
 *       description: Person's information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                roles:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       text:
 *                         type: string
 *                dependents:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                birthDate:
 *                  type: string
 *     responses:
 *       '200':
 *         description: Person added.
 *       '500':
 *         description: Server expectations.
 *       '501':
 *         description: MongoDB expectations.
 */
router.post('/persons', async (req, res) => {
    try {
      const newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roles: req.body.roles,
        dependents: req.body.dependents,
        birthDate: req.body.birthDate
      };
      Person.create(newPerson, (err, person) => {
        if(err) {
            console.log(err);
            res.status(501).send({
                'message': 'MongoDB Exception'
            });
        } else {
            console.log(person);
            res.json(person);
        }
      })  
    } catch (err) {
        res.status(500).send({
            'message': 'Server Exception'
        });
    }
});

// Export the router
module.exports = router;