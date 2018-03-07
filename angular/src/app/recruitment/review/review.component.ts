import {Component} from '@angular/core';
import {RecruitmentService} from '../recruitment.service';
import {TranslationService} from "../../_translation/translation.service";

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})

/**
 * Review component. Active on the private page.
 */
export class ReviewComponent {

    translation = {};

    applications = [];

    constructor(private translator: TranslationService, private recruitService: RecruitmentService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
        recruitService.getApplications().subscribe(
            (response) => {
                if (response && response.status === 200 && response.json()) {
                    this.applications = response.json();
                } else {
                    this.recruitService.showError(this.translator.getResponse('general').UNKNOWN_ERROR);
                }
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
            });
    }

    getDateFromUnix(unix) {
        let date = new Date(unix * 1000)
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
}
