document.addEventListener("DOMContentLoaded", function () {
    let navIcon = document.getElementById("nav-icon");
    let navComponent = document.getElementById("nav-component");
    let navSection = document.getElementById("nav-section");
    let loadMoreBtn = document.getElementById("load-more-btn");
    let moreFeatures = document.getElementById("more-features");
    let bgVideo = document.getElementById("bg-video");
    
    let isOpen = false;
    let lastScrollY = window.scrollY;

    gsap.registerPlugin(ScrollTrigger);

    // Function to check if it's tablet or below
    function isTabletOrBelow() {
        return window.innerWidth <= 991;
    }

    // Function to check if it's desktop
    function isDesktop() {
        return window.innerWidth > 991;
    }

    // Function to disable scrolling
    function disableScroll() {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.body.style.height = "100vh";
    }

    // Function to enable scrolling
    function enableScroll() {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.style.height = "";
    }

    // Function to toggle menu
    function toggleMenu() {
        if (!isTabletOrBelow()) return;

        if (isOpen) {
            navComponent.classList.add("close");
            setTimeout(() => {
                navComponent.style.display = "none";
                navComponent.classList.remove("open", "close");
                enableScroll();
            }, 300);
        } else {
            navComponent.style.display = "flex";
            setTimeout(() => {
                navComponent.classList.add("open");
                disableScroll();
            }, 10);
        }
        isOpen = !isOpen;
    }

    // Click event on nav-icon to toggle menu
    if (navIcon) {
        navIcon.addEventListener("click", toggleMenu);
    }

    // Close menu when clicking any link inside nav-component
    document.querySelectorAll("#nav-component a").forEach(link => {
        link.addEventListener("click", toggleMenu);
    });

    // Close menu if window resizes to desktop view
    window.addEventListener("resize", function () {
        if (!isTabletOrBelow() && isOpen) {
            navComponent.style.display = "flex";
            navComponent.classList.remove("open", "close");
            enableScroll();
            isOpen = false;
        }
    });

    // Function to handle nav hiding on scroll for desktop only
    window.addEventListener("scroll", function () {
        if (!isDesktop()) return;

        let currentScroll = window.scrollY;

        if (currentScroll > window.innerHeight * 0.5) {
            if (currentScroll > lastScrollY) {
                gsap.to(navSection, { y: "-100%", opacity: 0, duration: 0.5, ease: "power2.out" });
            } else {
                gsap.to(navSection, { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" });
            }
        }

        lastScrollY = currentScroll;
    });

    // Ensure nav remains visible when resizing from mobile to desktop
    window.addEventListener("resize", function () {
        if (!isDesktop()) {
            gsap.to(navSection, { y: "0%", opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });

    // Load more button functionality
    if (loadMoreBtn && moreFeatures) {
        loadMoreBtn.addEventListener("click", function () {
            moreFeatures.style.display = "flex";
            setTimeout(() => {
                moreFeatures.classList.add("show");
            }, 10);
            loadMoreBtn.classList.add("hide");
            setTimeout(() => {
                loadMoreBtn.style.display = "none";
            }, 500);
        });
    }

    // Video play on scroll visibility
    if (bgVideo) {
        ScrollTrigger.create({
            trigger: bgVideo,
            start: "top 90%",
            end: "bottom 10%",
            onEnter: () => bgVideo.play(),
            onLeave: () => bgVideo.pause(),
            onEnterBack: () => bgVideo.play(),
            onLeaveBack: () => bgVideo.pause(),
        });
    }
});
