import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {errors} from '../../_config/responses';
import {TranslationService} from '../../_translation/translation.service';
import {RecruitmentService} from '../recruitment.service';
import {AuthService} from '../../_auth/auth.service';

@Component({
    selector: 'app-recruitment',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

/**
 * Recruitment component. Active on the recruitment page.
 */
export class RegisterComponent {

    translation = {};

    firstname: String;
    lastname: String;
    email: String;
    ssn: String;
    username: String;
    password: String;

    constructor(private router: Router, private translator: TranslationService, private recruitService: RecruitmentService, private auth: AuthService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
    }

    /**
     * Called when the user submits the recruitment form.
     */
    register() {
        this.recruitService.startLoading();
        this.recruitService.sendRegistration(this.firstname, this.lastname, this.email, this.ssn,
            this.username, this.password).subscribe(response => {
                if (response.json()) {
                    const token = response.json().token;
                    const isAdmin = response.json().isAdmin;
                    const error = response.json().error;

                    // Server responded with error
                    if (error) {
                        let message = this.translator.getResponse('general').UNKNOWN_ERROR;
                        switch (error) {
                            case errors.USERNAME_UNAVAILABLE:
                                message = this.translator.getResponse('general').USERNAME_UNAVAILABLE;
                                break;
                        }
                        this.recruitService.showError(message);
                        console.log(error);
                    }

                    // Server responded with a token
                    else if (token) {
                        const self = this;
                        console.log("Is admin: " + isAdmin);
                        console.log("Token: " + token);
                        this.auth.setToken(token, isAdmin);
                        this.recruitService.showSuccess(this.translator.getResponse('recruitment').SUCCESS);
                        setTimeout(function () {
                            self.router.navigateByUrl('/apply');
                        }, 1000);
                    }

                    // Server responded, but something went wrong. Check response codes.
                    else {
                        switch (response.status) {
                            case 500:
                                this.recruitService.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                                break;
                            default:
                                this.recruitService.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                        }
                    }
                }
                this.recruitService.stopLoading();
            },

            // The request failed. Check response codes.
            error => {
                console.log(error);
                switch (error.status) {
                    case 0:
                        this.recruitService.showError(this.translator.getResponse('general').CONNECTION_REFUSED);
                        break;
                    case 404:
                        this.recruitService.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                        break;
                    default:
                        this.recruitService.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                }
                this.recruitService.stopLoading();
            });
    }
}
