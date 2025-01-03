const GoogleLink = () => {
    const Icon_1 = document.querySelector('i:first-child');
    Icon_1.addEventListener('click',()=>{
        location.href = 'https://www.google.com/';
    });
}
GoogleLink();

const SlackLink = () => {
    const Icon_2 = document.querySelector('i:nth-child(2)');
    Icon_2.addEventListener('click',()=>{
        location.href = 'https://www.slack.com/';
    });
}
SlackLink();

const InstagramLink = () => {
    const Icon_3 = document.querySelector('i:last-child');
    Icon_3.addEventListener('click',()=>{
        location.href = 'https://www.instagram.com/';
    });
}

InstagramLink();
