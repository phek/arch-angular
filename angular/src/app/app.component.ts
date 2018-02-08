import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {TranslationService} from './translation/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    translation = {};
    language: String;
    loggedIn: boolean;

    constructor(private translator: TranslationService, private auth: AuthService) {
        this.translation = translator.getTranslation('app');
        this.language = translator.getLanguage();
        this.loggedIn = auth.isAuthenticated();
        this.translator.languageChanged.subscribe(
            (language) => {
                this.translation = translator.getTranslation('app');
                this.language = language;
            });
    }

    login() {
        this.auth.login('test', 'test')
            .subscribe(token => {
                    if (token) {
                        this.loggedIn = true;
                        console.log('Logged in with token: ' + token);
                    } else {
                        // this.error = 'Username or password is incorrect';
                    }
                },
                error => {
                    console.log(error);
                },
                () => {
                    // todo
                }
            );
    }

    logout() {
        this.auth.logout();
        this.loggedIn = false;
    }

    setLanguage(language) {
        this.translator.setLanguage(language);
    }
}
