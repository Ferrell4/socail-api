const router = require('express').Router();

const {
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')

router.route('/').get(getAllUsers).post(newUser);

router.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router