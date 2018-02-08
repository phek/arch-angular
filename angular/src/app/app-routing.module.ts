import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_auth/auth.guard';

import {HomeComponent} from './home/home.component';
import {RecruitmentComponent} from './recruitment/recruitment.component';
import {PrivateComponent} from './private/private.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'recruitment',
        component: RecruitmentComponent
    },
    {
        path: 'private',
        component: PrivateComponent,
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
