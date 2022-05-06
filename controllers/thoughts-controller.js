const { Thoughts, User } = require('../models');

const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get one thoughts by id
    getThoughtsById({ params}, res) {
        Thoughts.findOne({ id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    // create Thoughts
    createThoughts({ body }, res) {
        Thoughts.create(body)
        .then(dbThoughtsData => {
            User.findOneAndUpdate(
                { username: dbThoughtsData.username },
                { $push: { thoughts: dbThoughtsData._id } },
                { new: true, runValidators: true }
            ). catch(err => res.status(400).json(err))
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(err));
    },

    // update thoughts by id
    updateThoughts({ params, body}, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thoughts
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    // add reaction to thoughts
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id!' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    // delete reaction from thoughts
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;
