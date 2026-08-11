// =====================================================
// SOCIAL TOXIC - MAIN SYSTEM
// LOGIN + SIGNUP + LOADER + PAGE PROTECTION
// =====================================================

const ACCOUNTS_KEY = "socialToxicAccounts";
const CURRENT_USER_KEY = "socialToxicCurrentUser";


// =====================================================
// STORAGE
// =====================================================

function getAccounts() {

    try {

        return JSON.parse(
            localStorage.getItem(ACCOUNTS_KEY)
        ) || [];

    } catch (error) {

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

    try {

        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        ) || null;

    } catch (error) {

        return null;

    }

}


// =====================================================
// LOADER
// =====================================================

function hideLoader() {

    const loader =
        document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 800);

}


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        hideLoader
    );

} else {

    hideLoader();

}


// =====================================================
// PAGE PROTECTION
// =====================================================

function checkAuthentication() {

    const user =
        getCurrentUser();

    const page =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // AUTH PAGE
    if (page === "auth.html") {

        if (user) {

            window.location.replace(
                "index.html"
            );

        }

        return;

    }


    // MAIN WEBSITE
    if (!user) {

        window.location.replace(
            "auth.html"
        );

        return;

    }

}


checkAuthentication();


// =====================================================
// LOGIN / SIGNUP SWITCH
// =====================================================

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

        login.classList.add(
            "active"
        );

    }


    if (signup) {

        signup.classList.remove(
            "active"
        );

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

        login.classList.remove(
            "active"
        );

    }


    if (signup) {

        signup.classList.add(
            "active"
        );

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


function showMessage(
    id,
    text,
    type
) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent =
        text;

    element.className =
        "auth-message " + type;

}


// =====================================================
// AVATAR
// =====================================================

document
    .querySelectorAll(".avatar-choice")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".avatar-choice"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                    });


                button.classList.add(
                    "selected"
                );

            }
        );

    });


// =====================================================
// SIGN UP
// =====================================================

const signupForm =
    document.getElementById(
        "signupForm"
    );


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        event => {

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


            const accounts =
                getAccounts();


            // USERNAME
            if (
                !/^[a-zA-Z0-9_]{3,20}$/
                    .test(username)
            ) {

                showMessage(
                    "signupMessage",
                    "Username must be 3-20 characters.",
                    "error"
                );

                return;

            }


            // PASSWORD
            if (password.length < 6) {

                showMessage(
                    "signupMessage",
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;

            }


            // EMAIL
            if (
                accounts.some(
                    account =>
                        account.email === email
                )
            ) {

                showMessage(
                    "signupMessage",
                    "This email is already registered.",
                    "error"
                );

                return;

            }


            // USERNAME
            if (
                accounts.some(
                    account =>
                        account.username
                            .toLowerCase() ===
                        username.toLowerCase()
                )
            ) {

                showMessage(
                    "signupMessage",
                    "This username is already taken.",
                    "error"
                );

                return;

            }


            // AVATAR
            const selectedAvatar =
                document.querySelector(
                    ".avatar-choice.selected"
                );


            const avatar =
                selectedAvatar
                    ? selectedAvatar.dataset.avatar
                    : "ST";


            // CREATE USER
            const newUser = {

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


            // SAVE
            accounts.push(
                newUser
            );

            saveAccounts(
                accounts
            );


            // DO NOT LOGIN YET
            showMessage(
                "signupMessage",
                "Account created! Please login.",
                "success"
            );


            // CLEAR FORM
            signupForm.reset();


            // GO TO LOGIN
            setTimeout(
                () => {

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


// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        event => {

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


            const accounts =
                getAccounts();


            const user =
                accounts.find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            if (!user) {

                showMessage(
                    "loginMessage",
                    "Incorrect email or password.",
                    "error"
                );

                return;

            }


            // SAVE CURRENT USER
            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(user)
            );


            showMessage(
                "loginMessage",
                "Login successful! Opening Social Toxic...",
                "success"
            );


            // REAL WEBSITE
            setTimeout(
                () => {

                    window.location.replace(
                        "index.html"
                    );

                },
                500
            );

        }
    );

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );


    window.location.replace(
        "auth.html"
    );

}


// =====================================================
// SHOW USERNAME
// =====================================================

function showUser() {

    const user =
        getCurrentUser();

    if (!user) return;


    const navUser =
        document.getElementById(
            "navUser"
        );


    if (navUser) {

        navUser.textContent =
            "@" + user.username;

    }


    const profileName =
        document.getElementById(
            "profileName"
        );


    if (profileName) {

        profileName.textContent =
            user.name ||
            user.username;

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
            user.bio ||
            "Welcome to Social Toxic.";

    }


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    if (profileAvatar) {

        profileAvatar.textContent =
            user.avatar ||
            "ST";

    }

}


showUser();


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

function togglePassword(id) {

    const input =
        document.getElementById(id);

    if (!input) return;


    input.type =
        input.type === "password"
            ? "text"
            : "password";

}


// =====================================================
// KEYBOARD SCROLL
// =====================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowDown") {

            window.scrollBy({
                top: 500,
                behavior: "smooth"
            });

        }


        if (event.key === "ArrowUp") {

            window.scrollBy({
                top: -500,
                behavior: "smooth"
            });

        }

    }
);
