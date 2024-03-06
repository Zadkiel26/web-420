/* 
    Title: RodriguezAlvarado-teams-routes.js
    Date: 03/06/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Routes for the team API
    Sources:
        https://github.com/Zadkiel26/pets-r-us
        https://github.com/buwebdev/web-420/tree/master
*/
// Import the express framework
const express = require('express');

// Create and assign the router variable
const router = express.Router();

// Import the teams model
const Teams = require('../models/RodriguezAlvarado-teams');

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - teams
 *     description: API for adding new teams
 *     summary: Create a new team.
 *     requestBody:
 *       description: Team's information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Team added
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/
router.post('/teams', async (req, res) => {
    try {
        const newTeam = {
            name: req.body.name,
            mascot: req.body.mascot
        };
        Teams.create(newTeam, (err, team) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                res.status(200).send({
                    'message': "Team created successfully",
                    json: team
                });
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
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - teams
 *     operationId: findAllTeams
 *     description: API to find all teams.
 *     summary: Returns an array of teams.
 *     responses:
 *       '200':
 *         description: Array of teams documents.
 *       '500':
 *         description: Server expectations.
 *       '501': 
 *         description: MongoDB expectations.
 */
router.get('/teams', async(req, res) => {
    try {
        Teams.find({}, (err, teams) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                res.status(200).send({
                    'message': 'Array of teams documents',
                    json: teams
                });
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - teams
 *     description: API for assigning a player to a team
 *     summary: Assign a player a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the Team
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player's information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                salary:
 *                  type: number
 *     responses:
 *       '200':
 *         description: Player Document
 *       '401':
 *         description: Invalid TeamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams/:id/players', async (req, res) => {
    try {
        const { id } = req.params;
        const newPlayer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        };

        Teams.findOne({ _id: id }, (err, team) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                if(team) {
                    team.players.push(newPlayer);
                    team.save();
                    res.status(200).send({
                        'message': 'Player added to team successfully',
                        json: team
                    });
                } else {
                    res.status(401).send({
                        'message': 'Invalid teamId'
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
 * findAllPlayerByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - teams
 *     description: API for returning all players in the team
 *     summary: Retrieves all players by teamId.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The teamId requested by the user. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Array of documents
 *       "401":
 *         description: Invalid teamId
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
*/
router.get('/teams/:id/players', async (req, res) => {
    try {
        const { id } = req.params;

        Teams.findOne({ _id: id }, (err, team) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                if(team) {
                    res.status(200).send({
                        'message': `Array of players in team: ${team.name}`,
                        json: team.players
                    });
                } else {
                    res.status(401).send({
                        'message': 'Invalid teamID'
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - teams
 *     description: API for deleting a team by ID.
 *     summary: Deletes a team by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the team to delete. 
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Team document
 *       "401":
 *         description: Invalid teamId
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.delete('/teams/:id', async (req, res) => {
    try {
        const { id } = req.params;

        Teams.findByIdAndDelete(id, (err, team) => {
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': 'MongoDB Exception'
                });
            } else {
                if(team) {
                    res.status(200).send({
                        'message': `${team.name} was deleted successfully`,
                        json: team
                    });
                } else {
                    res.status(401).send({
                        'message': 'Invalid teamID'
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

// Export router
module.exports = router;