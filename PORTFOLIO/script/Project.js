import { product } from "./product.js";

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