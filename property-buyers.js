document.addEventListener("DOMContentLoaded", function () {
    // property buyers page Transition
    const articleObserver = {
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                [...section.children].forEach((child, index) => {
                    child.style.animation = `fade-in 200ms ease-out ${index * 100}ms forwards`
                })
            }
        });
    }, articleObserver);

    const section = document.querySelector('.pb-content');
    if (section) {
        sectionObserver.observe(section);
    }

});
