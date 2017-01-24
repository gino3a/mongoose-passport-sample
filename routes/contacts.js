var express = require('express');
var router = express.Router();
var moment = require('moment');
var Contact = require('../models/contacts');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Contact.find( function(err, contacts, count) {
    res.render('list', {contacts: contacts});
  })
});

router.post('/', function(req, res) {
    new Contact({
      name: req.body.fullname,
      job: req.body.job,
      nickname: req.body.nickname,
      email: req.body.email
    }).save(function(err, contact, count) {
      if(err) {
        res.status(400).send('Error saving new contact: ' + err);
      } else {
        res.send("New contact created");
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {contact: {}});
});

router.route('/:contact_id')
  .all(function(req, res, next) {
    contact_id = req.params.contact_id;
    contact = {};
    Contact.findById(contact_id, function(err, c) {
      contact = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {contact: contact, moment: moment});
  })

  .post(function(req, res) {
    contact.notes.push({
      note: req.body.notes
    });

    contact.save(function(err, contact, count) {
      if(err) {
        res.status(400).send('Error adding note: ' + err);
      } else {
        res.send('Note added!');
      }
    });
  })

  .put(function(req, res) {
    contact.name = req.body.fullname;
    contact.job = req.body.job;
    contact.nickname = req.body.nickname;
    contact.email = req.body.email;

    contact.save(function(err, contact, count) {
      if(err) {
        res.status(400).send('Error saving contact: ' + err);
      } else {
        res.send('Contact saved');
      }
    });
  })

  .delete(function(req, res) {
    contact.remove(function(err, contact) {
      if(err) {
        res.status(400).send("Error removing contact: " + err);
      } else {
        res.send('Contact removed');
      }
    });
  });

module.exports = router;
