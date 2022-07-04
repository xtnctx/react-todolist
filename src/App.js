import React from "react"
import { Routes, Route } from 'react-router-dom'
import MainUI from "./MainUI"


function App() {
  

  return (
    <div>
      <Routes>
          <Route path="" element={<MainUI/>}/>
      </Routes>

    </div>
  )
}

export default App;
