/* 
    Title: RodriguezAlvarado-composer-routes.js
    Date: 02/03/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for the composer App
    Sources:
        https://github.com/Zadkiel26/pets-r-us
*/
//Import the Express Framework
const express = require('express');
//Assign a new router object for defining routes.
const router = express.Router();
//Import the composer model
const Composer = require('../models/RodriguezAlvarado-composer');

//findAllComposers (GET Request)
/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   description: The list of composers
 *   get:
 *     summary: Returns a list of composers documents
 *     tags:
 *       - composers
 *     operationId: findAllComposers
 *     description: API for returning a list of composers from MongoDB Atlas
 *     responses:
 *       "200":
 *        description: Composer documents
 *      "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/
router.get("/composers", async (req, res) => {
  try {
    Composer.find({}, (err, composers) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composers);
        res.json(composers);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

//findComposerById (GET Request)
/** 
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 * description: The list of composers
 *   get:
 *     summary: Returns a composer document
 *     tags:
 *       - composers
 *     operationId: findComposerById
 *     description: API for returning a single composer object from MongoDB
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
router.get("/composers/:id", async (req, res) => {
  try {
    Composer.findOne({_id: req.params.id}, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

//createComposer (POST Request)
/**
 * createComposer
 * @openapi
 * /api/composers:
 * post:
 *     summary: Creates a new composer
 *     tags:
 *       - composers
 *     operationId: createComposer
 *     description: API for adding new composers objects
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
router.post("/composers", async (req, res) => {
  try {
    const newComposer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    await Composer.create(newComposer, (err, composer) => {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception"
        });
      } else {
        console.log(composer);
        res.json(composer);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Server Exception"
    });
  }
});

module.exports = router;