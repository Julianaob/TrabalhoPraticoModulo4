// const MongoClient = require('mongodb').MongoClient;
// const uri =
//   'mongodb+srv://juliana:1234@cluster0-oupch.mongodb.net/<dbname>?retryWrites=true&w=majority';
// //'mongodb+srv:juliana:1234@cluster0-oupch.mongodb.net/grades';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect(async (err) => {
//   const collection = client.db('grades').collection('student');
//   const documents = await collection.find().toArray();
//   console.log(documents);
//   client.close();
// });

import mongoose from 'mongoose';
mongoose.connect(
  'mongodb+srv://juliana:1234@cluster0-oupch.mongodb.net/TrabalhoPratico?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const accountsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

mongoose.model('accounts', accountsSchema, 'accounts');
const accounts = mongoose.model('accounts');

// new accounts({
//   name: 'Juliana de Oliveira',
//   conta: 10000,
//   agencia: 1234,
//   balance: 25000000,
// })
//   .save()
//   .then(console.log('Salvo no MongoDB Atlas!'))
//   .catch((err) => {
//     console.log('Erro ao Salvar no MongoDB Atlas' + err);
//   });
