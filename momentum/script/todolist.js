const TODOS_KEY = 'todos';
let Todo_list = [];   //{id,input.value}
const TodoForm = document.querySelector('.login > #todoForm');
const InputTodo = document.querySelector('.login > #todoForm > input');
const UltodoList = document.querySelector('#todoList');

//객체 -> 배열
const StorageSave = () => {
    const strObj = JSON.stringify(Todo_list);
    localStorage.setItem(TODOS_KEY,strObj);
}
//key 값 가져오기
const StorageNode = () => {
    return localStorage.getItem(TODOS_KEY);
}
//배열(Todo_list)에 저장
const SaveTodoList = (num,txt,flag) => {
    const obj = {id:num,value:txt,check:flag}
    Todo_list.push(obj);
    StorageSave();
}
//삭제
const handlerDelBtn = (event) => {
    // console.log(event.target.parentElement);
    const delID = event.target.parentElement.id;
    Todo_list = Todo_list.filter((item)=>{
        return delID != item.id;
    });
    event.target.parentElement.remove();
    StorageSave();
}
//목록
const updateCheckBox = (id,check) => {
    for(let x=0; x<Todo_list.length; x++){
        if(Todo_list[x].id == id){
            Todo_list[x].check = check;
            break;
        }
    }
    StorageSave();
}
const hendlerCheck = (event) => {
    const changeID = event.target.parentElement.id;
    const check = event.target.checked;
    updateCheckBox(changeID,check)
}
const AddTodoList = (id,value,check) => {
    //li로 추가
    let elem = document.createElement('li');
    elem.id = id;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('change',hendlerCheck);
    let spanElem = document.createElement('span');
    spanElem.textContent = value;
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'X';
    closeBtn.className = 'todo-btn';
    closeBtn.addEventListener('click',handlerDelBtn);
    elem.append(input);
    elem.append(spanElem);
    elem.append(closeBtn);
    UltodoList.append(elem);
    SaveTodoList(id,value,check);
}
//input.value
const handlerTodoSubmit = (event) => {
    event.preventDefault();  //초기화
    let value = InputTodo.value;
    InputTodo.value = null;
    AddTodoList(Date.now(),value,false);
}
const todo_init = () => {
    let LoadTodos = StorageNode();
    if(LoadTodos){
        const obj = JSON.parse(LoadTodos);
        obj.forEach((item)=>{
            AddTodoList(item.id, item.value, item.check);
        });
    }
    TodoForm.addEventListener('submit',handlerTodoSubmit);
}
todo_init();