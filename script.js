<script>
document.addEventListener("DOMContentLoaded", function () {
    let navIcon = document.getElementById("nav-icon");
    let navComponent = document.getElementById("nav-component");
    let isOpen = false;

    // Function to check if it's tablet or below
    function isTabletOrBelow() {
        return window.innerWidth <= 991;
    }

    // Function to disable scrolling
    function disableScroll() {
        document.body.style.overflow = "hidden";  // Prevent scrolling
        document.body.style.touchAction = "none"; // Prevent touch gestures
        document.body.style.height = "100vh";     // Fix body height
    }

    // Function to enable scrolling
    function enableScroll() {
        document.body.style.overflow = "";        // Restore scrolling
        document.body.style.touchAction = "";     // Restore touch gestures
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
                enableScroll(); //Enable scrolling when menu closes
            }, 300); // Match CSS transition duration
        } else {
            navComponent.style.display = "flex";
            setTimeout(() => {
                navComponent.classList.add("open");
                disableScroll(); //Disable scrolling when menu opens
            }, 10);
        }
        isOpen = !isOpen;
    }

    // Click event on nav-icon to toggle menu
    navIcon.addEventListener("click", toggleMenu);

    // Close menu when clicking any link inside nav-component
    document.querySelectorAll("#nav-component a").forEach(link => {
        link.addEventListener("click", toggleMenu);
    });

    // Close menu if window resizes to desktop view
    window.addEventListener("resize", function () {
        if (!isTabletOrBelow() && isOpen) {
            navComponent.style.display = "flex";
            navComponent.classList.remove("open", "close");
            enableScroll(); // Ensure scrolling is enabled when resizing
            isOpen = false;
        }
    });
});
</script>
<script>
document.addEventListener("DOMContentLoaded", function () {
    let loadMoreBtn = document.getElementById("load-more-btn");
    let moreFeatures = document.getElementById("more-features");

    loadMoreBtn.addEventListener("click", function () {
        // Show #more-features with fade-in animation
        moreFeatures.style.display = "flex";
        setTimeout(() => {
            moreFeatures.classList.add("show");
        }, 10);

        // Hide #load-more-btn with fade-out effect
        loadMoreBtn.classList.add("hide");
        setTimeout(() => {
            loadMoreBtn.style.display = "none";
        }, 500); // Match CSS transition duration
    });
});
</script>

<script>
document.addEventListener("DOMContentLoaded", function () {
    let navSection = document.getElementById("nav-section");
    let lastScrollY = window.scrollY;

    function isDesktop() {
        return window.innerWidth > 991; // Only apply effect above tablet breakpoint
    }

    window.addEventListener("scroll", function () {
        if (!isDesktop()) return; // Exit if below desktop size

        let currentScroll = window.scrollY;

        if (currentScroll > window.innerHeight * 0.5) {
            // If scrolling down past 50vh, move nav out of view
            if (currentScroll > lastScrollY) {
                gsap.to(navSection, { y: "-100%", opacity: 0, duration: 0.5, ease: "power2.out" });
            } 
            // If scrolling back up, bring it back
            else {
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
});
</script>


<script>
document.addEventListener("DOMContentLoaded", function () {
    let bgVideo = document.getElementById("bg-video");

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: bgVideo,
        start: "top 70%",  // Video starts playing when 30% of it is inside viewport
        end: "bottom 30%", // Video stops when it's out of view
        onEnter: () => bgVideo.play(),
        onLeave: () => bgVideo.pause(),
        onEnterBack: () => bgVideo.play(),
        onLeaveBack: () => bgVideo.pause(),
    });
});
</script>
