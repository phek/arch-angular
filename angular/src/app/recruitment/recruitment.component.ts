import {Component, OnInit} from '@angular/core';
import {TranslationService} from '../_translation/translation.service';

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

    constructor(private translator: TranslationService) {
        this.translation = translator.getTranslation('recruitment');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('recruitment');
            });
    }

    submitForm() {
        console.log("SUBMIT");
    }
}
