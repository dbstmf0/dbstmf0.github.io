const LonginForm = document.querySelector('#loginForm');
const InputElem1 = document.querySelector('#loginForm > input');
const Ptxt = document.querySelector('p');
const Logout = document.querySelector('.logout');
const TodoFormElem = document.querySelector('#todoForm');
const InputElem2 = document.querySelector('#todoForm > input');
const TodoListElem = document.querySelector('#todoList');

const LoginKey = 'loginname';
//localStorage에 값 저장
const SaveLoginName = (strInput) => {
    localStorage.setItem(LoginKey,strInput); 
}
//localStorge에서 key값 가지고 오기
const LoadLoginName = () => {
    return localStorage.getItem(LoginKey);
}
//로그인
const PrintLoginName = (strName) => {
    Ptxt.textContent = `Hello ${strName} 님`;
    Ptxt.classList.remove('hidden');      //P태그 보이기
    Logout.classList.remove('hidden');    //logoutbtn 보이기
    InputElem2.classList.remove('hidden');
    TodoListElem.classList.remove('hidden');
    LonginForm.classList.add('hidden');   //input 태그 안보이기
}
//로그인을 함과 동시에 localStorge에 값 저장
const hendlerSubmit = (event) => {
    event.preventDefault();  //기능 초기화
    // console.log(InputElem.value);
    PrintLoginName(InputElem1.value);
    SaveLoginName(InputElem1.value);
    InputElem1.value = null;
}
//처음 실행되는 함수
const init = () => {
    //저장된 데이터 확인
    let LoginName = LoadLoginName();
    // console.log(LoginName);
    if(LoginName){
        //화면에 출력
        PrintLoginName(LoginName);
    } else{
        LonginForm.addEventListener('submit', hendlerSubmit);
    }
    //로그아웃
    Logout.addEventListener('click',()=>{
        localStorage.removeItem(LoginKey);
        Ptxt.classList.add('hidden');
        Logout.classList.add('hidden');
        InputElem2.classList.add('hidden');
        TodoListElem.classList.add('hidden');
        LonginForm.classList.remove('hidden'); 
    });
}
window.onload = init;