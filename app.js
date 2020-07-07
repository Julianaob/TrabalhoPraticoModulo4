import express from 'express';
import mongoose from 'mongoose';
import { accountsRouter } from './routes/accountsRouter.js';
require('dotenv').config();

//conexão com o banco
mongoose
  .connect(
    `mongodb+srv:// {
      $process.env.UserDB }
      ':' 
      {$process.env.DB_PASS }
      @cluster0-oupch.mongodb.net/TrabalhoPratico?retryWrites=true&w=majority`,
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
Console.log(process.env.UserDB);
app.listen(process.env.PORT, () => console.log('API Iniciada'));
