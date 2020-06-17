const express = require('express');

const {isLoggedIn} = require('./middlewares');
const {User, Follow} = require('../models');

const router = express.Router();


router.post('/:id/follow', isLoggedIn,
  async (req, res, next) => {
    try {
      const user = await User.findOne({where: {id: req.user.id}});
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.post('/:id/unfollow', isLoggedIn,
  async (req, res, next) => {
    try {
      const user = await User.findOne({where: {id: req.user.id}});
      const user2 = await User.findOne({where: {id: req.params.id}});
      await user.removeFollowing(user2);
      res.send('accept');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


router.post('/:id', isLoggedIn,
  async (req, res, next) => {
    const {email, nick, password} = req.body;

    try {
     await User.update({nick, email}, {where: {id: req.user.id}});

      res.redirect('/');
    } catch (err) {
      console.error(err);
      next(err);
    }
  });


module.exports = router;
