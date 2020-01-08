const bcrypt = require('bcryptjs');
const pool = require('../database')

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.getUserById = async (id) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id])
  return rows[0]
}

helpers.getClienteById = async (id) => {
  const rows = await pool.query('SELECT * FROM clientes WHERE id = ?', [id])
  return rows[0]
}

module.exports = helpers;