const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Obtener todos los items
router.get('/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los items' });
    });
});

// Crear un nuevo item
router.post('/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  newItem.save()
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al crear el item' });
    });
});

module.exports = router;