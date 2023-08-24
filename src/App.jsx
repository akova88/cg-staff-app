import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './components/Layout/MainLayout'
import StaffList from './components/StaffList/StaffList'
import CreateStaff from './components/CreateStaff/CreateStaff'

function App() {
  

  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<StaffList />}/>
        <Route path='/staff/list' element={<StaffList />}/>
        <Route path='/staff/create' element={<CreateStaff />}/>
      </Routes>
    </MainLayout>
  )
}

export default App
