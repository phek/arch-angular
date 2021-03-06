import {Component} from '@angular/core';
import {AuthService} from './_auth/auth.service';
import {TranslationService} from './_translation/translation.service';
import {errors} from './_config/responses';
import {Router} from "@angular/router";

declare const $;

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
    isAdmin: boolean;
    username: String;
    password: String;

    /**
     * Initiate variables and services.
     * @param {TranslationService} translator
     * @param {AuthService} auth
     */
    constructor(private translator: TranslationService, private auth: AuthService, private router: Router) {
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
                    const token = response.token;
                    const error = response.error;

                    // Server responded with error
                    if (error) {
                        let message = this.translator.getResponse('general').UNKNOWN_ERROR;
                        switch (error) {
                            case errors.USERNAME_UNAVAILABLE:
                                message = this.translator.getResponse('general').USERNAME_UNAVAILABLE;
                                break;
                            case errors.INVALID_USER:
                                message = this.translator.getResponse('general').INVALID_USER;
                                break;
                        }
                        this.showError(message);
                        console.log(error);
                    }

                    // Server responded with a token
                    else if (token) {
                        this.loggedIn = true;
                        this.isAdmin = this.auth.isAdmin();
                        this.showSuccess(this.translator.getResponse('app').SUCCESS);
                        console.log('Logged in with token: ' + token);
                        this.router.navigate(['/apply']);
                    }

                    // Server responded, but something went wrong. Check response codes.
                    else {
                        this.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                        console.log('A server error occurred.');
                    }
                },
                error => {
                    console.log(error);
                    switch (error.status) {
                        case 0:
                            this.showError(this.translator.getResponse('general').CONNECTION_REFUSED);
                            break;
                        case 404:
                            this.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                            break;
                        default:
                            this.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                    }
                }
            );
    }

    /**
     * Logout the user.
     */
    logout() {
        this.auth.logout();
        this.loggedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/']);
    }

    /**
     * Sets the current language.
     * @param language The language.
     */
    setLanguage(language) {
        this.translator.setLanguage(language);
        $('.success_message, .error_message').fadeOut();
    }


    /**
     * Shows an error message for the user.
     * @param message The error.
     */
    showError(message) {
        const div = $('.log.error_message');
        this.hideAll();
        div.html(message);
        div.fadeIn();
    }

    /**
     * Shows a success message for the user.
     * @param message The message.
     */
    showSuccess(message) {
        this.hideAll();
        // const div = $('.log.success_message');
        // div.html(message);
        // div.fadeIn();
        $('#hideModal').click();
    }

    /**
     * Hides all message elements.
     */
    hideAll() {
        $('.log.success_message').hide();
        $('.log.error_message').hide();
    }
}
