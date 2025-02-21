document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const links = gsap.utils.toArray("#menu span a");

    //active 클래스를 추가
    const setActive = (link) => {
        links.forEach((el) => el.classList.remove("active"));
        link.classList.add("active");
    };

    //섹션별 active 변경 가능하도록 설정
    const setActiveSection = (sectionId) => {
        const activeLink = links.find((link) => link.getAttribute("href") === sectionId);
        if (activeLink) {
            setActive(activeLink);
        }
    };

    //모든 active 제거
    const resetActiveMenu = () => {
        links.forEach((el) => el.classList.remove("active"));
    };

    const updateActiveMenu = (list) => {
        const projectSection = document.querySelector("#Project");
        const rect = projectSection.getBoundingClientRect();

        //#Project가 화면 안에 있을 때만 active 변경
        if (rect.top >= window.innerHeight || rect.bottom <= 0) {
            return; //#Project가 화면을 벗어나면 실행하지 않음
        }

        let currentIndex = 0;
        let minDistance = Infinity;

        list.forEach((item, idx) => {
            const link = item.querySelector("a");
            if (!link) return;

            const rect = link.getBoundingClientRect();
            const distance = Math.abs(rect.left - window.innerWidth / 2);

            if (distance < minDistance) {
                minDistance = distance;
                currentIndex = idx;
            }
        });

        const activeLinkHref = list[currentIndex]?.querySelector("a")?.getAttribute("href");
        if (!activeLinkHref) return;

        //#Project가 보일 때만 active 적용
        setActiveSection("#Project");
    };

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
            const list = gsap.utils.toArray("#Project ul li");

            const scrollTween = gsap.to(list, {
                xPercent: -100 * (list.length - 1),
                ease: "none",
                scrollTrigger: {
                    id: "projectScroll",
                    trigger: "#Project",
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: `+=${list.length * window.innerWidth}`,
                    invalidateOnRefresh: true,
                    onUpdate: () => updateActiveMenu(list)
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
                        scrub: true
                    }
                })
                .to(txtBox, {'opacity':'0'},0)
            });

            //#Design이 화면에서 보일 때 active 변경
            ScrollTrigger.create({
                trigger: "#Design",
                start: "top 60%",
                end: "top 0%",
                onEnter: () => {
                    resetActiveMenu();
                    setActiveSection("#Design");
                },
                onEnterBack: () => {
                    updateActiveMenu(list);
                    setActiveSection("#Design");
                }
            });

            //#Contact이 화면에서 보일 때 active 변경
            ScrollTrigger.create({
                trigger: "#Contact",
                start: "top 60%",
                end: "top 0%",
                onEnter: () => {
                    resetActiveMenu();
                    setActiveSection("#Contact");
                },
                onEnterBack: () => updateActiveMenu(list)
            });

            return () => {
                scrollTween.kill();
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    });
});
