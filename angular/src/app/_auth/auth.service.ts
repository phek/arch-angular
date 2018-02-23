import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {SERVER, PORT} from '../_config/backend';

/**
 * Auth service. Handles local authorization.
 */
@Injectable()
export class AuthService {

    statusChanged: EventEmitter<String> = new EventEmitter();

    constructor(private http: Http) {
    }

    /**
     * Set token.
     * @param token The token.
     */
    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
            this.statusChanged.emit();
        }
    }

    /**
     * Sends a login request to the REST api.
     * @param username The username.
     * @param password The password.
     * @returns An {Observable} with a response.
     */
    login(username, password): Observable<any> {
        return this.http.post('http://' + SERVER + ':' + PORT + '/authentication', {
            username: username,
            password: password
        })
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                if (token) {
                    localStorage.setItem('token', token);
                    this.statusChanged.emit();
                }
                return response.json();
            });
    }

    /**
     * Logout the user.
     */
    logout() {
        localStorage.removeItem('token');
    }

    /**
     * @returns {boolean} Is the user authenticated?
     */
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

}
