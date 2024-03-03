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
    const { id } = req.params;
    Composer.findOne({_id: id }, (err, composer) => {
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

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *      - composers
 *     description: Update a composer in the database by their ID.
 *     summary: Update a composer by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the composer to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
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
 *       200:
 *         description: Array of composer documents
 *       401:
 *         description: Invalid composer ID
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.put('/composers/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    Composer.findOne({ _id: id }, (err, composer) => {
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        if(composer) {
          composer.set({ firstName, lastName });
          composer.save();
          res.status(200).send(composer);
        } else {
          res.status(401).send({
            'message': 'Invalid Composer ID'
          });
        }
      }
    });
  } catch (err) {
      console.log(err);
      res.status(500).send({
        'message': 'Server Exception'
      });
    }
});

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - composers
 *     description: API for deleting a composer by their ID.
 *     summary: Deletes a composer by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the composer to delete. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Composer document
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.delete('/composers/:id', async(req, res) => {
  try {
    const { id } = req.params;
    Composer.findByIdAndDelete(id, (err, composer) => {
      if(err) {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception'
        });
      } else {
        res.status(200).send(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      'message': 'Server Exception'
    });
  }
});

module.exports = router;