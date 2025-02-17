document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const page01 = gsap.timeline();
    page01.to(".title h2", {x: 0, opacity: 1, duration: 1.5, ease: "power3.out"})
          .to(".title h1", {x: 0, opacity: 1, duration: 1.5, ease: "power3.out"})
          .to(".title h2, .title h1",{color: "rgba(46, 88, 118, 0.2)", duration: 2, ease: "power3.out"})
          .to(".sub-title p",{opacity: 1, duration: 1.5, ease: "power3.out"})
});
