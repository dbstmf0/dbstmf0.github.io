document.addEventListener('DOMContentLoaded',()=>{
    const navBar = document.querySelector('nav');
    const homeSection = document.querySelector('#home');
    const menuItems = document.querySelectorAll('.menu > span');
    let activeMenu = null;

    window.addEventListener('scroll',()=>{
        const homebottom = homeSection.getBoundingClientRect().bottom;

        if(homebottom <= 0){
            gsap.to(navBar,{
                position: 'fixed',
                top: 0,
                width: '90%',
                left: '50%',
                transform: 'translate(-50%)',
                duration: 0.5,
                ease: 'power2.out'
            })
        } else{
            gsap.to(navBar,{
                position: 'relative',
                width: '100%',
                left: 0,
                transform: 'none',
                duration: 0.5,
                ease: 'power2.out'
            })
        }
    });


    // menu 이동
    menuItems.forEach((menuItem)=>{
        menuItem.addEventListener('click',(e)=>{
            e.preventDefault();

            if(activeMenu){
                activeMenu.classList.remove('active');
            }
            menuItem.classList.add('active');
            activeMenu = menuItem;

            const sectionID = menuItem.textContent.toLowerCase().replace(/\s/g, '-');
            const targetSection = document.querySelector(`#${sectionID}`);

            if(targetSection){
                gsap.to(window, {duration: 1, scrollTo: targetSection});
            }
        });
    });
});


