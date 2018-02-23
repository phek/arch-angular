import {Component} from '@angular/core';
import {errors} from '../_config/responses';
import {TranslationService} from '../_translation/translation.service';
import {RecruitmentService} from './recruitment.service';
import {AuthService} from '../_auth/auth.service';

declare const $;

@Component({
    selector: 'app-recruitment',
    templateUrl: './recruitment.component.html',
    styleUrls: ['./recruitment.component.css']
})

/**
 * Recruitment component. Active on the recruitment page.
 */
export class RecruitmentComponent {

    translation = {};

    firstname: String;
    lastname: String;
    email: String;
    ssn: String;
    username: String;
    password: String;

    constructor(private translator: TranslationService, private recruitService: RecruitmentService, private auth: AuthService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
    }

    /**
     * Called when the user submits the recruitment form.
     */
    submitForm() {
        $('.loading').fadeIn().css('display', 'inline-block');
        this.recruitService.applyForm(this.firstname, this.lastname, this.email, this.ssn,
            this.username, this.password).subscribe(response => {
                const token = response.token;
                const error = response.error;

                if (error) {
                    let message = this.translator.getResponse('recruitment').UNKNOWN_ERROR;
                    switch (error) {
                        case errors.USERNAME_UNAVAILABLE:
                            message = this.translator.getResponse('recruitment').USERNAME_UNAVAILABLE;
                            break;
                        case errors.INVALID_TOKEN:
                            message = this.translator.getResponse('recruitment').INVALID_TOKEN;
                            break;
                        case errors.INVALID_USER:
                            message = this.translator.getResponse('recruitment').INVALID_USER;
                            break;
                    }
                    this.showError(message);
                    console.log(error);
                } else if (token) {
                    console.log(token);
                    this.auth.setToken(token);
                    this.showSuccess(this.translator.getResponse('recruitment').SUCCESS);
                } else {
                    this.showError(this.translator.getResponse('recruitment').UNKNOWN_ERROR);
                }

                $('.loading').fadeOut();
            },
            error => {
                if (error.status === 0 || error.status === 401) {
                    this.showError(this.translator.getResponse('recruitment').CONNECTION_REFUSED);
                }
                console.log(error);
                $('.loading').fadeOut();
            });
    }

    /**
     * Shows an error message for the user.
     * @param message The error.
     */
    showError(message) {
        const div = $('.error_message');
        this.hideAll();
        div.html(message);
        div.fadeIn();
    }

    /**
     * Shows a success message for the user.
     * @param message The message.
     */
    showSuccess(message) {
        const div = $('.success_message');
        this.hideAll();
        div.html(message);
        div.fadeIn();
    }

    /**
     * Hides all message elements.
     */
    hideAll() {
        $('.success_message').hide();
        $('.error_message').hide();
    }
}
