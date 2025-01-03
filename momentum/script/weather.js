//key -> b37423804a94c4110b0067a2294c4a43
const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_KEY = 'b37423804a94c4110b0067a2294c4a43';
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    // console.log(URL);
    fetch(URL).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        console.log(data.name);
        console.log(Math.floor(data.main.temp -273.15));
        let sunrise = new Date(data.sys.sunrise*1000);
        console.log(sunrise);
    });
}
const error = () => {
    console.log('error');
}
const weather_init = () => {
    if(!navigator.geolocation){
        console.log('현재 위치를 가져올 수 없음');
    }else{
        console.log('위치 파악 중')
        navigator.geolocation.getCurrentPosition(success,error);
    }
}
weather_init();