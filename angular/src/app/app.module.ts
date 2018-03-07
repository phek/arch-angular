import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {AuthService} from './_auth/auth.service';
import {TranslationService} from './_translation/translation.service';
import {RecruitmentService} from './recruitment/recruitment.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './recruitment/register/register.component';
import {ReviewComponent} from './recruitment/review/review.component';
import {ApplyComponent} from './recruitment/apply/apply.component';
import {AvailableComponent} from './recruitment/apply/available/available.component';
import {CompetenceComponent} from './recruitment/apply/competence/competence.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        ReviewComponent,
        ApplyComponent,
        AvailableComponent,
        CompetenceComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,
        TranslationService,
        RecruitmentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
