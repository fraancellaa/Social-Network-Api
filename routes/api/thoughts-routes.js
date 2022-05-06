const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
.route('/')
.get(getAllThoughts)
.post(createThoughts);

// /api/thoughts/:id
router
.route('/:id')
.get(getThoughtsById)
.post(updateThoughts)
.delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;