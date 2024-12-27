import { Routes } from '@angular/router';
import { LoginComponent } from '../components/user/login/login.component';
import {RegisterComponent} from '../components/user/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
];
