import {Component} from '@angular/core';
import {errors} from "../../../_config/responses";
import {RecruitmentService} from "../../recruitment.service";
import {TranslationService} from "../../../_translation/translation.service";

@Component({
    selector: 'app-competence',
    templateUrl: './competence.component.html',
    styleUrls: ['./competence.component.css']
})
export class CompetenceComponent {

    translation = {};

    competence: String;
    yearsOfExperience: String;

    constructor(private translator: TranslationService, private recruitService: RecruitmentService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
    }

    /**
     * Called when the user submits the recruitment form.
     */
    addExperience() {
        this.recruitService.startLoading();
        this.recruitService.sendExperience(this.competence, this.yearsOfExperience).subscribe(response => {
                if (response) {
                    const success = response.json().success;
                    const error = response.json().error;

                    // Server responded with error
                    if (error) {
                        let message = this.translator.getResponse('general').UNKNOWN_ERROR;
                        switch (error) {
                            case errors.INVALID_TOKEN:
                                message = this.translator.getResponse('general').INVALID_TOKEN;
                                break;
                            case errors.INVALID_DATA:
                                message = this.translator.getResponse('general').INVALID_DATA;
                                break;
                        }
                        this.recruitService.showError(message);
                        console.log(error);
                    }

                    // Server responded with a token
                    else if (success) {
                        this.recruitService.showSuccess(this.translator.getResponse('recruitment').SUCCESS);
                    }

                    // Server responded, but something went wrong. Check response codes.
                    else {
                        console.log(response);
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
