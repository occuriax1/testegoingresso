const sequelize = require('../config/database');
const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//API HUNTER.IO VERIFICAçÃO de EMAIL para o CADASTRO

const API_KEY = 'a1d198d5dcb2be026b942098d099e9052f41d84b';

async function verifyEmail(email) {
  try {
    const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${API_KEY}`);
    return response.data.data.result === "deliverable";
  } catch (error) {
    console.error('Erro ao verificar o e-mail:', error);
    return false;
  }
}

async function register(req, res) {
  const { name, email, dateOfBirth, password } = req.body;
  if (!await verifyEmail(email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      dateOfBirth,
      password: hashedPassword
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login successful' }); 
    } else {
      res.status(401).json({ error: 'Unauthorized' }); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}

async function listUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'User deleted' }); 
    } else {
      res.status(404).json({ error: 'User not found' }); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}
  
module.exports = {
  register,
  login,
  listUsers,
  deleteUser
};
