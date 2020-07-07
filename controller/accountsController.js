import express from 'express';
import { accountsModel } from '../models/accountsModel.js';
const app = express();

const depositAccount = async (req, res) => {
  try {
    const account = await accountsModel.findOneAndUpdate(
      {
        agencia: req.params.agencia,
        conta: req.params.conta,
      },
      { $inc: { balance: req.body.balance } },
      { new: true }
    );
    if (!account) {
      res.status(400).send('Essa conta não foi encontrada na coleção.' + error);
    }
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
};

const withdrawalAccount = async (req, res) => {
  try {
    const validateAccount = await accountsModel.find({
      conta: req.params.conta,
    });
    if (!validateAccount) {
      res.status(404).send('Essa conta não foi encontrada na coleção.');
    } else {
      const valuebalance = validateAccount.map((data) => {
        return data.balance;
      });
      const sumValue = await valuebalance.reduce((acumulator, current) => {
        current + req.body.balance;
      });

      if (sumValue < 0) {
        res.status(400).send(`Salvo Insuficiente para saque.`);
      } else {
        const account = await accountsModel.findOneAndUpdate(
          {
            agencia: req.params.agencia,
            conta: req.params.conta,
          },
          { $inc: { balance: req.body.balance - 1 } },
          { new: true }
        );
        res.send(account);
      }
    }
  } catch (error) {
    res.status(400).send(`Erro no update. ${error}`);
  }
};

const searchAccount = async (req, res) => {
  try {
    const account = await accountsModel.findOne({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });
    if (!account) {
      res.status(404).send('Essa conta não foi encontrada na coleção.');
    } else {
      res.send(account);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeAccount = async (req, res) => {
  try {
    const account = await accountsModel.findOneAndDelete(
      {
        agencia: req.params.agencia,
        conta: req.params.conta,
      },
      req.body
    );

    if (!account) {
      res.status(400).send('Conta não encontrada para deleção.');
    } else {
      const agencias = await accountsModel.count({
        agencia: parseInt(req.params.agencia),
      });
      console.log(agencias);
      res.send(
        `Excluido com sucesso. Agora temos ${agencias} contas para essa agencia`
      );
    }
  } catch (error) {
    res.status(500).send(`Erro no Catch ${error}`);
  }
};

const transferAccount = async (req, res) => {
  try {
    let valorComTaxa = req.body.balance;

    const returnContaOrigem = await contaOrigem(req);
    const returnContaDestino = await contaDestino(req);

    if (returnContaOrigem !== returnContaDestino) {
      valorComTaxa = req.body.balance + 8;
    }
    const accountContaOrigem = await accountsModel.findOneAndUpdate(
      {
        conta: req.params.contaorigem,
      },
      { $inc: { balance: -valorComTaxa } },
      { new: true }
    );
    const accountContaDestino = await accountsModel.findOneAndUpdate(
      {
        conta: req.params.contadestino,
      },
      { $inc: { balance: req.body.balance } },
      { new: true }
    );
    res.send(accountContaOrigem);
  } catch (error) {
    res.status(500).send(`Erro no Catch ${error}`);
  }
};

async function contaOrigem(req) {
  const account = await accountsModel.find({
    conta: req.params.contaorigem,
  });
  const t = account.map((agencia) => {
    return agencia.agencia;
  });
  return parseInt(t);
}
async function contaDestino(req) {
  const account = await accountsModel.find({
    conta: req.params.contadestino,
  });
  const t = account.map((agencia) => {
    return agencia.agencia;
  });
  return parseInt(t);
}

const averageAccount = async (req, res) => {
  try {
    const account = await accountsModel.aggregate([
      { $match: { agencia: parseInt(req.params.agencia) } },
      { $group: { _id: null, totalAverage: { $avg: '$balance' } } },
    ]);
    if (!account) {
      res.status(404).send('Nenhum dado encontrado na coleção.');
    } else {
      res.send(account);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const lessValueAccount = async (req, res) => {
  try {
    const account = await accountsModel
      .find({})
      .sort({ balance: 1 })
      .limit(parseInt(req.params.quantidade));
    res.send(account);
  } catch (error) {
    res.status(500).send(`Erro no Catch ${error}`);
  }
};

const biggestValueAccount = async (req, res) => {
  try {
    const account = await accountsModel
      .aggregate([{ $sort: { balance: -1, name: 1 } }])
      .limit(parseInt(req.params.quantidade));
    res.send(account);
  } catch (error) {
    res.status(500).send(`Erro no Catch ${error}`);
  }
};

const returnAgency99Account = async (req, res) => {
  try {
    var NovaAgenciaConta = await transferAccountAgencyPrivate();
    var retornoAgencia99 = await accountsModel.find({
      agencia: req.params.agencia,
    });
    res.send(retornoAgencia99);
  } catch (error) {
    res.status(500).send(`Erro no Catch ${error}`);
  }
};

const transferAccountAgencyPrivate = async () => {
  let accounts = null;
  try {
    accounts = await accountsModel.findOne({ agencia: 99 });

    if (!accounts) {
      const agencys = await accountsModel.aggregate([
        {
          $group: { _id: '$agencia' },
        },
      ]);

      for (let agency of agencys) {
        console.log('entrou for', agency._id);
        let account = await accountsModel
          .findOne({ agencia: agency._id })
          .sort({ balance: -1 });
        account.agencia = 99;
        account.save();
      }
    }
  } catch (error) {
    return error;
  }
  return accounts;
};
export default {
  depositAccount,
  withdrawalAccount,
  transferAccount,
  searchAccount,
  removeAccount,
  averageAccount,
  returnAgency99Account,
  biggestValueAccount,
  lessValueAccount,
};
