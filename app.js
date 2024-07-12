import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes'; 
import path from 'path';

const app = express();
const port = process.env.PORT || 3000; 

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.listen(port, () => {
  console.log(`Server running on port 3000`); 
});