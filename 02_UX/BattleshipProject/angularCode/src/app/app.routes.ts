import { Routes } from '@angular/router';
import { SigninComponent } from './auth/input-login/signin/signin.component';
import { RegiterComponent } from './auth/input-register/regiter/regiter.component';
import { GridComponent } from './maingame/grid/grid.component';
import { PlacerComponent } from './maingame/placer/placer.component';
import { NotfoundpageComponent } from './notfound/notfoundpage/notfoundpage.component';
import { ProfilemainComponent } from './profilepage/profilemain/profilemain.component';
import { MainGamePageComponent } from './main-game-page/main-game-page.component';

export const routes: Routes = [
// Routing part for the SigninComponent AND RegiterComponent
    {path: '', component: SigninComponent},
    {path: 'register', component: RegiterComponent},
    {path: 'gamestart', component: GridComponent},
    {path: 'game', component: MainGamePageComponent},
    {path: 'shipplacer', component: PlacerComponent},
    {path: 'profile', component: ProfilemainComponent},
    {path: '**', component: NotfoundpageComponent }
];
