import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CataloguesComponent } from './components/catalogues/catalogues.component';
import { membersComponent } from './components/members/members.component';
import { CirculationComponent } from './components/circulation/circulation/circulation.component';
import { AcquisitionComponent } from './components/circulation copy/acquisition/acquisition.component';
import { ReviewComponent } from './components/review/review/review.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate: [AuthGuard],
        children:[
           {
            path:'',
            component: CataloguesComponent
           },
           {
            path:'catalogues',
            component: CataloguesComponent
           },
           {
            path: 'members',
            component: membersComponent
           },
           {
            path:'circulations',
            component:CirculationComponent
           },
           {
            path:'acquisitions',
            component: AcquisitionComponent
           },
           {
            path: 'reviews',
            component:ReviewComponent
           }
        ]
    }
];
