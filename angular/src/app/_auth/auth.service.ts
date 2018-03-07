import {EventEmitter, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {SERVER, PORT} from '../_config/backend';
import {Router} from "@angular/router";

/**
 * Auth service. Handles local authorization.
 */
@Injectable()
export class AuthService {

    statusChanged: EventEmitter<String> = new EventEmitter();

    constructor(private http: Http, private router: Router) {
    }

    /**
     * Set token.
     * @param token The token.
     * @param role The role of the user.
     */
    setToken(token, isAdmin) {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isAdmin', isAdmin);
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
                if (response.json()) {
                    const token = response.json().token;
                    const isAdmin = response.json().isAdmin;
                    if (token) {
                        this.setToken(token, isAdmin);
                    }
                }
                return response.json();
            });
    }

    /**
     * Logout the user.
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
    }

    /**
     * @returns {boolean} Is the user authenticated?
     */
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    /**
     * @returns {boolean} Is the user admin?
     */
    isAdmin() {
        return localStorage.getItem('isAdmin') == "true";
    }

}
