import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_auth/auth.guard';

import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './recruitment/register/register.component';
import {ApplyComponent} from './recruitment/apply/apply.component';
import {CompetenceComponent} from './recruitment/apply/competence/competence.component';
import {AvailableComponent} from './recruitment/apply/available/available.component';
import {ReviewComponent} from './recruitment/review/review.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'apply',
        component: ApplyComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'apply/available',
        component: AvailableComponent,
        canActivate: [
            AuthGuard
        ]
    },

    {
        path: 'apply/competence',
        component: CompetenceComponent,
        canActivate: [
            AuthGuard
        ]
    },
    {
        path: 'recruitment',
        component: ReviewComponent,
        canActivate: [
            AuthGuard
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
