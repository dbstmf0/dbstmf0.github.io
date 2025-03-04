document.addEventListener("DOMContentLoaded",()=>{
    const txtElem = document.querySelector('.home-right');

    let words = txtElem.innerText.split(' ');
    txtElem.innerHTML = words.map(word=>`<span class='word'>${word}</span>`).join(' ');

    let wordElems = document.querySelectorAll('.word');
    let shuffledWords = [...wordElems].sort(()=>{
        return Math.random() - 0.5;
    });

    const tl = gsap.timeline();
    tl.to(shuffledWords,{
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });
});