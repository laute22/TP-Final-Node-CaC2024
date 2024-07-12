import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';

// Simula DB
let users = []

const app = express();
const port = puerto = process.env.PORT || 3000;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'codo a codo',
    resave: false,
    saveUninitialized: false
}))

function verificarAutenticacion(req, res, next) {
    if (req.session.autenticado) {
        next();
    } else {
        res.status(401).send('No estas autenticado, por favor logueate');
    }
}

app.post('/login', async (req, res) => {
   
    const { username, password } = req.body;

    const usuario = users.find(user => user.username === username);
    // SELECT * FROM users WHERE username = 'santi 
    console.log("usuario", usuario)
    /*
        usuario {
            username: 'santi',
            password: #hash
        }
    */
    
    
    if (!usuario) {
         return res.status(401).send('Usuario no encontrado');
    }  

    // Chequea el PASSWORD ingresado con el PASSWORD del usuario de la base de datos
    const match = await bcrypt.compare(password, usuario.password);
    if (match) {
         req.session.autenticado = true;
        res.send('Estas logueado correctamente');
    } else {
       res.status(401).send('Login fallido');
    }


})

app.get('/admin',verificarAutenticacion,(req, res) => {
   
    res.send('Bienvenido al panel de administración');
   
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout exitoso');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashedPassword", hashedPassword);
    users.push({ username, password: hashedPassword });
    console.log("users ", users);
    res.send('Usuario registrado correctamente');
})


app.listen(port, () => {
    console.log('Server is running on port 3000');
});