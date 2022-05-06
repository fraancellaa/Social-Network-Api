const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
.route('/')
.get(getAllThought)
.post(createThought);

// /api/thought/:id
router
.route('/:id')
.get(getThoughtById)
.post(updateThought)
.delete(deleteThought);

// /api/thought/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router;