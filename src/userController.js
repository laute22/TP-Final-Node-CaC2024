const db = require('../config/db');

exports.createUser = (req, res) => {
  const { nombreUsuario, mail, contraseña } = req.body;
   // Verificar que los campos no sean undefined
   if (!nombreUsuario || !mail || !contraseña) {
    return res.status(400).send('Todos los campos son requeridos.');
  }
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
//Pliculas 2.0 
exports.createPelicula = (req, res) => {
  const { titulo, director, año, genero, fk_directores_id } = req.body;
  const query = 'INSERT INTO peliculas (titulo, director, año, genero, fk_directores_id) VALUES (?, ?, ?, ?, ?)';
  db.execute(query, [titulo, director, año, genero, fk_directores_id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id_pelicula: results.insertId, titulo, director, año, genero, fk_directores_id });
  });
};
// Obtener todas las películas
exports.getAllPeliculas = (req, res) => {
  const query = `
    SELECT peliculas.*, directores.nombre AS director_nombre, directores.apellido AS director_apellido 
    FROM peliculas 
    JOIN directores ON peliculas.fk_directores_id = directores.id
  `;
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};
// Obtener una película por ID
exports.getPeliculaById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT peliculas.*, directores.nombre AS director_nombre, directores.apellido AS director_apellido 
    FROM peliculas 
    JOIN directores ON peliculas.fk_directores_id = directores.id
    WHERE peliculas.id_pelicula = ?
  `;
  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Película no encontrada');
    }
    res.status(200).send(results[0]);
  });
};

// Actualizar una película por ID
exports.updatePelicula = (req, res) => {
  const { id } = req.params;
  const { titulo, director, año, genero, fk_directores_id } = req.body;
  const query = 'UPDATE peliculas SET titulo = ?, director = ?, año = ?, genero = ?, fk_directores_id = ? WHERE id_pelicula = ?';
  db.execute(query, [titulo, director, año, genero, fk_directores_id, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ id_pelicula: id, titulo, director, año, genero, fk_directores_id });
  });
};

// Eliminar una película por ID
exports.deletePelicula = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM peliculas WHERE id_pelicula = ?';
  db.execute(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).send();
  });
};
/*COMENTARIos*/
// Crear un nuevo comentario
exports.createComentario = (req, res) => {
  const { id_usuario, id_pelicula, comentarios } = req.body;

  // Verificar si el usuario y la película existen
  const checkUserQuery = 'SELECT * FROM usuario WHERE id_usuario = ?';
  const checkPeliculaQuery = 'SELECT * FROM peliculas WHERE id_pelicula = ?';

  db.execute(checkUserQuery, [id_usuario], (err, userResults) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (userResults.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    db.execute(checkPeliculaQuery, [id_pelicula], (err, peliculaResults) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (peliculaResults.length === 0) {
        return res.status(404).send('Película no encontrada');
      }

      const query = 'INSERT INTO usuario_pelicula (id_usuario, id_pelicula, comentarios) VALUES (?, ?, ?)';
      db.execute(query, [id_usuario, id_pelicula, comentarios], (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).send({ id: results.insertId, id_usuario, id_pelicula, comentarios });
      });
    });
  });
};

// Obtener todos los comentarios
exports.getComentarios = (req, res) => {
  const query = 'SELECT * FROM usuario_pelicula';
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

// Obtener un comentario por ID
exports.getComentarioById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuario_pelicula WHERE id = ?';
  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Comentario no encontrado');
    }
    res.status(200).send(results[0]);
  });
};

// Actualizar un comentario por ID
exports.updateComentario = (req, res) => {
  const { id } = req.params;
  const { id_usuario, id_pelicula, comentarios } = req.body;

  // Verificar si el usuario y la película existen
  const checkUserQuery = 'SELECT * FROM usuario WHERE id_usuario = ?';
  const checkPeliculaQuery = 'SELECT * FROM peliculas WHERE id_pelicula = ?';

  db.execute(checkUserQuery, [id_usuario], (err, userResults) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (userResults.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    db.execute(checkPeliculaQuery, [id_pelicula], (err, peliculaResults) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (peliculaResults.length === 0) {
        return res.status(404).send('Película no encontrada');
      }

      const query = 'UPDATE usuario_pelicula SET id_usuario = ?, id_pelicula = ?, comentarios = ? WHERE id = ?';
      db.execute(query, [id_usuario, id_pelicula, comentarios, id], (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send({ id, id_usuario, id_pelicula, comentarios });
      });
    });
  });
};

// Eliminar un comentario por ID
exports.deleteComentario = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuario_pelicula WHERE id = ?';
  db.execute(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).send();
  });
};

//Directores:
exports.createDirector = (req, res) => {
  const { nombre, apellido, nacionalidad } = req.body;
  const query = 'INSERT INTO directores (nombre, apellido, nacionalidad) VALUES (?, ?, ?)';
  db.execute(query, [nombre, apellido, nacionalidad], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({ id: results.insertId, nombre, apellido, nacionalidad });
  });
};

exports.getDirectores = (req, res) => {
  const query = 'SELECT * FROM directores';
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
};

exports.getDirectorById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM directores WHERE id = ?';
  db.execute(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('Director no encontrado');
    }
    res.status(200).send(results[0]);
  });
};

exports.updateDirector = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, nacionalidad } = req.body;
  const query = 'UPDATE directores SET nombre = ?, apellido = ?, nacionalidad = ? WHERE id = ?';
  db.execute(query, [nombre, apellido, nacionalidad, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ id, nombre, apellido, nacionalidad });
  });
};

exports.deleteDirector = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM directores WHERE id = ?';
  db.execute(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).send();
  });
};
