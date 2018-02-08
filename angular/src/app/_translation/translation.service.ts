import {EventEmitter, Injectable} from '@angular/core';
import APP_TRANSLATION_EN from './app/en';
import APP_TRANSLATION_SV from './app/sv';
import HOME_TRANSLATION_EN from './home/en';
import HOME_TRANSLATION_SV from './home/sv';
import RECRUITMENT_TRANSLATION_EN from './recruitment/en';
import RECRUITMENT_TRANSLATION_SV from './recruitment/sv';

const DEFAULT_LANGUAGE = 'en';

@Injectable()
export class TranslationService {

    language = DEFAULT_LANGUAGE;

    pages = {
        app: {
            en: APP_TRANSLATION_EN,
            sv: APP_TRANSLATION_SV
        },
        home: {
            en: HOME_TRANSLATION_EN,
            sv: HOME_TRANSLATION_SV
        },
        recruitment: {
            en: RECRUITMENT_TRANSLATION_EN,
            sv: RECRUITMENT_TRANSLATION_SV
        }
    };

    languageChanged: EventEmitter<String> = new EventEmitter();

    getTranslation(page) {
        if (this.pages[page][this.language]) {
            return this.pages[page][this.language];
        } else {
            return this.pages[page][DEFAULT_LANGUAGE];
        }
    }

    setLanguage(language) {
        this.language = language;
        this.languageChanged.emit(language);
    }

    getLanguage() {
        return this.language;
    }

}
