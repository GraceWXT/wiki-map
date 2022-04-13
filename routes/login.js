const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
  // or using plain-text cookies
  res.cookie('user_id', req.params.id);
  // send the user somewhere
  res.redirect('/maps');
});

module.exports = router;
