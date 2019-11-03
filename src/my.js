let slides = document.querySelectorAll('.slide');
let current = null;
let next = null;
let prev = null;
let animation = false;
let slideWidth = 100;  //задаем такой же размер контейнера как и в css 
let units = "%"; //так же задаем единицы измерения

let getTimeOfAnimation = (el) => {
    let res = (window.getComputedStyle(slides[0]).transition).match(/\.\d+s/)
    let time = 0;
    if (res) {
        time = Number.parseInt(res[0].match(/\d/))
        return time * 100;
    } else {
        res = (window.getComputedStyle(slides[0]).transition).match(/\d+s/)
        time = Number.parseInt(res[0].match(/\d/))
        return time * 1000;
    }
}
let animationTimes = getTimeOfAnimation(slides[0]);

let setNextSlide = (index, slides) => {
    if (index + 1 < slides.length) {
        next = slides[index + 1];
    } else {
        next = slides[0];
    }
}
let setPrevSlide = (index, slides) => {
    if (index - 1 < 0) {
        prev = slides[slides.length - 1];
    } else {
        prev = slides[index - 1];
    }
}



let prepareElems = (slides) => {

    for (let index = 0; index < slides.length; index++) {
        const el = slides[index];
        if (el.classList.contains('active')) {
            current = el;
            setNextSlide(index, slides);
            setPrevSlide(index, slides);
            break;
        }

    }
    prev.style = `left:-${slideWidth + units}; display:inline-block;`;
    current.style = `left:${0 + units}; display:inline-block;`;
    next.style = `left:${slideWidth + units}; display:inline-block;`;
}
prepareElems(slides);


let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');

btnNext.addEventListener('click', function () {
    startAnimation('next');
})

btnPrev.addEventListener('click', function () {
    startAnimation('prev');
})

let startAnimation = (way) => {
    if (animation) return;
    animation = true;

    if (way === 'next') {
        prev.style.left = -2 * slideWidth + units;
        current.style.left = -slideWidth + units;
        next.style.left = 0 + units;

        setTimeout(function () {
            current.classList.remove('active');
            current.style.display = 'none';
            prev.style.display = 'none';
            next.classList.add('active');
            prepareElems(slides);
            animation = false;
        }, animationTimes)

    } else {
        prev.style.left = 0 + units;
        current.style.left = slideWidth + units;
        next.style.left = 2 * slideWidth + units;

        setTimeout(function () {
            current.classList.remove('active');
            current.style.display = 'none';
            next.style.display = 'none';
            prev.classList.add('active');
            prepareElems(slides);
            animation = false;
        }, animationTimes)

    }

}