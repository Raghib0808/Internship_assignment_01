import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Fetch_f from "./Components/Fetch_f"



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Fetch_f/>
    </>
  )
}

export default App
