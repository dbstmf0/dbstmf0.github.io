const ClockElem = document.querySelector('.clock');
const Today = document.querySelector('h3');

const getToday = () => {
    const today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth()+1;
    let dd = today.getDate();
    Today.textContent = `${yy}/${mm}/${dd}`;
}
const getClock = () => {
    //시계 설정
    const today = new Date(); //현재 시간
    //시,분,초 가져오기
    //class = clock인 객체의 텍스트를 변경
    //주요 : 시,분,초는 두자리씩
    let Hours = String(today.getHours()).padStart(2,0);
    let Minute = String(today.getMinutes()).padStart(2,0);
    ClockElem.textContent = `${Hours}:${Minute}`
}
getToday();
getClock();
setInterval(getClock,1000);