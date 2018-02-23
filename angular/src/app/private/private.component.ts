import {Component} from '@angular/core';
import {Person} from '../_models/Person';

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.css']
})

/**
 * Private component. Active on the private page.
 */
export class PrivateComponent {
    persons = [
        new Person('Lisa', 'Enblom', 'lisa@gmail.com', '1994-09-26', 'recruit'),
        new Person('Arne', 'Karlsson', 'arne@gmail.com', '1994-03-22', 'recruit'),
        new Person('Fredrik', 'Backman', 'fredrik@gmail.com', '1993-09-06', 'recruit')
    ];
}
