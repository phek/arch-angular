/**
 * This class represents a person from the database.
 */
export class Person {
    firstname: string;
    lastname: string;
    email: string;
    birth: string;
    role: string;

    constructor(firstname, lastname, email, birth, role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birth = birth;
        this.role = role;
    }
}
