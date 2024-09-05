const wisdomArticles = [
    {
        img: './img/wisdom-1.png',
        title: 'A company you can trust - CapEx Associates',
        url: './capex-associates.html#',
    },
    {
        img: './img/wisdom-2.png',
        title: 'MDR update',
        url: './mdr-update.html#',
    },
    {
        img: './img/wisdom-3.png',
        title: 'SDLT for Holiday Lets',
        url: './sdlt-holiday-lets.html#',
    },
    {
        img: './img/wisdom-4.png',
        title: 'Uninhabitability relief update',
        url: './uninhabitability-relief-update.html#',
    },
    {
        img: './img/wisdom-5.png',
        title: "Chancellor's statement on 23 September",
        url: './chancellors-statement-on-23-september.html#',
    },
];

const cardsWrapper = document.querySelector('.cards-wrapper');
wisdomArticles.forEach(article => {
    if (cardsWrapper) {
        const cardHTML = `
                <div class="wisdom-card">
            <a class="image-link" href="${article.url}">
                <div class="image-container">
                    <img class="wisdom-image" src="${article.img}" alt="${article.title}">
                    <div class="overlay">
                        <span class="overlay-text">See more
                            <div class="arrow-right">
                                <img src="./img/arrow-right.png" alt="">
                            </div>
                        </span>
                    </div>
                </div>
                <h3 class="headline">${article.title}</h3>
            </a>
        </div>
    `;
        cardsWrapper.innerHTML += cardHTML;
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // Wisdom main page Transition
    const wisdomObserver = {
        threshold: 0
    };

    const wisdomSectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.wisdom-card');
                [...cards].forEach((card, index) => {
                    card.style.translate = '0 40px'
                    card.style.opacity = '1'
                    card.style.transitionDelay = index * 100 + 'ms';
                })
            }
        });
    }, wisdomObserver);

    const wisdomSection = document.querySelector('.wisdom-content');
    if (wisdomSection) {
        wisdomSectionObserver.observe(wisdomSection);
    }

    // Article main page Transition
    const articleObserver = {
        threshold: 0
    };

    const articleSectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            const articleText = articleSection.querySelector('.article-text')
            if (entry.isIntersecting) {
                [...articleText?.children].forEach((child, index) => {
                    child.style.animation = `fade-in 200ms ease-out ${index * 100}ms forwards`
                })
            }
        });
    }, articleObserver);

    const articleSection = document.querySelector('.article-content');
    if (articleSection) {
        articleSectionObserver.observe(articleSection);
    }

});
