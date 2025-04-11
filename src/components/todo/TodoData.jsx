const TodoData = (props) => {
    const {name,data,age} = props;
    return (
        <div className='todo-data'>
        <div>My name is {name}</div>
        <div>Watching Youtube</div>
    </div>
    );
  };
  
  
  export default TodoData;