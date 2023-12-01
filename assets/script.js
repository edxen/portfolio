let scrollPosition = [0, 0];
let counting = true;
const sliders = {};
const counter = {};

fetch('./assets/data.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        start(data);
    })
    .catch(error => {
        console.error('Error fetching or processing the JSON file:', error);
    });

const start = (data) => {
    setHandlebars(data);

    data.projects.forEach((project) => {
        sliders[project.ref] = 0;
        counter[project.ref] = 0;
    });

    setImageSliderEvents();
    setModalEvents();
};

jQuery(function () {
    $(document).ready(() => $(window).scrollTop(0));

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

Handlebars.registerHelper('toLowerCase', (str) => str.toLowerCase());

Handlebars.registerHelper('concat', function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    return args.join('');
});


Handlebars.registerHelper('isTrue', (a, b) => a === b);

Handlebars.registerHelper('times', function (n, block) {
    let accum = '';
    for (let i = 0; i < n; i++) accum += block.fn(i + 1);
    return accum;
});

const setImageSliderEvents = () => {
    Object.keys(sliders).forEach((key) => {
        imageSlider(key).setBackground();

        $('.' + key + ' .img-slider-btn').on('click', function (event) {
            if ($(this).hasClass('right')) imageSlider(key).right();
            if ($(this).hasClass('left')) imageSlider(key).left();
        });
        $('.' + key + ' .img-slider-content').on('click', (event) => imageSlider(key).zoom());

        const imgSlider = document.querySelector('.' + key + ' .img-slider');
        imgSlider.addEventListener('touchstart', (e) => startX = e.originalEvent.touches[0].pageX, { passive: true });
        imgSlider.addEventListener('touchmove', (e) => {
            const startX = $(this).data('startX');
            const startY = $(this).data('startY');
            const moveX = e.originalEvent.touches[0].pageX;
            const moveY = e.originalEvent.touches[0].pageY;
            const distanceX = Math.abs(moveX - startX);
            const distanceY = Math.abs(moveY - startY);
            if (distanceX > distanceY) e.preventDefault();
        }, { passive: false });
        imgSlider.addEventListener('touchend', function (e) {
            endX = e.originalEvent.changedTouches[0].pageX;
            let distanceX = endX - startX;
            if (Math.abs(distanceX) > 50) {
                if (distanceX > 10) imageSlider(key).left();
                else if (distanceX < 10) imageSlider(key).right();
            }
        }, { passive: true });
    });

    $('.container-overlay').on('click', (event) => {
        $('body').removeClass('overlay');
        $('*').css('scroll-behavior', 'auto');
        window.scrollTo({ top: scrollPosition, behavior: 'auto' });
        $('*').css('scroll-behavior', '');
        counting = true;
    });
};

const setModalEvents = () => {
    const modalRef = ['resume', 'contact'];

    const closeModal = () => {
        ['overlay', ...modalRef].forEach((item) => {
            $('.modal-' + item + '').addClass('hidden');
        });
    };
    $('.modal-overlay').on('click', (event) => ($(event.target).hasClass('modal-overlay') || $(event.target).hasClass('btn')) && closeModal());
    $('.modal-overlay .btn-close').on('click', (event) => closeModal());

    modalRef.forEach((key) => {
        $('.front-page .my-' + key).on('click', (event) => {
            $('.modal-overlay').removeClass('hidden');
            $('.modal-overlay .modal-' + key).removeClass('hidden');
        });
    });
};

const setHandlebars = (data) => {
    const partials = document.querySelectorAll('script[type="text/x-handlebars-partial"]');
    partials.forEach((partial) => Handlebars.registerPartial(partial.id.toString().replace('-partial', ''), partial.innerHTML));
    const source = document.querySelector('#main-template').innerHTML;
    const destination = document.querySelector('#root');
    destination.innerHTML = Handlebars.compile(source)(data);
};
