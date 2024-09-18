window.addEventListener('scroll', function () {
    let header = document.getElementById('navigation');
    let nav = document.querySelector('nav.left'); // Select the nav element inside the header
    let offset = nav.offsetTop;

    if (window.scrollY > offset) {
        header.classList.add('sticky-nav');
    } else {
        header.classList.remove('sticky-nav');
    }
});



document.addEventListener("DOMContentLoaded", function () {

    // MOBILE SIDEBAR
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        sidebar.style.translate = '0';
        overlay.classList.add('active'); // Show the overlay

    });

    closeSidebar.addEventListener('click', () => {
        sidebar.style.translate = '-100%';
        overlay.classList.remove('active'); // Hide the overlay
    });
    overlay.addEventListener('click', () => {
        sidebar.style.translate = '-100%';
        overlay.classList.remove('active'); // Hide the overlay
    });



    // TOGGLE VIDEO MUTE
    const video = document.getElementById('hero-video');
    const customCursor = document.getElementById('custom-cursor');

    function setVideoSource() {

        // Define different video sources for different screen sizes
        const smallScreenVideo = {
            webm: './img/hero-video-small.webm',
            mp4: './img/hero-video-small.mp4'
        };
        const largeScreenVideo = {
            webm: './img/hero-video.webm',
            mp4: './img/hero-video.mp4'
        };

        // Check the screen size
        const isSmallScreen = window.innerWidth <= 768; // Adjust the width breakpoint as needed

        // Clear existing sources
        while (video.firstChild) {
            video.removeChild(video.firstChild);
        }

        // Set sources based on screen size
        const selectedVideo = isSmallScreen ? smallScreenVideo : largeScreenVideo;
        
        const sourceWebm = document.createElement('source');
        sourceWebm.src = selectedVideo.webm;
        sourceWebm.type = 'video/webm';

        const sourceMp4 = document.createElement('source');
        sourceMp4.src = selectedVideo.mp4;
        sourceMp4.type = 'video/mp4';

        // Append new sources
        video.appendChild(sourceWebm);
        video.appendChild(sourceMp4);

        // Load and play the video
        video.load();
        video.play();
    }

    setVideoSource();



    if (video && customCursor) {

        // Move the custom cursor with the mouse
        document.addEventListener('mousemove', function (e) {
            // Get the bounding rectangle of the video element
            const videoRect = video.getBoundingClientRect();

            // Check if the cursor is inside the video boundaries
            const isCursorInsideVideo = (
                e.clientX >= videoRect.left &&
                e.clientX <= videoRect.right &&
                e.clientY >= videoRect.top &&
                e.clientY <= videoRect.bottom
            );

            // Move the custom cursor with the mouse
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';

            // Show or hide the custom cursor based on its position
            if (isCursorInsideVideo) {
                customCursor.style.display = 'block';
            } else {
                customCursor.style.display = 'none';
            }
        });

        // Toggle the mute state and cursor appearance on video click
        video.addEventListener('click', function () {
            this.muted = !this.muted;

            if (this.muted) {
                customCursor.classList.remove('unmute-cursor');
                customCursor.classList.add('mute-cursor');
            } else {
                customCursor.classList.remove('mute-cursor');
                customCursor.classList.add('unmute-cursor');
            }
        });
    }

    // Section 2 Title Transition
    const section2ObserverOptions = {
        threshold: 0.5
    };

    const section2Observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.title-part').classList.add('visible');
            }
        });
    }, section2ObserverOptions);

    const section2 = document.querySelector('.section-2');
    if (section2) {
        section2Observer.observe(section2);
    }

    // Services Animation
    const servicesObserverOptions = {
        threshold: 0.5
    };

    let lastScrollTop = 0;
    let lastTimestamp = 0;

    const servicesObserver = new IntersectionObserver(function (entries) {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const currentTimestamp = performance.now();

        // Calculate scroll speed and adjust animation duration accordingly
        const scrollSpeed = Math.abs(currentScrollTop - lastScrollTop) / (currentTimestamp - lastTimestamp);
        const baseDuration = 500;
        const speedFactor = 0.5; // Reduce the speed impact by adjusting this factor
        const animationDuration = Math.max(baseDuration - (scrollSpeed * speedFactor), baseDuration / 2);

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const services = entry.target.querySelectorAll('.service');
                services.forEach((service, index) => {
                    service.classList.add('visible');
                    service.style.transition = `opacity 500ms ease-in ${index * 200}ms, translate 500ms ease-in ${index * 200}ms`
                });

                const dots = entry.target.querySelectorAll('.service .service-name-dot');
                dots.forEach(dot => {
                    dot.style.setProperty('--_animation-duration', `${animationDuration}ms`);
                    dot.classList.add('play-animation');
                    currentScrollTop < lastScrollTop && dot.classList.add('reversed');

                });
            } else {
                entry.target.querySelectorAll('.service .service-name-dot').forEach(dot => {
                    dot.classList.remove('play-animation', 'reversed');
                });
            }
        });

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        lastTimestamp = currentTimestamp;
    }, servicesObserverOptions);

    // Observe each .services section individually
    const servicesSections = document.querySelectorAll('.services');
    servicesSections.forEach(servicesSection => {
        servicesObserver.observe(servicesSection);
    });


    // Timeline Alternation
    const timelineParts = document.querySelectorAll('.timeline-part');
    const columns = 2;

    timelineParts.forEach((part, index) => {
        const col = (index % columns) + 1;
        const row = Math.floor(index / columns) * 2 + col;
        part.style.gridColumn = col;
        part.style.gridRow = row;
    });

    // Glassy Effect Motions
    const glassyTimelines = document.querySelectorAll('.timeline-part.glassy-effect');
    glassyTimelines.forEach(button => {
        button.addEventListener('mousemove', event => {
            const centerX = button.offsetWidth / 2;
            const centerY = button.offsetHeight / 2;
            const offsetX = event.offsetX - centerX;
            const offsetY = event.offsetY - centerY;

            button.style.setProperty('--_x-motion', `${offsetX}px`);
            button.style.setProperty('--_y-motion', `${offsetY}px`);
        });
    });

    // Section 3 Timeline Transition
    document.querySelectorAll('.timeline-part').forEach((timelinePart, index) => {
        const timelineObserverOptions = {
            threshold: 1
        };

        const timelineObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.transitionDelay = `${index * 200}ms`;
                }
            });
        }, timelineObserverOptions);

        const section = document.getElementById(`timeline-part-${index + 1}`);
        if (section) {
            timelineObserver.observe(section);
        }
    });

    // Timeline Circle Scroll Effect
    const timelineCircle = document.querySelector('.timeline-circle');
    const section3 = document.querySelector('.section-3');
    let isScrolling;

    if (section3 && timelineCircle) {
        window.addEventListener('scroll', function () {
            const sectionRect = section3.getBoundingClientRect();
            const sectionHeight = sectionRect.height;
            const circleHeight = timelineCircle.offsetHeight;
            const sectionMidpoint = sectionRect.height / 2 - 200;
            const scrollOffset = (window.innerHeight - sectionRect.top);

            // Calculate the maximum top value to ensure the circle doesn't go beyond the bottom of the section
            const maxTop = sectionHeight - circleHeight - 100;

            if (scrollOffset > sectionMidpoint) {
                // Ensure the circle's top position is within the bounds of the section
                const circleTop = Math.max(0, Math.min(maxTop, scrollOffset - sectionMidpoint));
                timelineCircle.style.top = `${circleTop}px`;
            } else {
                // Reset to top position if not scrolled past the midpoint
                timelineCircle.style.top = '0px';
            }

            // Clear the timeout if the user is scrolling
            window.clearTimeout(isScrolling);

            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function () {
                // Stop changing the position after the user stops scrolling
                timelineCircle.style.transition = 'top 1000ms ease-out';
            }, 100); // 100ms delay before considering the user has stopped scrolling
        });
        window.addEventListener('scroll', function () {
            // Remove transition during scrolling to make the circle move instantly
            timelineCircle.style.transition = 'none';
        });
    }

    // FOOTER FILLING 
    const footerObserverOptions = {
        threshold: .7
    };

    const footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fill');
            }
        });
    }, footerObserverOptions);

    const footer = document.querySelector('.footer');
    if (footer) {
        footerObserver.observe(footer);
    }

    const popupHTML = `
    <div id="demoPopup" class="popup">
        <div class="popup-content">
            <span class="close-btn">&times;</span>
            <h2>Book a Demo</h2>
            <p>Get expert advice on Stamp Duty Land Tax (SDLT) from our team. Choose a time that works best for you to meet with one of our specialists.</p>
            <ul>
                <li><a class="image-link" href="https://calendly.com/ben-gatford/meeting" target="_blank"><span>Book with Ben Gatford.</span></a></li>
                <li><a class="image-link" href="https://calendly.com/adamharris-capex/15min" target="_blank"><span>Book with Adam Harris.</span></a></li>
            </ul>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // POPUP FUNCTIONALITY
    const demoBtns = document.querySelectorAll('[data-demo-btn]');

    demoBtns.forEach(demoBtn => {
        demoBtn.addEventListener('click', () => {
            let demoPopup = document.getElementById("demoPopup");

            if (demoPopup) {
                // Close popup when the close button is clicked
                document.querySelector(".close-btn").addEventListener('click', () => {
                    document.getElementById("demoPopup").classList.remove('visible');
                });
            } else {
                const popupHTML = `
                <div id="demoPopup" class="popup">
                    <div class="popup-content">
                        <span class="close-btn">&times;</span>
                        <h2>Book a Demo</h2>
                        <p>Get expert advice on Stamp Duty Land Tax (SDLT) from our team. Choose a time that works best for you to meet with one of our specialists.</p>
                        <ul>
                            <li><a class="image-link" href="https://calendly.com/ben-gatford/meeting" target="_blank"><span>Book with Ben Gatford.</span></a></li>
                            <li><a class="image-link" href="https://calendly.com/adamharris-capex/15min" target="_blank"><span>Book with Adam Harris.</span></a></li>
                        </ul>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', popupHTML);
            }
            // Close popup when clicking outside of the popup content
            window.addEventListener('click', (event) => {
                if (event.target === document.getElementById("demoPopup")) {
                    document.getElementById("demoPopup").classList.remove('visible');
                }
            });

            // Show the popup
            document.getElementById("demoPopup").classList.add('visible');
        });
    });
});


