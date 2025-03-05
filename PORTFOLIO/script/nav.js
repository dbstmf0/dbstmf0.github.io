document.addEventListener('DOMContentLoaded',()=>{
    const navBar = document.querySelector('nav');
    const homeSection = document.querySelector('#home');
    const menuItems = document.querySelectorAll('.menu > span');
    const logo = document.querySelector('.pix-logo a');
    let isNavFixd = false;

    const updateActiveMenu=(id)=>{
        menuItems.forEach(menuItem=>{
            const isMatching = menuItem.textContent.toLowerCase().replace(/\s/g, '-') === id;
            menuItem.classList.toggle('active', isMatching);
        });
    }

    window.addEventListener('scroll',()=>{
        const homebottom = homeSection.getBoundingClientRect().bottom;

        if(homebottom <= 0 && !isNavFixd){
            isNavFixd = true;
            gsap.to(navBar,{
                position: 'fixed',
                top: 0,
                width: '90%',
                left: '50%',
                transform: 'translate(-50%)',
                duration: 0.5,
                ease: 'power2.out'
            });
            updateActiveMenu('about-me');
        } else if(homebottom > 0){
            isNavFixd = false;
            gsap.to(navBar,{
                position: 'relative',
                width: '100%',
                left: 0,
                transform: 'none',
                duration: 0.5,
                ease: 'power2.out'
            })
        }
        if(homebottom > 0){
            menuItems.forEach(menuItem=>menuItem.classList.remove('active'));
        }
});

    //logo를 클릭하면 #home으로 이동
    logo.addEventListener('click',(e)=>{
        e.preventDefault();
        gsap.to(window,{
            duration: 1,
            scrollTo: homeSection,
            ease: 'power2.out',
            onComplete:()=>{menuItems.forEach(menuItem=>menuItem.classList.remove('active'))}
        });
    });

    //scroll로 menu 이동
    document.querySelectorAll('section').forEach(section=>{
        ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            end: 'bottom 50%',
            onEnter: ()=>updateActiveMenu(section.getAttribute('id')),
            onEnterBack: ()=>updateActiveMenu(section.getAttribute('id'))
        });
    });

    // menu 이동
    menuItems.forEach((menuItem)=>{
        menuItem.addEventListener('click',(e)=>{
            e.preventDefault();

            const sectionID = menuItem.textContent.toLowerCase().replace(/\s/g, '-');
            const targetSection = document.querySelector(`#${sectionID}`);

            if(targetSection){
                gsap.to(window,{
                    duration: 1,
                    scrollTo: targetSection,
                    ease: 'power2.out',
                    onComplete: ()=>updateActiveMenu(sectionID)
                });
            }
        });
    });
});


