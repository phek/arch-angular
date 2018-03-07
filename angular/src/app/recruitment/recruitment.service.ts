import {Injectable} from '@angular/core';
import {PORT, SERVER} from '../_config/backend';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

declare const $;

/**
 * Recruitment service. Handles functionality on the recruitment page.
 */
@Injectable()
export class RecruitmentService {

    constructor(private http: Http) {
    }

    /**
     * Applies the form and sends the request to the REST Api.
     * @param firstname The firstname.
     * @param lastname The lastname.
     * @param email The email.
     * @param ssn The social security number.
     * @param username The username.
     * @param password The password.
     * @returns An {Observable} with a response.
     */
    sendRegistration(firstname, lastname, email, ssn, username, password): Observable<any> {
        const PAGE = 'registration';
        return this.http.post('http://' + SERVER + ':' + PORT + '/' + PAGE, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            ssn: ssn,
            username: username,
            password: password
        })
            .map((response: Response) => {
                return response;
            });
    }

    /**
     * Applies the form and sends the request to the REST Api.
     * @param availableFrom Start date of when the user is available.
     * @param availableTo End date of when the user is available.
     * @returns An {Observable} with a response.
     */
    sendAvailability(availableFrom, availableTo): Observable<any> {
        const PAGE = 'availability';
        return this.http.post('http://' + SERVER + ':' + PORT + '/' + PAGE, {
            fromDate: this.getUnixTime(availableFrom),
            toDate: this.getUnixTime(availableTo),
            token: localStorage.getItem('token')
        })
            .map((response: Response) => {
                return response;
            });
    }

    /**
     * Applies the form and sends the request to the REST Api.
     * @param competence The competence of the user.
     * @param yearsOfExperience The amount of years the user have with this experience.
     * @returns An {Observable} with a response.
     */
    sendExperience(competence, yearsOfExperience): Observable<any> {
        const PAGE = 'competence';
        return this.http.post('http://' + SERVER + ':' + PORT + '/' + PAGE, {
            competence: competence,
            yearsOfExperience: yearsOfExperience,
            token: localStorage.getItem('token')
        })
            .map((response: Response) => {
                return response;
            });
    }

    /**
     * Get all registrations.
     * @returns An {Observable} with a response.
     */
    getApplications(): Observable<any> {
        const PAGE = 'applications';
        return this.http.post('http://' + SERVER + ':' + PORT + '/' + PAGE, {
            token: localStorage.getItem('token')
        })
            .map((response: Response) => {
                return response;
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

    /**
     * Show loading bar.
     */
    startLoading() {
        $('.loading').fadeIn().css('display', 'inline-block');
    }

    /**
     * Hide loading bar.
     */
    stopLoading() {
        $('.loading').fadeOut();
    }

    private getUnixTime(date) {
        return new Date(date).getTime() / 1000;
    }
}
