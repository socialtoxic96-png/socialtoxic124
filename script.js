/* ==========================================
   SOCIAL TOXIC
   LOCAL STORAGE SOCIAL SYSTEM
========================================== */

const STORAGE_USER = "socialToxicUser";
const STORAGE_POSTS = "socialToxicPosts";
const STORAGE_SETTINGS = "socialToxicSettings";


/* ==========================================
   DEFAULT DATA
========================================== */

const defaultPosts = [

    {
        id: 1,
        username: "NeoCreator",
        avatar: "NC",
        text: "Welcome to the Social Toxic community 🚀",
        likes: 124,
        liked: false,
        comments: []
    },

    {
        id: 2,
        username: "CyberMind",
        avatar: "CM",
        text: "The future belongs to creators.",
        likes: 87,
        liked: false,
        comments: []
    },

    {
        id: 3,
        username: "DigitalSoul",
        avatar: "DS",
        text: "What are you building today?",
        likes: 54,
        liked: false,
        comments: []
    }

];


/* ==========================================
   LOCAL STORAGE
========================================== */

function getUser() {

    return JSON.parse(
        localStorage.getItem(STORAGE_USER)
    ) || null;

}


function saveUser(user) {

    localStorage.setItem(
        STORAGE_USER,
        JSON.stringify(user)
    );

}


function getPosts() {

    const posts =
        localStorage.getItem(STORAGE_POSTS);

    if (!posts) {

        localStorage.setItem(
            STORAGE_POSTS,
            JSON.stringify(defaultPosts)
        );

        return defaultPosts;
    }

    return JSON.parse(posts);

}


function savePosts(posts) {

    localStorage.setItem(
        STORAGE_POSTS,
        JSON.stringify(posts)
    );

}


/* ==========================================
   USER SETUP
========================================== */

function createDefaultUser() {

    if (!getUser()) {

        saveUser({

            name: "Guest User",

            username: "guest",

            bio:
                "Exploring the digital world one idea at a time.",

            avatar: "ST"

        });

    }

}


createDefaultUser();


/* ==========================================
   NAV USER
========================================== */

function updateNavigation() {

    const user =
        getUser();

    const element =
        document.getElementById("navUser");

    if (element && user) {

        element.textContent =
            "@" + user.username;

    }

}


updateNavigation();


/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hide");

        }, 800);

    }

});


/* ==========================================
   PARTICLES
========================================== */

function createParticles() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            5 + Math.random() * 12 + "s";

        particle.style.animationDelay =
            Math.random() * 8 + "s";

        particle.style.opacity =
            Math.random();

        container.appendChild(particle);

    }

}


createParticles();


/* ==========================================
   3D TILT
========================================== */

