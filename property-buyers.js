document.addEventListener("DOMContentLoaded", function () {
    // property buyers page Transition
    const articleObserver = {
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entries.forEach(entry => {
                    const headers = entry.target.querySelectorAll('.title-part')
                    if (entry.isIntersecting) {
                        headers.forEach((header) => header.classList.add('visible'))
                    } else {
                        headers.forEach((header) => header.classList.remove('visible'))
        
                    }
                });
                [...section.children].forEach((child, index) => {
                    child.style.animation = `fade-in 400ms ease-out ${index * 100}ms forwards`
                })
            }
        });
    }, articleObserver);

    const section = document.querySelector('.pb-content');
    if (section) {
        sectionObserver.observe(section);
    }

        // Glassy Effect Motions
        const glassy = document.querySelectorAll('.paragraph-section .glassy-effect');
        glassy.forEach(button => {
            button.addEventListener('mousemove', event => {
                const centerX = button.offsetWidth / 2;
                const centerY = button.offsetHeight / 2;
                const offsetX = event.offsetX - centerX;
                const offsetY = event.offsetY - centerY;
    
                button.style.setProperty('--_x-motion', `${offsetX}px`);
                button.style.setProperty('--_y-motion', `${offsetY}px`);
            });
        });
    
});
