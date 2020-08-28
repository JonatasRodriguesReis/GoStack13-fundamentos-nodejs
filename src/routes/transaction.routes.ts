import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response
      .status(200)
      .json({ transactions: allTransactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createService = new CreateTransactionService(transactionsRepository);
    const transaction = createService.execute({ title, value, type });

    return response.status(200).json(transaction);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default transactionRouter;
