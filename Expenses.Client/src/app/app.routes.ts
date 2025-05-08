import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
 
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
