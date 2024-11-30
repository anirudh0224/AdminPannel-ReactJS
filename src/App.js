import './App.css';
import Login from './Components/Login';
import Category from './Components/Category';
import SubCategory from './Components/Subcategory';
import QA from './Components/QA';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route index path="/signup" element={<SignUp/>} />


          <Route path='/dash' element={<Sidebar/>}> 
            <Route index element={<Dashboard/>} />
            <Route path='/dash/category' element={<Category />} />
            <Route path='sub-category' element={<SubCategory />} />
            <Route path='qa' element={<QA />} />
          </Route>
        </Routes>
      </BrowserRouter >
      
    </>
  );
}

export default App;

