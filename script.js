// Smooth Scrolling

const scrollContainer = document.querySelector("#main");
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
});

// 🔁 Ensure ScrollTrigger updates on Locomotive scroll
scroll.on("scroll", ScrollTrigger.update);

// Refresh ScrollTrigger after Locomotive has set everything up
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

let timeout;
let secondTimeOut;
// custom cursor
function customCursor(xScale, yScale) {
    window.addEventListener('mousemove', function (details) {
        document.querySelector('#mini_circle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xScale}, ${yScale})`
    })
}

// custom cursor animation
function customCursorAnimation() {

    let xScale = 1;
    let yScale = 1;

    let prevXPosition = 0;
    let prevYPosition = 0;
    window.addEventListener('mousemove', function (details) {
        clearTimeout(timeout)

        xScale = gsap.utils.clamp(0.8, 1.2, details.clientX - prevXPosition);
        yScale = gsap.utils.clamp(0.8, 1.2, details.clientY - prevYPosition);

        prevXPosition = details.clientX;
        prevYPosition = details.clientY;

        customCursor(xScale, yScale);

         timeout = setTimeout(function () {
            document.querySelector('#mini_circle').style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`
        }, 100)
    })
}

// home section animation
function firstSectionAnimation() {
    let t1 = gsap.timeline();
    t1.from('#nav', {
        y: '-10',
        duration: 1.5,
        opacity: 0,
        ease: Expo.easeInOut
    })
    t1.to('.text_animation', {
        y: '0',
        duration: 2,
        delay: -1,
        stagger: 0.2,
        ease: Expo.easeInOut
    })
    t1.from('#footer', {
        y: '-10',
        duration: 1.5,
        opacity: 0,
        delay: -1,
        ease: Expo.easeInOut
    })
}

//second section animation
document.querySelectorAll('.elem').forEach(function (elem) {
    let rotateInXAxis = 0
    let prevXValue = 0;

    elem.addEventListener('mouseleave', function () {
        gsap.to(elem.querySelector('.img'), {
            opacity: 0,
            ease: Power3,
        })
    })

    elem.addEventListener('mousemove', function (details) {
        clearTimeout(secondTimeOut);
        let diffTop = details.clientY - elem.getBoundingClientRect().top;
        let diffLeft = details.clientX - elem.getBoundingClientRect().left;
        const imgWidth = elem.querySelector('.img').offsetWidth;
        const imgHeight = elem.querySelector('.img').offsetHeight;
        rotateInXAxis = gsap.utils.clamp(-20, 20, details.clientX - prevXValue);
        prevXValue = details.clientX;
        gsap.to(elem.querySelector('.img'), {
            opacity: 1,
            rotate: rotateInXAxis,
            x: diffLeft - imgWidth / 2,
            y: diffTop - imgHeight / 2,
            ease: Power3
        })
       secondTimeOut =  setTimeout(function () {
           gsap.to(elem.querySelector('.img'), {
               rotate: 0,
               ease: Power1
           })
        }, 100)
    })
})

// Third section animation
function animationOnThirdSection() {
    gsap.to("#logoStrip", {
        xPercent: -50, // Move left by 50% of its own width
        duration: 30,
        repeat: -1,
        ease: "none",
        // modifiers: {
        //     xPercent: gsap.utils.wrap(-50, 0)
        // }
    });
}

// About section animation
function animationOnAboutSection() {
    gsap.from('#about_section', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#content',
            start: '90% top',
            scroller: '#main'
        }
    })
}
// Subscribe section animation
function animationOnSubscribeSection() {
    gsap.from('#subscribe', {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#companies_logo',
            start: 'center top',
            scroller: '#main'
        }
    })
}


customCursor();
customCursorAnimation();
firstSectionAnimation();
animationOnThirdSection();
animationOnAboutSection();
animationOnSubscribeSection();