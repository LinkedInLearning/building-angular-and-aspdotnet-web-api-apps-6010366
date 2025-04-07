import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://localhost:7145/api/Transactions';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl+"/All");
  }

  getById(id: number): Observable<Transaction>{
    return this.http.get<Transaction>(this.apiUrl+"/Details/"+id);
  }

  create(transaction: Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl+"/Create", transaction);
  }

  update(id: number, transaction: Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.apiUrl+"/Update/"+id, transaction);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/Delete/"+id);
  }
}
