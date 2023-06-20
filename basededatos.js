const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const Item = require('.../Item');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    //leer datos de la base de datos y presentarlo en la consola/
    Item.find()
    .then((items) => {
      console.log(items);
    })
    .catch((error) => {
      console.log({ error: 'Error al obtener los items' });
    });

  })
  
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });