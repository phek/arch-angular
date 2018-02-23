import {EventEmitter, Injectable} from '@angular/core';
import GENERAL_RESPONSE_EN from './_response/_general/en';
import GENERAL_RESPONSE_SV from './_response/_general/sv';
import APP_TRANSLATION_EN from './app/en';
import APP_TRANSLATION_SV from './app/sv';
import APP_RESPONSE_EN from './_response/app/en';
import APP_RESPONSE_SV from './_response/app/sv';
import HOME_TRANSLATION_EN from './home/en';
import HOME_TRANSLATION_SV from './home/sv';
import RECRUITMENT_TRANSLATION_EN from './recruitment/en';
import RECRUITMENT_TRANSLATION_SV from './recruitment/sv';
import RECRUITMENT_RESPONSE_EN from './_response/recruitment/en';
import RECRUITMENT_RESPONSE_SV from './_response/recruitment/sv';

const DEFAULT_LANGUAGE = 'en';

/**
 * Translation service. Handles translation on the website.
 */
@Injectable()
export class TranslationService {

    language = DEFAULT_LANGUAGE;

    pages = {
        general: {
            response: {
                en: GENERAL_RESPONSE_EN,
                sv: GENERAL_RESPONSE_SV
            }
        },
        app: {
            en: APP_TRANSLATION_EN,
            sv: APP_TRANSLATION_SV,
            response: {
                en: APP_RESPONSE_EN,
                sv: APP_RESPONSE_SV
            }
        },
        home: {
            en: HOME_TRANSLATION_EN,
            sv: HOME_TRANSLATION_SV
        },
        recruitment: {
            en: RECRUITMENT_TRANSLATION_EN,
            sv: RECRUITMENT_TRANSLATION_SV,
            response: {
                en: RECRUITMENT_RESPONSE_EN,
                sv: RECRUITMENT_RESPONSE_SV
            }
        }
    };

    languageChanged: EventEmitter<String> = new EventEmitter();

    /**
     * Gets the translation of the page.
     * @param page The page to get translation for.
     * @returns An object containing the translations for the page.
     */
    getTranslation(page) {
        if (this.pages[page][this.language]) {
            return this.pages[page][this.language];
        } else {
            return this.pages[page][DEFAULT_LANGUAGE];
        }
    }

    /**
     * Gets the errors of the page.
     * @param page The pag eto get translation for.
     * @returns An object containing the translated errors for the page.
     */
    getResponse(page) {
        const response = this.pages[page] && this.pages[page].response;
        if (response[this.language]) {
            return response[this.language];
        } else {
            return response[DEFAULT_LANGUAGE];
        }
    }

    /**
     * Sets the current language.
     * @param language The language.
     */
    setLanguage(language) {
        this.language = language;
        this.languageChanged.emit(language);
    }

    /**
     * Gets the current language.
     * @returns The language.
     */
    getLanguage() {
        return this.language;
    }

}
