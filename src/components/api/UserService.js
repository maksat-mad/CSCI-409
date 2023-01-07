export default class UserService {
    static async getAllEmails() {
        let emails = [];
        await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(response => {
                response.forEach(el => {
                    emails.push(el.email);
                });
            });
        return emails;
    }
}