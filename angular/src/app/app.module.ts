import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {AuthService} from './auth/auth.service';
import {TranslationService} from './translation/translation.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,
        TranslationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
