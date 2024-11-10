const express = require('express');

const router = express.Router();

const Listing = require('../models/listing');

router.get('/', async(req, res) => {
  try{
    const populatedListings = await Listing.find({}).populate('owner');
  console.log('Populated Listings: ', populatedListings);
  res.render('listings/index.ejs', {listings: populatedListings});
  } catch(err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/new', async(req, res) => {
  res.render('listings/new.ejs');
});

router.post('/', async(req, res) => {
  req.body.owner = req.session.user._id;
  await Listing.create(req.body);
  res.redirect('/listings');
})

router.get('/:listingId', async(req, res) => {
  try{
    const populatedListings = await Listing.findById(req.params.listingId).populate('owner');
    res.render('listings/show.ejs', {listing: populatedListings})
  } catch(err){
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;