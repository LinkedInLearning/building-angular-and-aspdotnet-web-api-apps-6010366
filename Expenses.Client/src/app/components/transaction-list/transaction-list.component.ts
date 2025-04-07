import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions():void{
    this.transactionService
    .getAll()
    .subscribe((data) => this.transactions = data);
  }

  getTotalIncome():number {
    return this.transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses():number {
    return this.transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  }

  getNetBalance():number{
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  editTransaction(transaction: Transaction){
    if(transaction.id){
      this.router.navigate(['/edit/', transaction.id])
    }
  }

}
