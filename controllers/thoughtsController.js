const { Thought, User } = require('../models');

module.exports = {
    // GET all Thoughts
    getAllThoughts(req, res){
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err))
    },
    // GET single Thought by Id
    getThought(req ,res){
        Thought.findOne( { _id: req.params.thoughtId })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that Id was found'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // Create new thought
    newThought(req, res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                {new: true}
            );
        })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that Id found'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //  Update a Though by Id
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }, 
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
            ? res.status(404).json( { message: 'No thought with this Id was found'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a Thought by Id
    deleteThought(req, res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with that Id was found'})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId} }, 
                { new: true }
            )
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No thought with that Id was found'})
            : res.status(200).json( { message: 'Thought was deleted'})
        )
        .catch((err) => res.status(500).json(err));
    },
    // Adds a Reaction to reaction array of respective Thought by Id
    addThoughtReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that Id was found'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    // Removes a Reaction from reaction array of respective Thought by Id
    removeThoughtReaction(req ,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this Id was found'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
    

}