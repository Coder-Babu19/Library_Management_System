import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import Login from './Login';
import Signup from './Signup';
import Browse from './Browse';
import Bookinfo from './Bookinfo';
import About from './About';
import Home from './Home';
import Dashbaord from './Dashbaord';
import { BrowserRouter as Router,Switch, Route, Routes } from 'react-router-dom'
import axios from "axios"
import { useEffect } from 'react';




const App = () => {

  const message = "-->Connection Established With React<--"

  useEffect( () => {

    const conn = async() => {
    try {
			  await axios.post("/start", {
				message
			})
      .then((responce) => console.log(responce.data))
		} catch (error) {
			console.error(error)
		}}
    conn()
  },[]);



  return (
    <Router>
    <Navigation> </Navigation>
   <Routes>
          <Route path='/Home' element={<Home/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Browse' element={<Browse/>} />
          <Route path='/Dashbaord' element={<Dashbaord/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/Bookinfo' element={<Bookinfo/>} />
          <Route path='/' element={<Home/>} />
   </Routes>
       
</Router>
    
  );
}

export default App;
