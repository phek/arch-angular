import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import {SERVER, PORT} from '../_config/backend';

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    login(username, password): Observable<String> {
        return this.http.post('http://' + SERVER + ':' + PORT + '/authenticate', {
            username: username,
            password: password
        })
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                if (token) {
                    localStorage.setItem('token', token);
                    return token;
                } else {
                    return null;
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

}
