const TodoNew = (props) => {
  const {addNewTodo} = props;
  const handleClick = () => {
    alert("click me");
  }
  const handleOnChange = (name) => {
     console.log("Hello " + name)
  }
  return (
      <div className="todo-new">
        <input type="text" 
            onChange={(event) => {handleOnChange(event.target.value)}}
        />
        <button 
            onClick={handleClick} 
            style={{ cursor:"pointer" }}
        >Add</button>
      </div>

  );
};


export default TodoNew;