import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { RegiterComponent } from './pages/register/regiter.component';
import { GridComponent } from './pages/grid/grid.component';
import { PlacerComponent } from './pages/placer/placer.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { ProfilemainComponent } from './pages/profilemain/profilemain.component';
import { RulespageComponent } from './pages/rulespage/rulespage.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'register', component: RegiterComponent },
    { path: 'gamestart', component: GridComponent },
    { path: 'shipplacer', component: PlacerComponent },
    { path: 'profile', component: ProfilemainComponent },
    { path: 'rules', component: RulespageComponent },
    { path: '**', component: NotfoundpageComponent }
];
