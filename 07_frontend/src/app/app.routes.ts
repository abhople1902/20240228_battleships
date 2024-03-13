import { Routes } from '@angular/router';
import { RegiterComponent } from './auth/regiter/regiter.component';
import { SigninComponent } from './auth/signin/signin.component';
import { GridComponent } from './maingame/grid/grid.component';
import { MainGamePageComponent } from './maingame/main-game-page/main-game-page.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ProfilemainComponent } from './profilemain/profilemain.component';
import { PlacerComponent } from './maingame/placer/placer.component';

export const routes: Routes = [
  // Routing part for the SigninComponent AND RegiterComponent
  { path: '', component: SigninComponent },
  { path: 'register', component: RegiterComponent },
  { path: 'gamestart', component: GridComponent },
  { path: 'game', component: MainGamePageComponent },
  { path: 'shipplacer', component: PlacerComponent },
  { path: 'profile', component: ProfilemainComponent },
  { path: '**', component: NotfoundpageComponent },
];
