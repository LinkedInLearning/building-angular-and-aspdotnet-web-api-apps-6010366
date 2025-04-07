import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

export const routes: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'signup',
        component: SignupComponent
    },
    {
        path:'transactions',
        component:TransactionListComponent
    },
    {
        path:'add',
        component: TransactionFormComponent
    },
    {
        path:'edit/:id',
        component: TransactionFormComponent
    },
    {
        path:'',
        redirectTo:'/transactions',
        pathMatch:'full'
    },
    {
        path:'**',
        redirectTo:'/transactions'
    }
];
