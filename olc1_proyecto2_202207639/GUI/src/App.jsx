import { useState } from 'react'
import './App.css'
import {EditorT} from "../Components/Editor.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <h1>Interfaz</h1>
        <EditorT/>
      </>
  )
}

export default App
