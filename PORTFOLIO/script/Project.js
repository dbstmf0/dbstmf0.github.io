const product = [
    {
    id: 1,
    name: "Protfolio Website",
    detail:"GSAP의 ScrollTrigger를 사용하여 사용자에게 흥미를 주는 레이아웃을 구성하고, 메뉴를 고정하여 편리한 탐색이 가능하도록 제작하였습니다. 또한, Flexbox를 활용해 보다 깔끔하고 정돈된 디자인을 구현하여, 시각적인 완성도와 사용자 편의성을 함께 고려하였습니다.",
    date: "제작 소요 기간 : 7일",
    participation: "참여율 : 100%",
    distribution: "배포방식 : GitHub",
    skills: ["#HTML","#CSS","#ES6","#GSAP","ScrollTrigger","#Flex","#Google Font","#Figma"],
    img: './images/tom6.jfif',
    url: 'https://dbstmf0.github.io/PORTFOLIO/index.html'
    },
    {
    id: 2,
    name: "Netflix Clone Website",
    detail:"Netflix의 메인 페이지와 로그인 페이지를 React로 구현했으며,UI/UX 설계와 비동기 데이터 처리에 중점을 두었습니다. 또한, Flexbox를 활용해 보다 깔끔하고 직관적인 레이아웃을 완성했습니다.",
    date: "제작 소요 기간 : 2일",
    participation: "참여율 : 100%",
    distribution: "배포방식 : GitHub",
    skills: ["#React","#React Router","#react-slick","#TMdb API","#SCSS","#Axios","#Figma"],
    img: './images/netflix-img.svg',
    url: 'https://dbstmf0.github.io/netflix_clone/'
    },
    {
    id: 3,
    name: "Momentum Clone Website",
    detail:"사용자가 현재 시간과 날짜를 확인할 수 있으며, 할 일 목록 기능을 제공합니다. 또한, 아이콘을 클릭하면 원하는 사이트로 바로 이동할 수 있도록 링크를 연결했습니다. 로컬 스토리지를 활용해 데이터를 저장하고, 사용자 맞춤형 기능을 지원하도록 개발하였습니다.",
    date: "제작 소요 기간 : 2일",
    participation: "참여율 : 100%",
    distribution: "배포방식 : GitHub",
    skills: ["#HTML", "#CSS", "#ES6", "#LocalStorage", "#Position", "#Figma"],
    img: './images/momentum-img.svg',
    url: 'https://dbstmf0.github.io/momentum/index.html'
    },
    {
    id: 4,
    name: "Tesla Clone Website",
    detail:"Tesla 웹사이트의 레이아웃과 애니메이션을 반영하여 반응형으로 제작하였습니다. 웹 표준 및 접근성 준수를 중심으로 개발하였습니다.",
    date: "제작 소요 기간 : 2일",
    participation: "참여율 : 100%",
    distribution: "배포방식 : GitHub",
    skills: ["#HTML", "#CSS", "#Flex", "#Figma"],
    img: './images/tesla-img.svg',
    url: 'https://dbstmf0.github.io/TESLA/index.html'
    },
    {
    id: 5,
    name: "anillO Clone Website",
    detail:"anillO 웹사이트의 레이아웃을 재구성하여 제작하고, 각 이미지에 어울리는 컬러로 마크를 커스텀했습니다. 또한, Grid를 활용해 깔끔하고 정돈된 디자인을 완성하며 가독성과 전체적인 완성도를 더욱 높였습니다.",
    date: "제작 소요 기간 : 2일",
    participation: "참여율 : 100%",
    distribution: "배포방식 : GitHub",
    skills: ["#HTML", "#CSS", "#Grid", "#Flex", "#Google Font", "#Figma"],
    img: './images/anillO-img.svg',
    url: 'https://dbstmf0.github.io/anillo/index.html'
    },
];

document.addEventListener('DOMContentLoaded',()=>{
    const numberItems = document.querySelectorAll('.number li');
    const Img = document.querySelector('.project-img img');
    const UrlElem = document.querySelector('.site > button');
    const Title = document.querySelector('.project-txt-wrap h2');
    const Detail = document.querySelector('.project-txt-wrap p:nth-of-type(1)');
    const Date = document.querySelector('.project-txt-wrap p:nth-of-type(2)');
    const Participation = document.querySelector('.project-txt-wrap p:nth-of-type(3)');
    const Distribution = document.querySelector('.project-txt-wrap p:nth-of-type(4)');
    const Skills = document.querySelector('.project-txt-wrap > .skll-wrap');

    let currentIndex = 0;
    let interval;
    let selectedProject = null;

    const updateProject = ((idx)=>{
        selectedProject = product.find((p)=>p.id === idx +1);
        if(!selectedProject) return;

        const {img,name,detail,date,participation,skills,distribution} = selectedProject;

        Img.src = img;
        Title.textContent = name;
        Detail.textContent = detail;
        Date.textContent = date;
        Participation.textContent = participation;
        Distribution.textContent = distribution;

        Skills.innerHTML = '';
        skills.forEach((skill)=>{
            const skillTag = document.createElement('p');
            skillTag.textContent = skill;
            skillTag.classList.add('skill-btn');
            Skills.appendChild(skillTag);
        });

        numberItems.forEach((el)=>{
            el.classList.remove('toggle')});
            numberItems[idx].classList.add('toggle');
        });

        const Auto=()=>{
            interval = setInterval(()=>{
                currentIndex = (currentIndex + 1) % numberItems.length;
                updateProject(currentIndex);
            },4000);
        };
        updateProject(currentIndex);
        Auto();

        numberItems.forEach((item,idx)=>{
            item.addEventListener('click',()=>{
                currentIndex = idx;
                updateProject(currentIndex);
            });
        });

        UrlElem.addEventListener('click',(e)=>{
            e.preventDefault();
            if(selectedProject && selectedProject.url){
                window.open(selectedProject.url, '_blank');
            }
        });
});