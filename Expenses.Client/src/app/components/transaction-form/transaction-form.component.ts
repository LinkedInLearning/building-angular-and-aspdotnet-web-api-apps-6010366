import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  editMode = false;
  transactionId?: number;
 
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);

    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.editMode = true;
      this.transactionId = +id;

      this.loadTransaction(this.transactionId);
    }
  }

  onTypeChange(){
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);
  }

  updateAvailableCategories(type: string){
    this.availableCategories = type === 'Expense' ? this.expenseCategories : this.incomeCategories;
    this.transactionForm.patchValue({category:''});
  }

  onSubmit(){
    if(this.transactionForm.valid){
      const transaction = this.transactionForm.value;

      if(this.editMode && this.transactionId){
        this.transactionService.update(this.transactionId, transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          }
        })
      } else {
        this.transactionService.create(transaction).subscribe({
          next: () => {
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.log('Error - ', error);
          }
        });
      }
    }
  }

  loadTransaction(id: number): void {
    this.transactionService.getById(id).subscribe({
      next: (transaction) => {

        this.updateAvailableCategories(transaction.type);

        this.transactionForm.patchValue({
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount
        })

      },
      error: (error) => {
        console.log('Error - ', error);
      }
    })
  }

  cancel() {
    this.router.navigate(['/transactions'])
  }
}
