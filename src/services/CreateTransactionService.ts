import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, title, type }: RequestDTO): Transaction {
    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    )
      throw Error('Sorry, but outcome is greater than your total value.');

    const transaction = this.transactionsRepository.create({
      value,
      title,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
