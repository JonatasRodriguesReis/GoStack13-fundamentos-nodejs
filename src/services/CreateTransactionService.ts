import { uuid } from 'uuidv4';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const id = uuid();

    if (type !== 'income' && type !== 'outcome')
      throw Error('Type of transaction is not income neither outcome.');

    const transaction = {
      id,
      title,
      type,
      value,
    };

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw Error(
        'Outcome transaction could not be created. Value is greater than total balance',
      );

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
