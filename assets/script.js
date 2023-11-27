const sliders = {
    captive: 0,
    food: 0,
    game: 0,
    resume: 0,
    portfolio: 0
};
let scrollPosition = [0, 0];
let counter = {
    captive: 0,
    food: 0,
    game: 0,
    resume: 0,
    portfolio: 0
};
let counting = true;

jQuery(function () {
    Object.keys(sliders).forEach((key) => imageSlider(key).setBackground());

    $(document).ready(() => $(window).scrollTop(0));
    $(window).on('beforeunload', () => $(window).scrollTop(0));

    Object.keys(sliders).forEach((key) => {
        $('body').on('click', '.' + key + ' .img-slider-btn', function (event) {
            if ($(this).hasClass('right')) imageSlider(key).right();
            if ($(this).hasClass('left')) imageSlider(key).left();
        });
        $('body').on('click', '.' + key + ' .img-slider-content', (event) => imageSlider(key).zoom());
        $('.' + key + ' .img-slider').on('touchstart', (e) => startX = e.originalEvent.touches[0].pageX);
        $('.' + key + ' .img-slider').on('touchmove', (e) => {
            const startX = $(this).data('startX');
            const startY = $(this).data('startY');
            const moveX = e.originalEvent.touches[0].pageX;
            const moveY = e.originalEvent.touches[0].pageY;
            const distanceX = Math.abs(moveX - startX);
            const distanceY = Math.abs(moveY - startY);

            if (distanceX > distanceY) e.preventDefault();
        });
        $('.' + key + ' .img-slider').on('touchend', function (e) {
            endX = e.originalEvent.changedTouches[0].pageX;
            let distanceX = endX - startX;
            if (Math.abs(distanceX) > 50) {
                if (distanceX > 10) imageSlider(key).left();
                else if (distanceX < 10) imageSlider(key).right();
            }
        });
    });


    $('.container-overlay').on('click', (event) => {
        $('body').removeClass('overlay');
        $('*').css('scroll-behavior', 'auto');
        window.scrollTo({ top: scrollPosition, behavior: 'auto' });
        $('*').css('scroll-behavior', '');
        counting = true;
    });

    const closeModal = () => {
        ['overlay', 'resume', 'contact'].forEach((item) => {
            $('.modal-' + item + '').addClass('hidden');
        });
    };
    $('.modal-overlay').on('click', (event) => ($(event.target).hasClass('modal-overlay') || $(event.target).hasClass('btn')) && closeModal());
    $('.modal-overlay .btn-close').on('click', (event) => closeModal());

    $('.front-page .my-resume').on('click', (event) => {
        $('.modal-overlay').removeClass('hidden');
        $('.modal-overlay .modal-resume').removeClass('hidden');
    });

    $('.front-page .my-contact').on('click', (event) => {
        $('.modal-overlay').removeClass('hidden');
        $('.modal-overlay .modal-contact').removeClass('hidden');
    });


    window.onscroll = function (e) {
        if (this.oldScroll > this.scrollY) { //scrolling up
            if (this.scrollY == 0) {
                $('.show-hint').removeClass('show-hint');
                $('.hide-hint').removeClass('hide-hint');
                $('.ph.scroll-up').addClass('hide-hint');
                $('.ph.scroll-down').addClass('show-hint');
                $('.page-hint').addClass('move-udi');
                $('.page-hint').removeClass('move-sticky');
            }
        } else { //scrolling down
            $('.show-hint').removeClass('show-hint');
            $('.hide-hint').removeClass('hide-hint');
            $('.page-hint').removeClass('move-udi');
            $('.page-hint').addClass('move-sticky');
            $('.ph.scroll-up').addClass('show-hint');
            $('.ph.scroll-down').addClass('hide-hint');
        }
        this.oldScroll = this.scrollY;
    };
});

setInterval(() => {
    if (counting) {
        Object.keys(counter).forEach((key) => {
            counter[key]++;
            if (counter[key] >= 6) {
                counter[key] = 0;
                imageSlider(key).right();
            }
        });
    }
}, 1000);

imageSlider = (target) => {
    const parent = $('.' + target + ' .img-slider-content');
    const source = $('.' + target + ' .img-slider-content .slides img');
    const destination = $('.' + target + ' .img-slider-content .slides');
    const scrollLimit = (source.length - 1);

    const right = () => {
        sliders[target] += 1;
        if (sliders[target] > scrollLimit) {
            destination.scrollLeft(0);
            sliders[target] = 0;
        }
        else destination.scrollLeft(parent.width() * sliders[target]);
        update();
    };

    const left = () => {
        sliders[target] -= 1;
        if (sliders[target] < 0) {
            destination.scrollLeft(parent.width() * scrollLimit);
            sliders[target] = scrollLimit;
        }
        else destination.scrollLeft(parent.width() * sliders[target]);
        update();
    };

    const zoom = () => {
        counting = false;
        const imgURL = source.eq(sliders[target]).attr('src');
        scrollPosition = window.scrollY || window.pageYOffset;
        $('body').addClass('overlay');
        $('.container-overlay').css('background-image', 'url(' + imgURL + ')');
    };

    const setBackground = () => {
        const imgURL = source.eq(sliders[target]).attr('src');
        const background = $('.' + target + ' .img-slider-content .background');
        background.css('background-image', 'url(' + imgURL + ')');
    };

    const update = () => {
        counter[target] = 0;
        setBackground();
    };

    return { right, left, zoom, setBackground };
};

