/* 
    Title: RodriguezAlvarado-node-shopper-routes.js
    Date: 02/18/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for NodeShopper
    Sources:
        https://github.com/buwebdev/web-420/tree/master
*/
// Import the express framework
const express = require('express');

// Assign the router variable
const router = express.Router();

// Import the Customer model
const Customer = require('../models/RodriguezAlvarado-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *      tags:
 *        - customers
 *      name: createCustomer
 *      description: API for creating a new customer
 *      summary: Create a new customer
 *      requestBody:
 *        description: Customer's information
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - firstName
 *                - lastName
 *                - userName
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                userName:
 *                  type: string
 *      responses:
 *        '200':
 *          description: Customer added to MongoDB
 *        '500':
 *          description: Server Exception
 *        '501':
 *          description: MongoDB Exception
 */
router.post('/customers', async (req, res) => {
    try {
        // Create the new customer with the req.body data
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };
        // Add the new customer to the database
        Customer.create(newCustomer, (err, customer) => {
            // If the creation of the user fails, then display MongoDB Exception
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            // Else it was successfully created
            } else {
                res.status(200).send({
                    'message': 'Customer created successfully',
                    json: customer
                })
            }
        });
    } catch (err) {
        res.status(500).send({
            'message': `Server Exception: ${err}`
        })
    }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - customers
 *     name: createInvoiceByUserName
 *     description: API for creating an invoice by username
 *     summary: Create an invoice by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username creating the invoice
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Invoice information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *                subtotal:
 *                  type: string
 *                tax:
 *                  type: string
 *                dateCreated:
 *                  type: string
 *                dateShipped:
 *                  type: string
 *                lineItems:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       name: 
 *                          type: string
 *                       price:
 *                          type: number
 *                       quantity:
 *                          type: number
 *     responses:
 *       '200':
 *         description: Invoice added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async (req, res) => {
    try {
        // Find the customer with the username requested from the parameter data
        Customer.findOne({ userName: req.params.username}, (err, customer) => {
            // Create new invoice with the requested body data
            let newInvoice = {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped,
                lineItems: req.body.lineItems
            };
            // If the creation of the user fails, then display MongoDB Exception
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            // Else add the new invoice
            } else {
                // Push the new invoice to the invoices array
                customer.invoices.push(newInvoice);

                // Save the customer model results to MongoDB
                customer.save((err, updatedCustomer) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.status(200).send({
                            'message': 'Invoice added to customer successfully.',
                            json: updatedCustomer
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            'message': `Server Exception: ${err}`
        });
    }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - customers
 *     name: findAllInvoicesByUserName
 *     description: API for finding all invoices by username
 *     summary: Display all invoices by username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username creating the invoice
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of Invoices found
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/customers/:username/invoices', async (req, res) => {
  try {
    // Find the customer by their username requested in the parameters
    Customer.findOne({ userName: req.params.username }, (err, customer) => {
      // If there is a MongoDB Error send status 501
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': `MongoDB Exception: ${err}`
        });
      // Else return the customer's invoices
      } else {
        res.status(200).send({
            'message': `Array of ${customer.firstName} ${customer.lastName}'s invoices.`,
            json: customer.invoices
        })
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      'message': `Server Exception: ${err}`
    });
  }
});

// Export the router
module.exports = router;