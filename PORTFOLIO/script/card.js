document.addEventListener('DOMContentLoaded',()=>{
    const cards = document.querySelectorAll('.card');

    const settingCard = async ()=>{
        for(let i = 0; i < cards.length; i++){
            cards[i].style.transform = 'perspective(500px) rotateY(180deg)';
            await new Promise(resolve => setTimeout(resolve, 1000));

            cards[i].style.transform = 'perspective(500px) rotateY(0deg)';
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setTimeout(settingCard ,cards.length * 2000);
    };
    settingCard();
});