const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {Post, User} = require('../models');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {title: '내 정보 - NodeBird', user: req.user});
});

router.get('/modify', isLoggedIn, (req, res) => {
  res.render('modify', {title: '내 정보 수정- NodeBird', user: req.user});
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeBird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});

router.get('/', (req, res, next) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'nick'],
    },{
      model: User,
      attributes: ['id', 'nick'],
      as: 'LikeUsers'
    }
    ],

    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({where: await {title: query}});
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({include: [{model: User}]});
    }
    return res.render('main', {
      title: `${query} | NodeBird`,
      user: req.user,
      twits: posts
    })
  } catch (err) {
    console.error(err);
    return next(err);
  }
})

module.exports = router;
