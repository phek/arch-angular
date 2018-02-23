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
                    let message = this.translator.getResponse('general').UNKNOWN_ERROR;
                    switch (error) {
                        case errors.USERNAME_UNAVAILABLE:
                            message = this.translator.getResponse('general').USERNAME_UNAVAILABLE;
                            break;
                    }
                    this.showError(message);
                    console.log(error);
                } else if (token) {
                    console.log(token);
                    this.auth.setToken(token);
                    this.showSuccess(this.translator.getResponse('recruitment').SUCCESS);
                } else {
                    this.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                }

                $('.loading').fadeOut();
            },
            error => {
                if (error.status === 0 || error.status === 401) {
                    this.showError(this.translator.getResponse('general').CONNECTION_REFUSED);
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
        const div = $('.rec.error_message');
        this.hideAll();
        div.html(message);
        div.fadeIn();
    }

    /**
     * Shows a success message for the user.
     * @param message The message.
     */
    showSuccess(message) {
        const div = $('.rec.success_message');
        this.hideAll();
        div.html(message);
        div.fadeIn();
    }

    /**
     * Hides all message elements.
     */
    hideAll() {
        $('.rec.success_message').hide();
        $('.rec.error_message').hide();
    }
}
