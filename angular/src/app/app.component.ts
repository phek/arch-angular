import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedIn: boolean;

    constructor(private auth: AuthService) {
        this.loggedIn = auth.isAuthenticated();
    }

    login() {
        this.auth.login('test', 'test')
            .subscribe(token => {
                    if (token) {
                        this.loggedIn = true;
                        console.log('Logged in with token: ' + token);
                    } else {
                        // this.error = 'Username or password is incorrect';
                    }
                },
                error => {
                    console.log(error);
                },
                () => {
                    // todo
                }
            );
    }

    logout() {
        this.auth.logout();
        this.loggedIn = false;
    }
}
