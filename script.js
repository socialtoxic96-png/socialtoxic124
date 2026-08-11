```javascript
// ======================================================
// SOCIAL TOXIC - SINGLE LOGIN / SIGNUP SYSTEM
// ======================================================

const ACCOUNTS_KEY = "socialToxicAccounts";
const CURRENT_USER_KEY = "socialToxicCurrentUser";

// ------------------------------------------------------
// LOCAL STORAGE
// ------------------------------------------------------

function getAccounts() {
    try {
        return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
    } catch {
        return null;
    }
}

// ------------------------------------------------------
// PAGE CHECK
// ------------------------------------------------------

function isAuthPage() {
    return window.location.pathname.endsWith("auth.html");
}

function checkAuthentication() {

    const currentUser = getCurrentUser();

    if (isAuthPage()) {

        if (currentUser) {
            window.location.replace("index.html");
        }

        return;
    }

    if (!currentUser) {
        window.location.replace("auth.html");
    }
}

checkAuthentication();

// ------------------------------------------------------
// LOGIN / SIGNUP SWITCH
// ------------------------------------------------------

function showLogin() {

    const login = document.getElementById("loginPanel");
    const signup = document.getElementById("signupPanel");

    if (login) {
        login.classList.add("active");
    }

    if (signup) {
        signup.classList.remove("active");
    }

    clearAuthMessages();
}

function showSignup() {

    const login = document.getElementById("loginPanel");
    const signup = document.getElementById("signupPanel");

    if (login) {
        login.classList.remove("active");
    }

    if (signup) {
        signup.classList.add("active");
    }

    clearAuthMessages();
}

function clearAuthMessages() {

    const loginMessage =
        document.getElementById("loginMessage");

    const signupMessage =
        document.getElementById("signupMessage");

    if (loginMessage) {
        loginMessage.textContent = "";
        loginMessage.className = "auth-message";
    }

    if (signupMessage) {
        signupMessage.textContent = "";
        signupMessage.className = "auth-message";
    }
}

function authMessage(id, text, type) {

    const message = document.getElementById(id);

    if (!message) return;

    message.textContent = text;
    message.className = "auth-message " + type;
}

// ------------------------------------------------------
// PASSWORD SHOW / HIDE
// ------------------------------------------------------

function togglePassword(id) {

    const input = document.getElementById(id);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// ------------------------------------------------------
// AVATAR SELECTION
// ------------------------------------------------------

document.querySelectorAll(".avatar-choice").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".avatar-choice")
            .forEach(item => {
                item.classList.remove("selected");
            });

        button.classList.add("selected");
    });

});

// ------------------------------------------------------
// SIGN UP
// ------------------------------------------------------

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document
                .getElementById("signupUsername")
                .value
                .trim();

        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("signupPassword")
                .value;

        const accounts = getAccounts();

        // USERNAME
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {

            authMessage(
                "signupMessage",
                "Username must be 3-20 characters. Use only letters, numbers or _.",
                "error"
            );

            return;
        }

        // EMAIL
        if (!email.includes("@")) {

            authMessage(
                "signupMessage",
                "Please enter a valid email.",
                "error"
            );

            return;
        }

        // PASSWORD
        if (password.length < 6) {

            authMessage(
                "signupMessage",
                "Password must be at least 6 characters.",
                "error"
            );

            return;
        }

        // DUPLICATE EMAIL
        if (
            accounts.some(
                account => account.email === email
            )
        ) {

            authMessage(
                "signupMessage",
                "This email is already registered.",
                "error"
            );

            return;
        }

        // DUPLICATE USERNAME
        if (
            accounts.some(
                account =>
                    account.username.toLowerCase() ===
                    username.toLowerCase()
            )
        ) {

            authMessage(
                "signupMessage",
                "This username is already taken.",
                "error"
            );

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

        // CREATE ACCOUNT
        const account = {

            id: Date.now(),

            username: username,

            name: username,

            email: email,

            password: password,

            avatar: avatar,

            bio: "Welcome to Social Toxic.",

            followers: 0,

            following: 0,

            posts: 0,

            createdAt: new Date().toISOString()
        };

        // SAVE ACCOUNT
        accounts.push(account);

        saveAccounts(accounts);

        // SAVE CURRENT USER
        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(account)
        );

        authMessage(
            "signupMessage",
            "Account created! Opening Social Toxic...",
            "success"
        );

        // GO TO HOME
        setTimeout(() => {

            window.location.replace("index.html");

        }, 700);

    });
}

// ------------------------------------------------------
// LOGIN
// ------------------------------------------------------

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("loginPassword")
                .value;

        const accounts = getAccounts();

        const account =
            accounts.find(user =>
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

        // SAVE CURRENT USER
        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(account)
        );

        authMessage(
            "loginMessage",
            "Login successful! Opening Social Toxic...",
            "success"
        );

        setTimeout(() => {

            window.location.replace("index.html");

        }, 500);

    });
}

// ------------------------------------------------------
// LOGOUT
// ------------------------------------------------------

function logout() {

    localStorage.removeItem(CURRENT_USER_KEY);

    window.location.replace("auth.html");
}

// ------------------------------------------------------
// NAV USER
// ------------------------------------------------------

function updateNavigationUser() {

    const navUser =
        document.getElementById("navUser");

    if (!navUser) return;

    const user = getCurrentUser();

    if (user) {

        navUser.textContent =
            "@" + user.username;

    } else {

        navUser.textContent = "";

    }
}

updateNavigationUser();

// ------------------------------------------------------
// PROFILE
// ------------------------------------------------------

function loadProfile() {

    const user = getCurrentUser();

    if (!user) return;

    const name =
        document.getElementById("profileName");

    const username =
        document.getElementById("profileUsername");

    const bio =
        document.getElementById("profileBio");

    const avatar =
        document.getElementById("profileAvatar");

    const posts =
        document.getElementById("profilePosts");

    if (name) {
        name.textContent = user.name || user.username;
    }

    if (username) {
        username.textContent =
            "@" + user.username;
    }

    if (bio) {
        bio.textContent =
            user.bio || "Welcome to Social Toxic.";
    }

    if (avatar) {
        avatar.textContent =
            user.avatar || "ST";
    }

    if (posts) {
        posts.textContent =
            user.posts || 0;
    }
}

loadProfile();

// ------------------------------------------------------
// EDIT PROFILE
// ------------------------------------------------------

function openEditProfile() {

    const modal =
        document.getElementById("editModal");

    const user = getCurrentUser();

    if (!modal || !user) return;

    const name =
        document.getElementById("editName");

    const username =
        document.getElementById("editUsername");

    const bio =
        document.getElementById("editBio");

    const avatar =
        document.getElementById("editAvatar");

    if (name) {
        name.value = user.name || user.username;
    }

    if (username) {
        username.value = user.username || "";
    }

    if (bio) {
        bio.value = user.bio || "";
    }

    if (avatar) {
        avatar.value = user.avatar || "ST";
    }

    modal.classList.add("show");
}

function saveProfile() {

    const currentUser = getCurrentUser();

    if (!currentUser) return;

    const newName =
        document
            .getElementById("editName")
            .value
            .trim();

    const newUsername =
        document
            .getElementById("editUsername")
            .value
            .trim();

    const newBio =
        document
            .getElementById("editBio")
            .value
            .trim();

    const newAvatar =
        document
            .getElementById("editAvatar")
            .value
            .trim()
            .substring(0, 2)
            .toUpperCase();

    if (!newName) {
        alert("Please enter your name.");
        return;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(newUsername)) {
        alert("Username must be 3-20 characters.");
        return;
    }

    const accounts = getAccounts();

    const duplicate =
        accounts.some(account =>
            account.id !== currentUser.id &&
            account.username.toLowerCase() ===
            newUsername.toLowerCase()
        );

    if (duplicate) {
        alert("That username is already taken.");
        return;
    }

    currentUser.name = newName;
    currentUser.username = newUsername;
    currentUser.bio =
        newBio || "Welcome to Social Toxic.";
    currentUser.avatar =
        newAvatar || "ST";

    const index =
        accounts.findIndex(
            account => account.id === currentUser.id
        );

    if (index !== -1) {
        accounts[index] = currentUser;
    }

    saveAccounts(accounts);

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(currentUser)
    );

    closeModal("editModal");

    loadProfile();
    updateNavigationUser();
}

// ------------------------------------------------------
// MODALS
// ------------------------------------------------------

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }
}

function openSettings() {

    const modal =
        document.getElementById("settingsModal");

    if (modal) {
        modal.classList.add("show");
    }
}

// ------------------------------------------------------
// SETTINGS
// ------------------------------------------------------

function toggleNeon() {

    document.body.classList.toggle(
        "no-neon"
    );
}

function toggle3D() {

    document.body.classList.toggle(
        "no-3d"
    );
}

function resetAccount() {

    const answer =
        confirm(
            "Delete all Social Toxic local account data?"
        );

    if (!answer) return;

    localStorage.removeItem(ACCOUNTS_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);

    window.location.replace("auth.html");
}

// ------------------------------------------------------
// 3D CARD EFFECT
// ------------------------------------------------------

document
    .querySelectorAll(
        ".glass-card, .trend-card, .post, .feature-card, .tilt"
    )
    .forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

// ------------------------------------------------------
// KEYBOARD SCROLL
// ------------------------------------------------------

document.addEventListener("keydown", event => {

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

});
```
