document.addEventListener('DOMContentLoaded',()=>{
    const cards = document.querySelectorAll('.card');
    let isFlipped = false;

    setInterval(()=>{
        isFlipped = !isFlipped;

        cards.forEach((card,idx)=>{
            setTimeout(()=>{
                if(isFlipped){
                    card.style.transform = 'perspective(500px) rotateY(180deg)';
                } else{
                    card.style.transform = 'perspective(500px) rotateY(0deg)';
                }
            },idx * 500);
        });
    },4000)
});