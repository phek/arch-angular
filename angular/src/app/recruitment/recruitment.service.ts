import {Injectable} from '@angular/core';
import {PORT, SERVER} from '../_config/backend';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

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
    applyForm(firstname, lastname, email, ssn, username, password): Observable<any> {
        return this.http.post('http://' + SERVER + ':' + PORT + '/registration', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            ssn: ssn,
            username: username,
            password: password
        })
            .map((response: Response) => {
                return response.json();
            });
    }
}