const texts = {
    name: 'Eduardo Aboga Jr',
    role: 'Front End Developer',
    hint: {
        scroll_down: 'scroll down to view my projects',
        scroll_top: 'click to go back to top',
        zoom: 'Click / Touch again to zoom out'
    },
    visit: 'Visit',
    code: 'Code',
    icons: {
        chevron_left: 'fa-solid fa-chevron-left',
        chevron_right: 'fa-solid fa-chevron-right',
        close: 'fa-solid fa-close',
        arrow_up: 'fa-solid fa-circle-arrow-up',
        mouse: 'fa-solid fa-computer-mouse',
        code: 'fa-solid fa-code',
        eye: 'fa-solid fa-eye',
        file: 'fa-solid fa-file'
    },
    modal: {
        resume: {
            header: 'Format',
            list: [
                {
                    name: 'PDF',
                    url: './assets/resume.pdf',
                },
                {
                    name: 'Web Page',
                    url: './assets/resume/',
                }
            ],
        },
        contact: {
            header: 'Email Address',
            address: 'edabogajr@gmail.com'
        }
    },
    options: {
        projects: {
            name: 'Projects',
            icon: 'fa-solid fa-helmet-safety',
            url: '#works'
        },
        github: {
            name: 'Github',
            icon: 'fa-brands fa-github',
            url: 'https://github.com/edxen',
            target: '_blank'
        },
        resume: {
            name: 'Resume',
            icon: 'fa-solid fa-file-lines'
        },
        contact: {
            name: 'Contact',
            icon: 'fa-solid fa-address-card'
        },
    },
    projects: [
        {
            title: 'Captive Portal Templates',
            ref: 'captive',
            count: 11,
            list: [
                'Collection of some of the Captive Portals I developed and maintained from my time with Intertouch.',
                'For the Captive Portal Demo, I used HTML5, React JS and Tailwind CSS.'
            ],
            url: {
                visit: 'https://edxen.github.io/captive_portal',
                target: '_blank',
                code: 'https://github.com/edxen/captive_portal'
            },
            stack: 'HTML5, CSS3, Bootstrap 4/5, jQuery, Handlebars'
        },
        {
            title: 'Food Management App',
            ref: 'food',
            count: 6,
            list: [
                'Food app that allows user to order food, the kitchen is also able to receive the order and update status, also have the option to edit displayed menu.',
                'Project I did for exploring React JS.'
            ],
            stack: 'HTML5, CSS3, Bootstrap 5.x, React JS'
        },
        {
            title: 'Untitle Life RPG',
            ref: 'game',
            count: 6,
            list: [
                'Live in the city, study, find a job and get at the top, hopefully.',
                "It's a solo indie game project i'm doing whenever I have free time."
            ],
            stack: 'HTML5 Canvas, CSS3, Javascript Vanilla, Pixel Art'
        },
        {
            title: 'Web Resume',
            ref: 'resume',
            count: 1,
            list: [
                'Instead of the normal Word or PDF resume format, I opted for a responsive web version because why not.'
            ],
            url: {
                visit: 'https://edxen.github.io/portfolio/assets/resume',
                target: '_blank',
                code: 'https://github.com/edxen/portfolio/tree/main/assets/resume'
            },
            stack: 'HTML5, Tailwind CSS, Handlebars'
        },
        {
            title: 'This Portfolio',
            ref: 'portfolio',
            count: 2,
            list: [
                'This portfolio. Presents my projects with a minimalist design approach.',
                'Developed my own version of bootstrap carousel to display images, click to zoom, auto slides at set interval, click to slide and swipe to slide (for mobile devices).',
                'Also, Mobile friendly.'
            ],
            url: {
                visit: '#top',
                target: '',
                code: 'https://github.com/edxen/portfolio'
            },
            stack: 'HTML5, CSS3, Flexbox, jQuery, Handlebars'
        },
    ]
};

Handlebars.registerHelper('toLowerCase', (str) => str.toLowerCase());

Handlebars.registerHelper('isTrue', (a, b) => a === b);

Handlebars.registerHelper('times', function (n, block) {
    let accum = '';
    for (let i = 0; i < n; i++) accum += block.fn(i + 1);
    return accum;
});

const partials = document.querySelectorAll('script[type="text/x-handlebars-partial"]');
partials.forEach((partial) => Handlebars.registerPartial(partial.id.toString().replace('-partial', ''), partial.innerHTML));
const source = document.querySelector('#main-template').innerHTML;
const destination = document.querySelector('#root');
destination.innerHTML = Handlebars.compile(source)(texts);