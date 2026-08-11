// SOCIAL TOXIC INTERACTIONS

document.addEventListener("DOMContentLoaded", () => {

    // 3D mouse movement
    const cards = document.querySelectorAll(
        ".glass-card, .trend-card, .post"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -6;

            const rotateY =
                ((x - centerX) / centerX) * 6;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    // Mouse cursor glow
    const cursor = document.querySelector(".cursor");

    if (cursor) {

        document.addEventListener("mousemove", e => {

            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";

        });
    }


    // Scroll reveal animation
    const revealItems = document.querySelectorAll(
        ".glass-card, .trend-card, .community-card, .post"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = "all .8s ease";

        observer.observe(item);
    });

});


// COMMUNITY BUTTON

function joinCommunity() {

    alert(
        "Welcome to Social Toxic!\n\n" +
        "Account registration system coming soon."
    );

}


// Keyboard page scrolling

document.addEventListener("keydown", e => {

    if (e.key === "ArrowDown") {

        window.scrollBy({
            top: 500,
            behavior: "smooth"
        });

    }

    if (e.key === "ArrowUp") {

        window.scrollBy({
            top: -500,
            behavior: "smooth"
        });

    }

});
/* ==========================================
   SOCIAL TOXIC AUTHENTICATION SYSTEM
========================================== */

const AUTH_USERS_KEY = "socialToxicAccounts";
const CURRENT_USER_KEY = "socialToxicCurrentUser";

/* ------------------------------------------
   ACCOUNT STORAGE
------------------------------------------ */

function getAccounts() {
    try {
        return JSON.parse(
            localStorage.getItem(AUTH_USERS_KEY)
        ) || [];
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(
        AUTH_USERS_KEY,
        JSON.stringify(accounts)
    );
}

function getCurrentUser() {
    try {
        return JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        ) || null;
    } catch {
        return null;
    }
}

/* ------------------------------------------
   BUILT-IN AVATAR
------------------------------------------ */

const builtInAvatars = {
    cyber: "ST",
    neon: "NX",
    space: "SP",
    toxic: "TX"
};

function getAvatar(type) {
    return builtInAvatars[type] || "ST";
}

/* ------------------------------------------
   LOGIN PAGE CHECK
------------------------------------------ */

function isAuthPage() {
    return location.pathname.endsWith("auth.html");
}

function requireLogin() {

    if (isAuthPage()) {
        return;
    }

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        window.location.href =
            "auth.html";
    }
}

requireLogin();

/* ------------------------------------------
   SHOW LOGIN
------------------------------------------ */

function showLogin() {

    const login =
        document.getElementById(
            "loginPanel"
        );

    const signup =
        document.getElementById(
            "signupPanel"
        );

    if (login)
        login.classList.add("active");

    if (signup)
        signup.classList.remove("active");

    clearAuthMessages();
}

/* ------------------------------------------
   SHOW SIGN UP
------------------------------------------ */

function showSignup() {

    const login =
        document.getElementById(
            "loginPanel"
        );

    const signup =
        document.getElementById(
            "signupPanel"
        );

    if (login)
        login.classList.remove("active");

    if (signup)
        signup.classList.add("active");

    clearAuthMessages();
}

/* ------------------------------------------
   CLEAR MESSAGES
------------------------------------------ */

function clearAuthMessages() {

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
        loginMessage.className =
            "auth-message";
    }

    if (signupMessage) {
        signupMessage.textContent = "";
        signupMessage.className =
            "auth-message";
    }
}

/* ------------------------------------------
   MESSAGE
------------------------------------------ */

function authMessage(
    id,
    text,
    type
) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.textContent = text;

    element.className =
        "auth-message " + type;
}

/* ------------------------------------------
   SIGN UP
------------------------------------------ */

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

            /* USERNAME VALIDATION */

            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {

                authMessage(
                    "signupMessage",
                    "Username must be 3-20 characters and use only letters, numbers or _.",
                    "error"
                );

                return;
            }

            /* EMAIL VALIDATION */

            if (!email.includes("@")) {

                authMessage(
                    "signupMessage",
                    "Please enter a valid email.",
                    "error"
                );

                return;
            }

            /* PASSWORD VALIDATION */

            if (password.length < 6) {

                authMessage(
                    "signupMessage",
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }

            /* DUPLICATE EMAIL */

            if (
                accounts.some(
                    account =>
                        account.email === email
                )
            ) {

                authMessage(
                    "signupMessage",
                    "An account with this email already exists.",
                    "error"
                );

                return;
            }

            /* DUPLICATE USERNAME */

            if (
                accounts.some(
                    account =>
                        account.username.toLowerCase() ===
                        username.toLowerCase()
                )
            ) {

                authMessage(
                    "signupMessage",
                    "That username is already taken.",
                    "error"
                );

                return;
            }

            /* SELECTED AVATAR */

            const selected =
                document.querySelector(
                    ".avatar-choice.selected"
                );

            const avatarType =
                selected
                    ? selected.dataset.avatar
                    : "cyber";

            /* CREATE ACCOUNT */

            const newAccount = {

                id: Date.now(),

                username,

                email,

                password,

                avatarType,

                avatar:
                    getAvatar(
                        avatarType
                    ),

                bio:
                    "Welcome to Social Toxic.",

                createdAt:
                    new Date().toISOString(),

                followers: 0,

                following: 0

            };

            accounts.push(
                newAccount
            );

            saveAccounts(accounts);

            /* LOGIN AUTOMATICALLY */

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(
                    newAccount
                )
            );

            authMessage(
                "signupMessage",
                "Account created! Entering Social Toxic...",
                "success"
            );

            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 700);

        }
    );
}

/* ------------------------------------------
   LOGIN
------------------------------------------ */

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

            const account =
                accounts.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );

            if (!account) {

                authMessage(
                    "loginMessage",
                    "Incorrect email or password.",
                    "error"
                );

                return;
            }

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(
                    account
                )
            );

            authMessage(
                "loginMessage",
                "Login successful. Entering Social Toxic...",
                "success"
            );

            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 500);

        }
    );
}

/* ------------------------------------------
   PASSWORD SHOW/HIDE
------------------------------------------ */

function togglePassword(id) {

    const input =
        document.getElementById(id);

    if (!input) return;

    input.type =
        input.type === "password"
            ? "text"
            : "password";
}

/* ------------------------------------------
   AVATAR SELECTION
------------------------------------------ */

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

/* ------------------------------------------
   AUTH LOGOUT
------------------------------------------ */

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href =
        "auth.html";
}
