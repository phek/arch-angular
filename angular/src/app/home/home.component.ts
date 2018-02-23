import {Component, OnInit} from '@angular/core';
import {TranslationService} from '../_translation/translation.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

/**
 * Home component. Active on the home page.
 */
export class HomeComponent {

    translation = {};

    constructor(private translator: TranslationService) {
        this.translation = translator.getTranslation('home');
        this.translator.languageChanged.subscribe(
            () => {
                this.translation = translator.getTranslation('home');
            });
    }
}
