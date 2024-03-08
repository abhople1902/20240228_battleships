import { Routes } from '@angular/router';
import { SigninComponent } from './auth/input-login/signin/signin.component';
import { RegiterComponent } from './auth/input-register/regiter/regiter.component';

export const routes: Routes = [
// Routing part for the SigninComponent AND RegiterComponent
    {path: '', component: SigninComponent},
    {path: 'register', component: RegiterComponent}
];
