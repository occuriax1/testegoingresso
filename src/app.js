const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const logRequest = require('./middleware/logging');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

//Configurações de CORS antes de qualquer outra rota ou middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }
  next();
});

app.use(logRequest);
app.use('/api/users', userRoutes);
app.use(express.static('public'));


sequelize.sync({ force: true }).then(async () => {
  console.log('Database & tables created!');
  const hashedPassword = await bcrypt.hash("fx5600msi", 10); // Hashing da senha 
  const adminUser = await User.findOrCreate({
    where: { email: "caio.zanelato.medeiros@gmail.com" },
    defaults: {
      name: "Caio",
      email: "caio.zanelato.medeiros@gmail.com",
      dateOfBirth: new Date(1993, 4, 1),
      password: hashedPassword
    }
  });
  console.log('Admin user checked/created');
});
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
