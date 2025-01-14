import { Routes } from '@angular/router';
import { LoginComponent } from '../components/user/login/login.component';
import {RegisterComponent} from '../components/user/register/register.component';
import {UserInfoComponent} from '../components/user/user-info/user-info.component';
import {
  CompetitionSelectorComponent
} from '../components/competitions/competition-selector/competition-selector.component';
import {MatchListComponent} from '../components/matches/match-list/match-list.component';
import {BetListComponent} from '../components/bet/bet-list/bet-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'me', component: UserInfoComponent },
  { path: 'competitions', component: CompetitionSelectorComponent },
  { path: 'matches/:competitionId', component: MatchListComponent },
  { path: '', redirectTo: '/competitions', pathMatch: 'full' },
  { path: 'bet', component: BetListComponent }

];
