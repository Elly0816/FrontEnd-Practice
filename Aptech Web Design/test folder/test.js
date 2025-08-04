let loggedIn = false;
let usernameSet = 'Elly';
let usernameEntered;
let passwordSet = 1234;
let passwordEntered;

while(!loggedIn){
    usernameEntered = window.prompt("Enter your username");
    passwordEntered = window.prompt("Enter your password");
    if(usernameEntered === usernameSet && passwordEntered == passwordSet){
        loggedIn = true;
    }

}