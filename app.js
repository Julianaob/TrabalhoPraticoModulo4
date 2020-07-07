import express from 'express';
import mongoose from 'mongoose';
import { accountsRouter } from './routes/accountsRouter.js';

//conexão com o banco
mongoose
  .connect(
    'mongodb+srv://juliana:1234@cluster0-oupch.mongodb.net/TrabalhoPratico?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('Conectado ao MongoDB Atlas!'))
  .catch((err) => {
    console.log('Erro ao conectar no MongoDB Atlas' + err);
  });

const app = express();
app.use(express.json());
app.use(accountsRouter);

app.listen(3008, () => console.log('API Iniciada'));
