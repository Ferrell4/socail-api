const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    newThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(newThought);

router.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought);


router.route('/:thoughtId/reactions').post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);


module.exports = router;