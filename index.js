const addButton = document.querySelector("#add-todo");

const baseURL = "http://localhost:8080";
const api = axios.create({ baseURL });

let todos = [];

api.get("/todo").then((res) => {
  todos = res.data;
  populateTodos();
});

const populateTodos = () => {
  let todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  return todos.forEach((todo) => {
    todoList.innerHTML += `<li><input onchange="confirmDelete('${todo.id}')" type="checkbox"/>${todo.todo}</li>`;
  });
};

const createTodo = async (todo) => {
  await api
    .post("/todo", { todo })
    .then((res) => {
      todos.push(res.data);
      populateTodos();
    })
    .catch((err) => alert(err.response.data.message));
};

const confirmDelete = (id) => confirm("Tem certeza?") && deteleTodo(id);

const deteleTodo = async (id) => {
  await api.delete(`/todo/${id}`).then((res) => {
    todos = res.data;
    populateTodos();
  });
};

addButton.onclick = () => {
  const input = document.querySelector("#new-todo");
  createTodo(input.value);
  input.value = "";
};
