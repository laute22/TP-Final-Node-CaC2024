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


/*Peliculas*/

// Obtener todas las películas
exports.getAllPeliculas = async (req, res) => {

  const query = 'SELECT * FROM Peliculas';

  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });

};

// Obtener una película por ID
exports.getPeliculaById = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Peliculas WHERE id_pelicula = ?';
  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Movie not found');
    }
    res.status(200).send(results[0]);
  });

};

// Crear una nueva película
exports.createPelicula = async (req, res) => {
  const { titulo, director, año, genero } = req.body;
  const query='INSERT INTO Peliculas (titulo, director, año, genero) VALUES (?, ?, ?, ?)';
  db.execute(query, [titulo, director, año, genero ], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, titulo, director, año, genero});
  });
};

// Actualizar una película por ID
exports.updatePelicula = async (req, res) => {
  const { id } = req.params;
  const { titulo, director, año, genero } = req.body;
  const query = 'UPDATE Peliculas SET titulo = ?, director = ?, año = ?, genero = ? WHERE id_pelicula = ?';
  db.execute(query, [titulo, director, año, genero , id], (err) => {
    if (err) {
      
      res.status(404).json({ message: 'Película no encontrada o sin cambios.' });
      return res.status(500).send(err);
    }
    res.json({ message: 'Película actualizada exitosamente.' });
    res.status(200).send({ id, titulo, director, año, genero });
  });
};

 

// Eliminar una película por ID
exports.deletePelicula = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Peliculas WHERE id_pelicula = ?'
  db.execute(query, [id], (err) => {
    if (err) {
      res.status(500).json({ message: 'Hubo un error al eliminar la película.' });
      return res.status(500).send(err);
      
    }
    res.json({ message: 'Película eliminada exitosamente.' });
    res.status(204).send();
  });

  /*try {
    const [result, fields] = await db.execute('DELETE FROM Peliculas WHERE id_pelicula = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Película no encontrada.' });
    } else {
      res.json({ message: 'Película eliminada exitosamente.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hubo un error al eliminar la película.' });
  }*/
};
