
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    const backToTop = document.querySelector(".back-to-top");
    const year = document.getElementById("currentYear");


    // 1. Automatically update footer year

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // 2. Mobile navigation menu

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }


    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        navItems.forEach((link) => {

            link.addEventListener("click", closeMenu);

        });


        // Close menu when clicking outside

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMenu();
            }

        });


        // Close menu with Escape key

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    // 3. Scroll reveal animation

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    // 4. Active navigation highlighting

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");


                        navItems.forEach((link) => {

                            const isCurrent =
                                link.getAttribute("href") ===
                                `#${currentId}`;

                            link.classList.toggle(
                                "active",
                                isCurrent
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    // 5. Back to top button

    function updateBackToTop() {

        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

});