function activateTilt() {

    const elements =
        document.querySelectorAll(".tilt");

    elements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (
                    document.body.classList.contains(
                        "no-3d"
                    )
                ) return;

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) * -7;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 7;

                element.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(10px)
                    `;

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });

}


activateTilt();


/* ==========================================
   MOUSE PARALLAX
========================================== */

document.addEventListener(
    "mousemove",
    event => {

        const planet =
            document.querySelector(".planet");

        if (!planet) return;

        if (
            document.body.classList.contains(
                "no-3d"
            )
        ) return;

        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 20;

        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 20;

        planet.style.marginLeft =
            x + "px";

        planet.style.marginTop =
            y + "px";

    }
);


/* ==========================================
   TRENDING
========================================== */

const trends = [

    {
        title: "#CYBERWORLD",
        posts: "482K",
        description:
            "The digital world is changing fast."
    },

    {
        title: "#GAMING",
        posts: "391K",
        description:
            "Games, esports and gaming culture."
    },

    {
        title: "#TECH",
        posts: "284K",
        description:
            "Technology shaping tomorrow."
    },

    {
        title: "#AI",
        posts: "221K",
        description:
            "Artificial intelligence and creativity."
    },

    {
        title: "#CREATORS",
        posts: "187K",
        description:
            "Creators building the future."
    },

    {
        title: "#FUTURE",
        posts: "159K",
        description:
            "Ideas from the next generation."
    }

];


function renderTrending(filter = "") {

    const grid =
        document.getElementById(
            "trendingGrid"
        );

    if (!grid) return;

    grid.innerHTML = "";

    const filtered =
        trends.filter(
            trend =>
                trend.title
                    .toLowerCase()
                    .includes(
                        filter.toLowerCase()
                    )
        );

    filtered.forEach(
        (trend, index) => {

            const card =
                document.createElement("article");

            card.className =
                "trend-card tilt";

            card.innerHTML = `

                <div class="trend-big">
                    ${String(index + 1).padStart(2,"0")}
                </div>

                <span class="eyebrow">
                    TREND ${String(index + 1).padStart(2,"0")}
                </span>

                <h2>
                    ${trend.title}
                </h2>

                <p>
                    ${trend.posts} posts
                    <br>
                    ${trend.description}
                </p>

                <button onclick="
                    alert('Exploring ${trend.title}')
                ">
                    EXPLORE →
                </button>

            `;

            grid.appendChild(card);

        }
    );

    activateTilt();

}


renderTrending();


const search =
    document.getElementById(
        "searchInput"
    );

if (search) {

    search.addEventListener(
        "input",
        () => {

            renderTrending(
                search.value
            );

        }
    );

}


/* ==========================================
   COMMUNITY POSTS
========================================== */

function renderPosts() {

    const container =
        document.getElementById(
            "postsContainer"
        );

    if (!container) return;

    const posts =
        getPosts();

    container.innerHTML = "";

    posts.slice()
        .reverse()
        .forEach(post => {

            const article =
                document.createElement(
                    "article"
                );

            article.className =
                "post-card tilt";

            const user =
                getUser();

            const ownPost =
                user &&
                post.username ===
                user.username;

            article.innerHTML = `

                <div class="post-header">

                    <div class="post-avatar">
                        ${post.avatar}
                    </div>

                    <div>

                        <strong>
                            @${post.username}
                        </strong>

                        <div class="post-time">
                            SOCIAL TOXIC
                        </div>

                    </div>

                </div>

                <div class="post-content">
                    ${escapeHTML(post.text)}
                </div>

                <div class="post-actions">

                    <button onclick="
                        likePost(${post.id})
                    ">
                        ♡ ${post.likes}
                    </button>

                    <button onclick="
                        commentPost(${post.id})
                    ">
                        💬 ${post.comments.length}
                    </button>

                    ${
                        ownPost
                        ?
                        `
                        <button onclick="
                            deletePost(${post.id})
                        ">
                            DELETE
                        </button>
                        `
                        :
                        ""
                    }

                </div>

            `;

            container.appendChild(
                article
            );

        });

    activateTilt();

    updateCounters();

}


function createPost() {

    const user =
        getUser();

    const input =
        document.getElementById(
            "postText"
        );

    const status =
        document.getElementById(
            "postStatus"
        );

    if (!input || !user) return;

    const text =
        input.value.trim();

    if (!text) {

        status.textContent =
            "Write something first.";

        return;

    }

    const posts =
        getPosts();

    posts.push({

        id:
            Date.now(),

        username:
            user.username,

        avatar:
            user.avatar,

        text:
            text,

        likes:
            0,

        liked:
            false,

        comments:
            []

    });

    savePosts(posts);

    input.value = "";

    status.textContent =
        "Posted successfully.";

    renderPosts();

}


function likePost(id) {

    const posts =
        getPosts();

    const post =
        posts.find(
            p => p.id === id
        );

    if (!post) return;

    post.likes++;

    savePosts(posts);

    renderPosts();

}


function commentPost(id) {

    const comment =
        prompt(
            "Write your comment:"
        );

    if (!comment) return;

    const posts =
        getPosts();

    const post =
        posts.find(
            p => p.id === id
        );

    if (!post) return;

    post.comments.push(
        comment
    );

    savePosts(posts);

    renderPosts();

}


function deletePost(id) {

    if (
        !confirm(
            "Delete this post?"
        )
    ) return;

    let posts =
        getPosts();

    posts =
        posts.filter(
            p => p.id !== id
        );

    savePosts(posts);

    renderPosts();

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


renderPosts();


/* ==========================================
   PROFILE
========================================== */

function renderProfile() {

    const user =
        getUser();

    if (!user) return;

    const name =
        document.getElementById(
            "profileName"
        );

    const username =
        document.getElementById(
            "profileUsername"
        );

    const bio =
        document.getElementById(
            "profileBio"
        );

    const avatar =
        document.getElementById(
            "profileAvatar"
        );

    const createName =
        document.getElementById(
            "createUsername"
        );

    const createAvatar =
        document.getElementById(
            "createAvatar"
        );

    if (name)
        name.textContent =
            user.name;

    if (username)
        username.textContent =
            "@" + user.username;

    if (bio)
        bio.textContent =
            user.bio;

    if (avatar)
        avatar.textContent =
            user.avatar;

    if (createName)
        createName.textContent =
            user.username;

    if (createAvatar)
        createAvatar.textContent =
            user.avatar;

    const posts =
        getPosts()
        .filter(
            p =>
                p.username ===
                user.username
        );

    const count =
        document.getElementById(
            "profilePosts"
        );

    if (count)
        count.textContent =
            posts.length;

}


renderProfile();


/* ==========================================
   EDIT PROFILE
========================================== */

function openEditProfile() {

    const user =
        getUser();

    document.getElementById(
        "editName"
    ).value =
        user.name;

    document.getElementById(
        "editUsername"
    ).value =
        user.username;

    document.getElementById(
        "editBio"
    ).value =
        user.bio;

    document.getElementById(
        "editAvatar"
    ).value =
        user.avatar;

    document.getElementById(
        "editModal"
    ).classList.add(
        "active"
    );

}


function saveProfile() {

    const user =
        getUser();

    const oldUsername =
        user.username;

    const newName =
        document.getElementById(
            "editName"
        ).value.trim();

    const newUsername =
        document.getElementById(
            "editUsername"
        ).value
            .trim()
            .replace(
                /\s+/g,
                "_"
            );

    const newBio =
        document.getElementById(
            "editBio"
        ).value.trim();

    const newAvatar =
        document.getElementById(
            "editAvatar"
        ).value
            .trim()
            .toUpperCase()
            .slice(0,2);

    if (!newName || !newUsername) {

        alert(
            "Name and username are required."
        );

        return;

    }

    user.name =
        newName;

    user.username =
        newUsername;

    user.bio =
        newBio ||
        "Welcome to Social Toxic.";

    user.avatar =
        newAvatar ||
        "ST";

    saveUser(user);


    /* Update existing user's posts */

    const posts =
        getPosts();

    posts.forEach(post => {

        if (
            post.username ===
            oldUsername
        ) {

            post.username =
                newUsername;

            post.avatar =
                user.avatar;

        }

    });

    savePosts(posts);

    closeModal(
        "editModal"
    );

    renderProfile();

    updateNavigation();

    renderPosts();

}


/* ==========================================
   SETTINGS
========================================== */

function openSettings() {

    document.getElementById(
        "settingsModal"
    ).classList.add(
        "active"
    );

}


function toggleNeon() {

    const checkbox =
        document.getElementById(
            "neonToggle"
        );

    if (!checkbox) return;

    document.body.style.setProperty(
        "--green",
        checkbox.checked
            ? "#00ff91"
            : "#777"
    );

}


function toggle3D() {

    const checkbox =
        document.getElementById(
            "threeToggle"
        );

    if (!checkbox) return;

    document.body.classList.toggle(
        "no-3d",
        !checkbox.checked
    );

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal)
        modal.classList.remove(
            "active"
        );

}


window.addEventListener(
    "click",
    event => {

        if (
            event.target.classList
                .contains("modal")
        ) {

            event.target.classList.remove(
                "active"
            );

        }

    }
);


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    if (
        !confirm(
            "Logout from Social Toxic?"
        )
    ) return;

    localStorage.removeItem(
        STORAGE_USER
    );

    createDefaultUser();

    window.location.href =
        "index.html";

}


/* ==========================================
   RESET
========================================== */

function resetAccount() {

    if (
        !confirm(
            "This will reset your local Social Toxic data. Continue?"
        )
    ) return;

    localStorage.removeItem(
        STORAGE_USER
    );

    localStorage.removeItem(
        STORAGE_POSTS
    );

    localStorage.removeItem(
        STORAGE_SETTINGS
    );

    createDefaultUser();

    location.reload();

}


/* ==========================================
   COUNTERS
========================================== */

function updateCounters() {

    const posts =
        getPosts();

    const postCounter =
        document.getElementById(
            "postsCount"
        );

    if (postCounter)
        postCounter.textContent =
            posts.length;

    const userCounter =
        document.getElementById(
            "usersCount"
        );

    if (userCounter)
        userCounter.textContent =
            "1+";

}


updateCounters();


/* ==========================================
   KEYBOARD SCROLL
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowDown"
        ) {

            window.scrollBy({

                top: 500,

                behavior:
                    "smooth"

            });

        }

        if (
            event.key === "ArrowUp"
        ) {

            window.scrollBy({

                top: -500,

                behavior:
                    "smooth"

            });

        }

    }
);


/* ==========================================
   SCROLL 3D PARALLAX
========================================== */

window.addEventListener(
    "scroll",
    () => {

        if (
            document.body.classList.contains(
                "no-3d"
            )
        ) return;

        const sphere =
            document.querySelector(
                ".wire-sphere"
            );

        if (sphere) {

            const y =
                window.scrollY;

            sphere.style.transform =
                `
                rotateY(${y * .12}deg)
               
