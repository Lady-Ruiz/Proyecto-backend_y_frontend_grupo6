const express = require('express');
const router = express.Router();
const mongoose = require ("mongoose");


// const express = require('express');
const app = express();
const PORT = 3000;

const itemRoutes = require ("./routes/item");
app.use(express.json());
app.use("/api", itemRoutes);

app.get('/app', (req, res) => {
  res.send('Hola desde el servidor Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});


module.exports = router;