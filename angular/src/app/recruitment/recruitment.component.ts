import {Component} from '@angular/core';
import {TranslationService} from '../_translation/translation.service';
import {RecruitmentService} from './recruitment.service';

@Component({
    selector: 'app-recruitment',
    templateUrl: './recruitment.component.html',
    styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {

    translation = {};

    firstname: String;
    lastname: String;
    email: String;
    birth: String;
    username: String;
    password: String;

    constructor(private translator: TranslationService, private recruitService: RecruitmentService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
    }

    submitForm() {
        console.log('SUBMIT');
        this.recruitService.apply(this.firstname, this.lastname, this.email, this.birth,
            this.username, this.password).subscribe(response => {
                const token = response.token;
                const error = response.error;

                if (error) {
                    console.log(error)
                } else if (token) {
                    console.log('LOGGED IN');
                } else {
                    console.log('A server error occurred.');
                }
            },
            error => {
                console.log(error);
            },
            () => {
                // todo
            });
    }
}
