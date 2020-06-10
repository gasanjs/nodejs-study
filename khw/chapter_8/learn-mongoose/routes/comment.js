var express = require('express');
var Comment = require('../schemas/comment');

var router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    console.log(comments);
    res.json(comments)
  } catch(err) {
    console.err(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const comment = Comment({
    commenter: req.body.id,
    comment: req.body.comment
  });

  try {
    const resultOfSave = await comment.save();
    console.log(resultOfSave);
    const result = await Comment.populate(resultOfSave, { path: 'commenter' });
    res.status(201).json(result);
  } catch(err) {
    console.err(err);
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = Comment.update({ _id: req.params.id }, { comment: req.body.comment });
    res.json(result);
  } catch (err) {
    console.err(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = Comment.remove({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.err(err);
    next(err);
  }
});

module.exports = router;