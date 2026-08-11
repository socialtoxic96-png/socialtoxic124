// =====================================================
// SOCIAL TOXIC
// CLEAN LOGIN + SIGNUP SYSTEM
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
        );
    } catch (error) {
        return null;
    }
}

// =====================================================
// AUTH PAGE CHECK
// =====================================================

function isAuthPage() {
    return window.location.pathname.endsWith("auth.html");
}

function checkLogin() {

    const user = getCurrentUser();

    if (isAuthPage()) {

        if (user) {
            window.location.replace("index.html");
        }

        return;
    }

    if (!user) {
        window.location.replace("auth.html");
    }
}

checkLogin();

// =====================================================
// LOGIN / SIGNUP SWITCH
// =====================================================

function showLogin() {

    const loginPanel =
        document.getElementById("loginPanel");

    const signupPanel =
        document.getElementById("signupPanel");

    if (loginPanel) {
        loginPanel.classList.add("active");
    }

    if (signupPanel) {
        signupPanel.classList.remove("active");
    }
}

function showSignup() {

    const loginPanel =
        document.getElementById("loginPanel");

    const signupPanel =
        document.getElementById("signupPanel");

    if (loginPanel) {
        loginPanel.classList.remove("active");
    }

    if (signupPanel) {
        signupPanel.classList.add("active");
    }
}

// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

function togglePassword(id) {

    const input =
        document.getElementById(id);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// =====================================================
// AVATAR
// =====================================================

document
    .querySelectorAll(".avatar-choice")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".avatar-choice")
                .forEach(item => {
                    item.classList.remove("selected");
                });

            button.classList.add("selected");
        });

    });

// =====================================================
// SIGN UP
// =====================================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

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

            const message =
                document.getElementById("signupMessage");

            const accounts =
                getAccounts();

            // USERNAME
            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {

                message.textContent =
                    "Username must be 3-20 characters.";

                message.className =
                    "auth-message error";

                return;
            }

            // PASSWORD
            if (password.length < 6) {

                message.textContent =
                    "Password must be at least 6 characters.";

                message.className =
                    "auth-message error";

                return;
            }

            // DUPLICATE EMAIL
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

            // DUPLICATE USERNAME
            if (
                accounts.some(
                    account =>
                        account.username.toLowerCase() ===
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
            const selectedAvatar =
                document.querySelector(
                    ".avatar-choice.selected"
                );

            const avatar =
                selectedAvatar
                    ? selectedAvatar.dataset.avatar
                    : "ST";

            // CREATE ACCOUNT
            const newUser = {

                id: Date.now(),

                username: username,

                name: username,

                email: email,

                password: password,

                avatar: avatar,

                bio: "Welcome to Social Toxic.",

                followers: 0,

                following: 0,

                posts: 0
            };

            // SAVE ACCOUNT
            accounts.push(newUser);

            saveAccounts(accounts);

            // SAVE LOGIN
            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(newUser)
            );

            message.textContent =
                "Account created successfully!";

            message.className =
                "auth-message success";

            // GO HOME
            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 800);
        }
    );
}

// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

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

            const message =
                document.getElementById("loginMessage");

            const accounts =
                getAccounts();

            const user =
                accounts.find(account =>
                    account.email === email &&
                    account.password === password
                );

            if (!user) {

                message.textContent =
                    "Incorrect email or password.";

                message.className =
                    "auth-message error";

                return;
            }

            // SAVE CURRENT USER
            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(user)
            );

            message.textContent =
                "Login successful!";

            message.className =
                "auth-message success";

            // GO HOME
            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 500);
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

    window.location.href =
        "auth.html";
}

// =====================================================
// NAVIGATION USER NAME
// =====================================================

function updateUserName() {

    const user =
        getCurrentUser();

    const navUser =
        document.getElementById("navUser");

    if (!navUser) return;

    if (user) {

        navUser.textContent =
            "@" + user.username;

    } else {

        navUser.textContent =
            "Guest";

    }
}

updateUserName();

// =====================================================
// PROFILE
// =====================================================

