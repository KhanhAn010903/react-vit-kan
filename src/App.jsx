import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoNew from "./components/todo/TodoNew";
import reactLogo from "./assets/react.svg";
const App = () => {
  const name = "Khánh An";
  const data = {
    address : "Hanoi",
    country : "Viet Nam"
  }
  const age = 21;

  const addNewTodo = () => {
      
  }
  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoNew addNewTodo={addNewTodo}/>
      <TodoData 
          name={name} 
          data={data} 
          age={age}
      />
      <div className="todo-image">
           <img src={reactLogo} />
      </div>
    </div>
  );
};

export default App;
