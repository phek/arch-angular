import {Component} from '@angular/core';
import {AuthService} from './_auth/auth.service';
import {TranslationService} from './_translation/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

/**
 * Main component. Active on every page.
 */
export class AppComponent {

    translation = {};
    language: String;
    loggedIn: boolean;
    username: String;
    password: String;

    /**
     * Initiate variables and services.
     * @param {TranslationService} translator
     * @param {AuthService} auth
     */
    constructor(private translator: TranslationService, private auth: AuthService) {
        this.translation = translator.getTranslation('app');
        this.language = translator.getLanguage();
        this.loggedIn = auth.isAuthenticated();
        this.translator.languageChanged.subscribe(
            (language) => {
                this.translation = translator.getTranslation('app');
                this.language = language;
            });
        this.auth.statusChanged.subscribe(
            () => {
                this.loggedIn = auth.isAuthenticated();
            });
    }

    /**
     * Authenticates to the REST Api and logs in if the request was successful.
     */
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

    /**
     * Logout the user.
     */
    logout() {
        this.auth.logout();
        this.loggedIn = false;
    }

    /**
     * Sets the current language.
     * @param language The language.
     */
    setLanguage(language) {
        this.translator.setLanguage(language);
    }
}
