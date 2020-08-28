import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (previous, transaction) => {
        const balanceObj = previous;

        if (transaction.type === 'income')
          balanceObj.income += transaction.value;
        else balanceObj.outcome += transaction.value;

        balanceObj.total = balanceObj.income - balanceObj.outcome;

        return balanceObj;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ id, title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = {
      id,
      title,
      type,
      value,
    };
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
