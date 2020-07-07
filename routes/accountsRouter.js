import express from 'express';
const app = express();
import controller from '../controller/accountsController.js';

//número 4 do Trabalho
app.put('/accounts/:agencia/:conta', controller.depositAccount);

//Número 5 do trabalho
app.put('/accounts/:agencia/:conta', controller.withdrawalAccount);

//Número 6 do Trabalho
app.get('/accounts/:agencia/:conta', controller.searchAccount);

//Número 7 do Trabalho
app.delete('/accounts/:agencia/:conta', controller.removeAccount);

//Número 8 do Trabalho
app.patch('/accounts/:contaorigem/:contadestino', controller.transferAccount);

//número 9 do Trabalho
app.get('/accounts/:agencia', controller.averageAccount);

//Número 10 do Trabalho
app.get('/accounts/:quantidade', controller.lessValueAccount);

//Número 11 do Trabalho
app.get('/accounts/:quantidade', controller.biggestValueAccount);

//Número 12 do Trabalho
app.get('/accounts/:agencia', controller.returnAgency99Account);

export { app as accountsRouter };
