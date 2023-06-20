const Item = require('/Item');
const express = require('express');
const router = express.Router();


// const express = require('express');
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Hola desde el servidor Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});


// Obtener todos los items
app.get('/items', (req, res) => {
  Item.find()
    .then((items) => {
   console.log(items);
      // res.json(items);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los items' + error});
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