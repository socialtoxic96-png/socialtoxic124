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
