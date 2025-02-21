document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const links = gsap.utils.toArray("#menu span a");

    // ✅ `setActive()` → active 클래스를 추가하는 함수
    const setActive = (link) => {
        links.forEach((el) => el.classList.remove("active"));
        link.classList.add("active");
    };

    // ✅ `setActiveSection()` → 섹션별 `active` 변경 가능하도록 설정
    const setActiveSection = (sectionId) => {
        const activeLink = links.find((link) => link.getAttribute("href") === sectionId);
        if (activeLink) {
            setActive(activeLink);
        }
    };

    // ✅ `resetActiveMenu()` → 모든 `active` 제거
    const resetActiveMenu = () => {
        links.forEach((el) => el.classList.remove("active"));
    };

    // ✅ `updateActiveMenu()`를 먼저 선언
    const updateActiveMenu = (list) => {
        const projectSection = document.querySelector("#Project");
        const rect = projectSection.getBoundingClientRect();

        // ✅ 현재 `#Project`가 화면 안에 있을 때만 `active` 변경
        if (rect.top >= window.innerHeight || rect.bottom <= 0) {
            return; // `#Project`가 화면을 벗어나면 실행하지 않음
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

        // ✅ `#Project`가 보일 때만 `active` 적용
        setActiveSection("#Project");
    };

    // ✅ `ScrollTrigger.matchMedia()`를 나중에 실행
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

            // ✅ `#Design`이 화면에서 보일 때 `active` 변경
            ScrollTrigger.create({
                trigger: "#Design",
                start: "top 80%",
                end: "top 70%",
                onEnter: () => {
                    resetActiveMenu();
                    setActiveSection("#Design");
                },
                onEnterBack: () => updateActiveMenu(list)
            });

            // ✅ `#Contact`이 화면에서 보일 때 `active` 변경
            ScrollTrigger.create({
                trigger: "#Contact",
                start: "top 80%",
                end: "top 70%",
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

    // ✅ 메뉴 이동 설정

    links.forEach((link) => {
        const element = document.querySelector(link.getAttribute("href"));

        ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onToggle: ({ isActive }) => {
                if (isActive) setActive(link);
            }
        });

        link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: element, autoKill: false },
                ease: "power2.out"
            });
        });
    });
});
