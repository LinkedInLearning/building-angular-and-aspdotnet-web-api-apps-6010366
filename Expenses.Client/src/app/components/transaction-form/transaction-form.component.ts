import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  transactionForm: FormGroup;
  incomeCategories = [
    'Salary',
    'Freelance',
    'Investment'
  ];
  expenseCategories = [
    'Food',
    'Transportation',
    'Entertainment'
  ]

  availableCategories: string[] = [];
 
  constructor(private fb: FormBuilder, private router: Router, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    this.updateAvailableCategories();
  }

  onTypeChange(){
    this.updateAvailableCategories();
  }

  updateAvailableCategories(){
    const type = this.transactionForm.get('type')?.value;
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({category:''});
  }

  onSubmit(){
    if(this.transactionForm.valid){
      const transaction = this.transactionForm.value;

      console.log(transaction);
      this.transactionService.create(transaction).subscribe((data) => {
        this.router.navigate(['/transactions']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/transactions'])
  }
}
