document.addEventListener("DOMContentLoaded",()=>{
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    ScrollTrigger.matchMedia({
        '(min-width: 1024px)': ()=>{
            //가로스크롤
            const list = gsap.utils.toArray('#Project ul li');
            const scrollTween = gsap.to(list, {
                xPercent: -100 * (list.length -1),
                ease: 'none',
                scrollTrigger: {
                    id: 'projectScroll',
                    trigger: '#Project',
                    pin: true,
                    scrub: 1,
                    start: 'center center',
                    end: `+=${list.length * window.innerWidth}`,
                    invalidateOnRefresh: true,
                    onUpdate: ()=>updateActiveMenu(list)
                }
            });

            // img-box 모션
            gsap.utils.toArray('.img-box').forEach((imgBox)=>{
                //img-box가 커지는 애니이션 - 오른쪽 -> 중앙에서 끝
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,
                        start: 'center right',
                        end: 'center center',
                        scrub: true
                    }
                })
                .to(imgBox, {'clip-path':'inset(0%)', ease:'none', duration:1},0)

                //img-box가 작아지는 애니이션 - 중앙 -> 왼쪽에서 끝
                gsap.timeline({
                    scrollTrigger: {
                        trigger: imgBox,
                        containerAnimation: scrollTween,
                        start: 'center center',
                        end: 'center left',
                        scrub: true,
                    }
                })
                .to(imgBox, {'clip-path':'inset(30%)', ease:'none', duration:1},0)
            });

            // txt-box 모션
            gsap.utils.toArray('.txt-box').forEach((txtBox)=>{
                //txt-box가 커지는 애니이션 - 오른쪽 -> 중앙에서 끝
                gsap.timeline({
                    scrollTrigger: {
                        trigger: txtBox,
                        containerAnimation: scrollTween,
                        start: 'center 70%',
                        end: 'center 40%',
                        scrub: true
                    }
                })
                .to(txtBox, {'opacity':'1', 'x':-100},0)

                //txt-box가 작아지는 애니이션 - 중앙 -> 왼쪽에서 끝
                gsap.timeline({
                    scrollTrigger: {
                        trigger: txtBox,
                        containerAnimation: scrollTween,
                        start: 'center 30%',
                        end: 'center 20%',
                        scrub: true,
                    }
                })
                .to(txtBox, {'opacity':'0'},0)
            });
            return () => {
                scrollTween.kill();
                ScrollTrigger.getAll().forEach((trigger)=>{trigger.kill();});
            }
        }
    });
    const updateActiveMenu=(list)=>{
        let currentIndex = 0;
        let minDistance = Infinity;

        list.forEach((item,idx)=>{
            const link = item.querySelector('a');
            if(!link) return;

            const rect = item.getBoundingClientRect();
            const distance = Math.abs(rect.left - window.innerWidth / 2);

            if(distance < minDistance){
                minDistance = distance;
                currentIndex = idx;
            }
        });
        const activeLinkHref = list[currentIndex]?.querySelector('a')?.getAttribute('href');
        if(!activeLinkHref) return;
        
        const activeLink = links.find((link)=>{
            return link.getAttribute('href') === activeLinkHref
        });

        if(activeLink) setActive(activeLink);
    }
});