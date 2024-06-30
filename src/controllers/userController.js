const db = require('../config/db');

exports.createUser = (req, res) => {
  const { nombreUsuario, mail, contraseña } = req.body;
  const query = 'INSERT INTO usuario (nombreUsuario, mail, contraseña) VALUES (?, ?, ?)';
  db.execute(query, [nombreUsuario, mail, contraseña], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, nombreUsuario, mail, contraseña });
  });
};
exports.createMultipleUsers = (req, res) => {
    const users = req.body; // Array de usuarios
    const query = 'INSERT INTO usuario (nombreUsuario, mail, contraseña) VALUES ?';
    
    const values = users.map(user => [user.nombreUsuario, user.mail, user.contraseña]);
  
    db.query(query, [values], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send(results);
    });
  };
  
exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM usuario';
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(results[0]);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, mail, contraseña } = req.body;
  const query = 'UPDATE usuario SET nombreUsuario = ?, mail = ?, contraseña = ? WHERE id_usuario = ?';
  db.execute(query, [nombreUsuario, mail, contraseña, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ id, nombreUsuario, mail, contraseña });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuario WHERE id_usuario = ?';
  db.execute(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).send();
  });
};