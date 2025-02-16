import React, { useState ,useEffect, use} from 'react'
import './Section.css'

const Section = () => {
    const [text, setText] = useState();
    const [todos, setTodos] = useState([]);
    const [id, setId] = useState(1);
    const [editId, setEditId] = useState(0);


    let addTodo = ()=>{
        if(text == "") return;

         // Prevent duplicate entry when adding a new todo
         if (editId === 0 && todos.some(todo => todo.text === text.trim())) {
            alert("This todo already exists!");
            return;
        }
      
        if(editId !== 0){
            const updatedTodos = todos.map(todo => {
                if (todo.id === editId) {
                    return { ...todo, text: text };
                } else {
                    return todo;
                }
            });
            setTodos(updatedTodos);
            setEditId(0);
        }
      else{
        let itemsTobeAdd = { id: id, text: text, isChecked: false }
        setTodos(prevTodos => [...prevTodos, itemsTobeAdd]);
        setId(prevId => prevId + 1);
      }
     
        setText("");
        console.log(todos)
    }

    const deleteTodo = (item) => {
        const updatedTodos = todos.filter(todo => todo.id !== item.id);

        setTodos(updatedTodos);
        localStorage.setItem("localTodo", JSON.stringify(updatedTodos));
    };

    useEffect(() => {
        const savedTodo = JSON.parse(localStorage.getItem("localTodo"));
        if(savedTodo){
            setTodos(savedTodo);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) { 
            localStorage.setItem("localTodo", JSON.stringify(todos));
        }
    }, [todos]); 

    let handleCheckBox = (item)=>{
        const updatedTodos = todos.map(todo =>
            todo.id === item.id ? { ...todo, isChecked: !todo.isChecked } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("localTodo", JSON.stringify(updatedTodos)); 
    }

    let updateTodoList = (item)=>{
        setText(item.text);
        setEditId(item.id);
    }
    
  
  return (
    <div className='main'>
      <h1>Welcome to To-do list</h1>
      <div className='form-div flex'>
        <input onChange={(e)=>setText(e.target.value)}
         type="text" 
        placeholder='enter the list..'
        value={text}
        
        />
        <button onClick={addTodo}
        className='add-button'>  {editId ? "Save" : "Add"}
        </button>
      </div>

     {
       todos.map((item)=>(
            <div className='flex card'>
            <h2 className={item.isChecked ? "line"  : "" }> {item.text}</h2>
            <div className='flex todo-btn'>
                <input onChange={()=>handleCheckBox(item)}
                type="checkbox"
                checked={item.isChecked} 
                 id='check-Box'/>
                <button onClick={()=>updateTodoList(item)}>edit</button>
                <button onClick={()=>deleteTodo(item)} >delete</button>
            </div>
          </div>
      ))
     }
    </div>
  )
}

export default Section