function loadProfile() {

    const user =
        getCurrentUser();

    if (!user) return;

    const profileName =
        document.getElementById("profileName");

    const profileUsername =
        document.getElementById("profileUsername");

    const profileBio =
        document.getElementById("profileBio");

    const profileAvatar =
        document.getElementById("profileAvatar");

    const profilePosts =
        document.getElementById("profilePosts");

    if (profileName) {
        profileName.textContent =
            user.name || user.username;
    }

    if (profileUsername) {
        profileUsername.textContent =
            "@" + user.username;
    }

    if (profileBio) {
        profileBio.textContent =
            user.bio || "Welcome to Social Toxic.";
    }

    if (profileAvatar) {
        profileAvatar.textContent =
            user.avatar || "ST";
    }

    if (profilePosts) {
        profilePosts.textContent =
            user.posts || 0;
    }
}

loadProfile();

// =====================================================
// EDIT PROFILE
// =====================================================

function openEditProfile() {

    const modal =
        document.getElementById("editModal");

    const user =
        getCurrentUser();

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
        name.value =
            user.name || user.username;
    }

    if (username) {
        username.value =
            user.username;
    }

    if (bio) {
        bio.value =
            user.bio || "";
    }

    if (avatar) {
        avatar.value =
            user.avatar || "ST";
    }

    modal.classList.add("show");
}

function saveProfile() {

    const user =
        getCurrentUser();

    if (!user) return;

    const name =
        document
            .getElementById("editName")
            .value
            .trim();

    const username =
        document
            .getElementById("editUsername")
            .value
            .trim();

    const bio =
        document
            .getElementById("editBio")
            .value
            .trim();

    const avatar =
        document
            .getElementById("editAvatar")
            .value
            .trim()
            .substring(0, 2)
            .toUpperCase();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        alert("Username must be 3-20 characters.");
        return;
    }

    const accounts =
        getAccounts();

    const duplicate =
        accounts.some(account =>
            account.id !== user.id &&
            account.username.toLowerCase() ===
            username.toLowerCase()
        );

    if (duplicate) {
        alert("Username already exists.");
        return;
    }

    user.name = name;

    user.username = username;

    user.bio =
        bio || "Welcome to Social Toxic.";

    user.avatar =
        avatar || "ST";

    const index =
        accounts.findIndex(
            account =>
                account.id === user.id
        );

    if (index !== -1) {
        accounts[index] = user;
    }

    saveAccounts(accounts);

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(user)
    );

    closeModal("editModal");

    loadProfile();

    updateUserName();
}

// =====================================================
// MODALS
// =====================================================

function openSettings() {

    const modal =
        document.getElementById("settingsModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove("show");
    }
}

// =====================================================
// SETTINGS
// =====================================================

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

    const confirmDelete =
        confirm(
            "Delete your Social Toxic account?"
        );

    if (!confirmDelete) return;

    localStorage.removeItem(
        ACCOUNTS_KEY
    );

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href =
        "auth.html";
}

// =====================================================
// COMMUNITY / POST
// =====================================================

function createPost() {

    const textInput =
        document.getElementById("postText");

    const status =
        document.getElementById("postStatus");

    if (!textInput) return;

    const text =
        textInput.value.trim();

    if (!text) {

        if (status) {
            status.textContent =
                "Write something first.";
        }

        return;
    }

    const user =
        getCurrentUser();

    const postsContainer =
        document.getElementById("postsContainer");

    if (postsContainer) {

        const post =
            document.createElement("div");

        post.className =
            "post";

        post.innerHTML = `
            <strong>
                @${user ? user.username : "guest"}
            </strong>
            <p>${escapeHTML(text)}</p>
        `;

        postsContainer.prepend(post);
    }

    textInput.value = "";

    if (status) {
        status.textContent =
            "Post published!";
    }

    if (user) {

        const accounts =
            getAccounts();

        const index =
            accounts.findIndex(
                account =>
                    account.id === user.id
            );

        if (index !== -1) {

            accounts[index].posts =
                (accounts[index].posts || 0) + 1;

            saveAccounts(accounts);

            user.posts =
                accounts[index].posts;

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(user)
            );
        }
    }
}

// Prevent HTML injection in posts
function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}

// =====================================================
// 3D EFFECT
// =====================================================

document
    .querySelectorAll(
        ".glass-card, .trend-card, .post, .feature-card, .tilt"
    )
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

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
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform = "";
            }
        );

    });

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
