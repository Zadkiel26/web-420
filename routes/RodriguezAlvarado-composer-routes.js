/* 
    Title: RodriguezAlvarado-composer-routes.js
    Date: 02/03/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for the composer API
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420/tree/master
*/
//Import the Express Framework
const express = require('express');
//Assign a new router object for defining routes.
const router = express.Router();
//Import the composer model
const Composer = require('../models/RodriguezAlvarado-composer');

/** 
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - composers
 *     operationId: findAllComposers
 *     description: API to find all composers.
 *     summary: Returns an array of composers.
 *     responses:
 *       '200':
 *         description: Array of composer documents.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
router.get('/composers', async (req, res) => {
  try {
    Composer.find({}, (err, composers) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (err) {
    res.status(500).send({
      'message': 'Server Exception'
    });
  }
});
/** 
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - composers
 *     description: API for returning a single composer object from MongoDB
 *     summary: Retrieves a composer by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The composerId requested by the user. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Composer document in JSON format
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/
router.get('/composers/:id', async (req, res) => {
  try {
    Composer.findOne({_id: req.params.id}, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      'message': 'Server Exception'
    });
  }
});

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - composers
 *     description: API for adding new composers objects
 *     summary: Create a new composer.
 *     requestBody:
 *       description: Composer's information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       "200":
 *         description: User added
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/
router.post('/composers', async (req, res) => {
  try {
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    Composer.create(newComposer, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      'message': 'Server Exception'
    });
  }
});

module.exports = router;