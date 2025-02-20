document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.timeline()
        .to(".title h2, .title h1", {opacity: 1, duration: 1.5, ease: "power3.out"})
        .to(".title h2, .title h1",{color: "rgba(46, 88, 118, 0.2)", duration: 2, ease: "power3.out"})
        .to("#menu, .home-icon, .sub-title",{opacity: 1, duration: 1, ease: "power3.out"})
});

// menu 이동
const links = gsap.utils.toArray('#menu span a');

links.forEach((link)=>{
    const element = document.querySelector(link.getAttribute('href'));

    ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onToggle: ({isActive}) => {
            if (isActive) setActive(link);
        }
    });
    link.addEventListener('click', (e)=>{
        e.preventDefault();
        if(element.id === 'Project'){
            gsap.to(window, {
                duration: 1,
                scrollTo: {y: '#Project', autoKill: false},
                ease: "power2.out",
                onComplete: ()=>{
                    ScrollTrigger.getById('projectScroll').enable();
                }
            });
        }else{
            gsap.to(window, {
                duration: 1,
                scrollTo: {y: element, autoKill: false},
                ease: "power2.out"
            });
        }
    });
});

const setActive=(link)=>{
    links.forEach((el)=>{
        el.classList.remove('active');
});
    link.classList.add('active');
};