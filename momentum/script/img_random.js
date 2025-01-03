const images = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg'];

//백그라운드 이미지 변경 함수
const SetRandomBg = () => {
    const idx = Math.floor(Math.random() * images.length);
    document.body.style.backgroundImage = `url(./img/${images[idx]})`;
}
SetRandomBg();