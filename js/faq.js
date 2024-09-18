const faqList = [
    {
        question: "What is SDLT Check?",
        answer: "SDLT Check is an innovative SDLT support platform, which provides a reliable calculation of SDLT liabilities for clients considering a purchase or re-mortgage. Clients can use our calculator for a precise indication or can be quickly and easily referred to an expert adviser for more detailed advice."
    },
    {
        question: "How does it work?",
        answer: "Our easy-to-use calculator offers an accurate calculation of SDLT, considering all relevant details of the transaction. Based on the provided information, it determines the most likely rate a client will need to pay. Both the client and their conveyancer will receive a written confirmation of the calculation and together with responses to key questions involved in determining the value. During the process, our system identifies potential reliefs or the need for further advice, ensuring the client has all the necessary information to make an informed decision and pay the right Stamp Duty."
    },
    {
        question: "Who is SDLT Check for?",
        answer: "SDLT Check has been designed primarily for solicitors and conveyancers, however it could also be used by mortgage brokers, finance brokers, estate agents and more."
    },
    {
        question: "What is my liability?",
        answer: "SDLT Check will indemnify on all calculations and SDLT advice, meaning that the solicitor or conveyancing firm carries no liability at all regarding the SDLT calculation."
    },
    {
        question: "Is this CQS compliant?",
        answer: "While SDLT Check is not required to be directly CQS Accredited, SDLT check follows the same standards of competence, risk management and client service levels to assist solicitor firms who are accredited, to comply with the standards expected to maintain accreditation."
    },
    {
        question: "Are you regulated by the FCA?",
        answer: "We are not on the FCA register, as an SDLT advisory firm we are not required to be. However, our team of qualified accountants and tax advisors are regulated by the professional bodies they are members of, and we follow the byelaws, regulations and ethical guidelines of The Chartered Institute of Taxation."
    },
    {
        question: "What is the cost for us to use the service?",
        answer: "At present there is no cost attached to SDLT Check's calculation service."
    },
    {
        question: "Will this save me time?",
        answer: "Yes, absolutely. Solicitors and conveyancers can spend anywhere between 15 mins and several hours dealing with SDLT, including the calculation, clarifying responses to questions answered by clients, and sourcing answers to questions from relevant professionals. SDLT Check will take care of all of these elements, saving a huge amount of time."
    },
    {
        question: "Will it identify tax relief?",
        answer: "SDLT Check identifies all potential reliefs and identifies and acquires all relevant information in order to ensure that clients pay the right SDLT."
    },
    {
        question: "Why should I use SDLT check/benefits?",
        answer: "SDLT Check reduces time, eliminates liability and ensures buyers pay the right Stamp Duty."
    },
    {
        question: "How is my account managed?",
        answer: "You will have your own account manager to ensure seamless communication with the SDLT Check team, and the best service to your clients."
    },
    {
        question: "How do I access customer support?",
        answer: "The firm will have its own account manager who will respond within 24 hours to all queries. There is also live chat, and a direct number to the office should you have an urgent enquiry."
    },
    {
        question: "How long does it take to use the system?",
        answer: "Almost no time at all! The buyer completes our questionnaire directly, and all relevant information is collated by SDLT Check. Once we have confirmed the correct SDLT, our system will provide the calculation direct to your inbox."
    },
    {
        question: "Why not just use HMRC's own calculator?",
        answer: "HMRC provides three calculators, which they acknowledge are only meant as a general guide. By their own admission they do not take into account all of the nuances related to the transaction. Their website does not direct you to the appropriate calculator for your specific transaction or provide clear advice when there are complications. This oversight means you might miss several important variables that could impact the calculation, including those that could qualify for exemptions and reliefs. In contrast, SDLT Check is specifically designed to consider all relevant factors and alert clients when they should seek specialist advice."
    },
    {
        question: "What if the SDLT calculation is wrong?",
        answer: "The system has been designed to provide 100% accuracy, however we understand there could potentially be situations which result in an incorrect calculation. This will most likely be due to receiving incorrect or false information from the client, however, the system has been designed to minimize this risk. If all the provided information from the client is deemed to be accurate, and they have followed our detailed advice but it turns out to be incorrect, the responsibility would lie with SDLT Check, a firm of Tax Advisers and Chartered Accountants with many years of experience and comprehensive PI coverage. This would be addressed directly with the client to ensure a good relationship is maintained, and remove any risk of penalties from HMRC, the FOS or other regulators."
    }
];

document.addEventListener("DOMContentLoaded", function () {

    const faqWrapper = document.getElementById('faq-wrapper');

    faqList.forEach((faq, i) => {
        if (faqWrapper) {
            const faqHTML = `
                <div class="faq-section ${i === 0 ? 'no-border' : ''}">
                    <div class="title-part">
                        <h3 class="question">${faq.question}</h3>
                        <button class="expand-btn ${i === 0 ? 'rotate' : ''}">
                            <img class="expand-btn-svg" src="./img/arrow-up.svg" alt="See Answer">
                        </button>
                    </div>
                    <div class="answer ${i === 0 ? 'open' : ''}" style="display: ${i === 0 ? 'block' : 'none'}">
                        <div class="glassy-effect">
                            <span>
                                <p>${faq.answer}</p>
                            </span>
                        </div>
                    </div>
                </div>
            `;
            faqWrapper.innerHTML += faqHTML;
        }
    });


    // FAQ page Transition
    const articleObserver = {
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const headers = entry.target.querySelectorAll('.faq-section');
                [...section.children, ...headers].forEach((child, index) => {
                    child.style.animation = `fade-in 400ms ease-out ${index * 75}ms forwards`
                })
            }
        });
    }, articleObserver);

    const section = document.querySelector('.faq-content');
    if (section) {
        sectionObserver.observe(section);
    }

    // Glassy Effect Motions
    const glassy = document.querySelectorAll('.faq-section .glassy-effect');
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


    document.querySelectorAll('.title-part').forEach(title => {
        let isAnimating = false; // Flag to track if an animation is in progress

        title.addEventListener('click', () => {
            if (isAnimating) return; // Exit if an animation is currently in progress

            isAnimating = true; // Set the flag to indicate animation is starting
            const section = title.closest('.faq-section');
            const answer = section.querySelector('.answer');
            const btnSvg = section.querySelector('.expand-btn');

            const currentDisplay = window.getComputedStyle(answer, null).display;
            if (currentDisplay === 'none') {
                answer.style.display = 'block';
            }

            // First timeout to handle answer visibility toggle
            setTimeout(() => {
                if (currentDisplay === 'block') {
                    answer.style.display = 'none';
                }
            }, 300);

            // Second timeout to toggle classes
            setTimeout(() => {
                section.classList.toggle('no-border');
                answer.classList.toggle('open');
            }, 10);

            // Third timeout to toggle button rotation
            setTimeout(() => {
                btnSvg.classList.toggle('rotate');
                isAnimating = false; // Reset the flag to allow future clicks
            }, 300);
        });
    });

});
