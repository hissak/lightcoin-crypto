
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return null
    }
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount
  }
  isAllowed() {
    return true
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }
  isAllowed() {
    if ((this.account.balance - this.amount) > 0) {
      return false
    } else { return true }
  }

}



class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
    console.log(this.transactions, 'TRANSACTIONS')
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log('Starting Balance of Account:', myAccount.balance);
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Final Balance:', myAccount.balance);
