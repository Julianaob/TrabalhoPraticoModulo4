import mongoose from 'mongoose';

const accountsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new error('Valor negativo não permitido!');
    },
  },
});

const accountsModel = mongoose.model('accounts', accountsSchema, 'accounts');

export { accountsModel };
