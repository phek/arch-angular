import {Component} from '@angular/core';
import {AuthService} from './_auth/auth.service';
import {TranslationService} from './_translation/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    translation = {};
    language: String;
    loggedIn: boolean;
    username: String;
    password: String;

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
        this.auth.login(this.username, this.password)
            .subscribe(response => {
                    if (response.error) {
                        console.log(response.error);
                    } else if (response.token) {
                        this.loggedIn = true;
                        console.log('Logged in with token: ' + response.token);
                    } else {
                        console.log('A server error occurred.');
                    }
                },
                error => {
                    console.log(error);
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
