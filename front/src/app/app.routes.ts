import { Routes } from '@angular/router';
import { LoginComponent } from '../components/user/login/login.component';
import {RegisterComponent} from '../components/user/register/register.component';
import {UserInfoComponent} from '../components/user/user-info/user-info.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'me', component: UserInfoComponent }
];
