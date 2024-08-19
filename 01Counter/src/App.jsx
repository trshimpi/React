import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)

  const addToCount = () => {
    setCounter((prev)=> prev+1);
  }

  const removeFromCount = () => {
    setCounter((prev)=>{
        if (prev === 0){
          
          alert("You have reached minimum value");
          return prev = 0;
        }else{
          return prev = prev-1
        }
    })
  }

  return (
    <>
      <h1>This is counter app</h1>
      <h2>Counter value is : {counter}</h2>

      <button onClick={addToCount}>Add</button>
      <button onClick={removeFromCount}>Remove</button>
    </>
  )
}

export default App
