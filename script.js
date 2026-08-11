```javascript
// ======================================================
// SOCIAL TOXIC LOGIN SYSTEM
// ======================================================

const ACCOUNTS_KEY = "socialToxicAccounts";
const CURRENT_USER_KEY = "socialToxicCurrentUser";

// ======================================================
// STORAGE
// ======================================================

function getAccounts() {

    const data =
        localStorage.getItem(ACCOUNTS_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {

    localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify(accounts)
    );
}

function getCurrentUser() {

    const data =
        localStorage.getItem(CURRENT_USER_KEY);

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

// ======================================================
// PAGE PROTECTION
// ======================================================

function checkPage() {

    const user = getCurrentUser();

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    // LOGIN PAGE
    if (page === "auth.html") {

        if (user) {

            window.location.replace(
                "index.html"
            );

        }

        return;
    }

    // REAL WEBSITE
    if (!user) {

        window.location.replace(
            "auth.html"
        );

        return;
    }
}

checkPage();


// ======================================================
// SWITCH LOGIN / SIGNUP
// ======================================================

function showLogin() {

    const login =
        document.getElementById(
            "loginPanel"
        );

    const signup =
        document.getElementById(
            "signupPanel"
        );

    if (login) {
        login.classList.add("active");
    }

    if (signup) {
        signup.classList.remove("active");
    }

    clearMessages();
}


function showSignup() {

    const login =
        document.getElementById(
            "loginPanel"
        );

    const signup =
        document.getElementById(
            "signupPanel"
        );

    if (login) {
        login.classList.remove("active");
    }

    if (signup) {
        signup.classList.add("active");
    }

    clearMessages();
}


function clearMessages() {

    const loginMessage =
        document.getElementById(
            "loginMessage"
        );

    const signupMessage =
        document.getElementById(
            "signupMessage"
        );

    if (loginMessage) {
        loginMessage.textContent = "";
    }

    if (signupMessage) {
        signupMessage.textContent = "";
    }
}


// ======================================================
// AVATAR
// ======================================================

document
    .querySelectorAll(".avatar-choice")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(
                        ".avatar-choice"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });

                this.classList.add(
                    "selected"
                );

            }
        );

    });


// ======================================================
// SIGN UP
// ======================================================

const signupForm =
    document.getElementById(
        "signupForm"
    );

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const username =
                document
                    .getElementById(
                        "signupUsername"
                    )
                    .value
                    .trim();

            const email =
                document
                    .getElementById(
                        "signupEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById(
                        "signupPassword"
                    )
                    .value;

            const message =
                document.getElementById(
                    "signupMessage"
                );

            const accounts =
                getAccounts();


            // CHECK USERNAME
            if (
                !/^[a-zA-Z0-9_]{3,20}$/
                    .test(username)
            ) {

                message.textContent =
                    "Username must be 3-20 characters.";

                message.className =
                    "auth-message error";

                return;
            }


            // CHECK PASSWORD
            if (password.length < 6) {

                message.textContent =
                    "Password must be at least 6 characters.";

                message.className =
                    "auth-message error";

                return;
            }


            // CHECK EMAIL
            if (
                accounts.some(
                    account =>
                        account.email === email
                )
            ) {

                message.textContent =
                    "This email is already registered.";

                message.className =
                    "auth-message error";

                return;
            }


            // CHECK USERNAME
            if (
                accounts.some(
                    account =>
                        account.username
                            .toLowerCase() ===
                        username.toLowerCase()
                )
            ) {

                message.textContent =
                    "This username is already taken.";

                message.className =
                    "auth-message error";

                return;
            }


            // AVATAR
            const selected =
                document.querySelector(
                    ".avatar-choice.selected"
                );

            const avatar =
                selected
                    ? selected.dataset.avatar
                    : "ST";


            // CREATE USER
            const user = {

                id: Date.now(),

                username: username,

                name: username,

                email: email,

                password: password,

                avatar: avatar,

                bio:
                    "Welcome to Social Toxic.",

                followers: 0,

                following: 0,

                posts: 0
            };


            // SAVE ACCOUNT
            accounts.push(user);

            saveAccounts(accounts);


            // IMPORTANT:
            // DO NOT LOGIN AUTOMATICALLY.
            // USER MUST LOGIN AFTER SIGNUP.

            message.textContent =
                "Account created! Please login.";

            message.className =
                "auth-message success";


            // CLEAR SIGNUP FORM
            signupForm.reset();


            // GO TO LOGIN
            setTimeout(
                function() {

                    showLogin();

                    const loginEmail =
                        document.getElementById(
                            "loginEmail"
                        );

                    if (loginEmail) {

                        loginEmail.value =
                            email;

                    }

                },
                800
            );

        }
    );
}


// ======================================================
// LOGIN
// ======================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const accounts =
                getAccounts();


            // FIND USER
            const user =
                accounts.find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            // WRONG LOGIN
            if (!user) {

                message.textContent =
                    "Wrong email or password.";

                message.className =
                    "auth-message error";

                return;
            }


            // SAVE CURRENT LOGIN
            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(user)
            );


            message.textContent =
                "Login successful!";

            message.className =
                "auth-message success";


            // GO TO REAL WEBSITE
            setTimeout(
                function() {

                    window.location.replace(
                        "index.html"
                    );

                },
                500
            );

        }
    );
}


// ======================================================
// LOGOUT
// ======================================================

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.replace(
        "auth.html"
    );
}


// ======================================================
// DISPLAY USER
// ======================================================

function displayUser() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }


    const username =
        document.getElementById(
            "navUser"
        );

    if (username) {

        username.textContent =
            "@" + user.username;

    }


    const profileName =
        document.getElementById(
            "profileName"
        );

    if (profileName) {

        profileName.textContent =
            user.name;

    }


    const profileUsername =
        document.getElementById(
            "profileUsername"
        );

    if (profileUsername) {

        profileUsername.textContent =
            "@" + user.username;

    }


    const profileBio =
        document.getElementById(
            "profileBio"
        );

    if (profileBio) {

        profileBio.textContent =
            user.bio;

    }


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    if (profileAvatar) {

        profileAvatar.textContent =
            user.avatar;

    }

}

displayUser();
```
