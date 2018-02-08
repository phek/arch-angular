import {Component, OnInit} from '@angular/core';
import {TranslationService} from '../translation/translation.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    translation = {};

    constructor(private translator: TranslationService) {
        this.translation = translator.getTranslation('home');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('home');
            });
    }

    ngOnInit() {
    }

}
