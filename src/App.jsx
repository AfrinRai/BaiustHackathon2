import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="bg-green-500 text-white p-4 rounded-lg"> 
        Hello there!
      </div>
    </>
  )
}

export default App
