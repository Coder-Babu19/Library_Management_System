import { Navbar , Nav , Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navigation.css';
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate  } from 'react-router-dom';





const Navigation = () => {
  
  const [user,setUser] = useState('none')
  const navigate = useNavigate();

  useEffect( () => {


    const renderControl = async() => {

      try{
       await axios.get("/sysControl").then((responce) => {
			const data = responce.data

      if (data != 'none'){
        console.log(data)
        setUser(data)
      }

      })
      }
      catch(e){
        console.log(e)
      }
    }
    renderControl()
    

});

const serviceLogout = async () => {

  try{
    await axios.get("/logout").then((responce) => {
    const data = responce.data
   })
   }
   catch(e){
     console.log(e)
   }
   window.location.reload(false);
   navigate('/Home');

}




  if (user === 'librarian') {
  return (
<Navbar bg="dark" variant="dark" >
    <Container>
    <Navbar.Brand href="#home"> Solace</Navbar.Brand>
    <Nav className="justify-content-end">
      <Link to="/Home" style={{textDecoration:'none',color:'white',padding:5}} > Home </Link>
      <Link to="/About" style={{textDecoration:'none',color:'white',padding:5}} > About </Link>
      <Link to="/Dashbaord" style={{textDecoration:'none',color:'white',padding:5}}>  Dashboard </Link>
      <Link to="/Home" style={{textDecoration:'none',color:'white',padding:5}} onClick={serviceLogout}> Logout </Link>
    </Nav>
    </Container>
  </Navbar>
  );
  }
  else if (user === 'user') {
    return (
      <Navbar bg="dark" variant="dark" >
      <Container>
      <Navbar.Brand href="#home"> Solace</Navbar.Brand>
      <Nav className="justify-content-end">
        <Link to="/Home" style={{textDecoration:'none',color:'white',padding:5}} > Home </Link>
        <Link to="/About" style={{textDecoration:'none',color:'white',padding:5}} > About </Link>
        <Link to="/Browse" style={{textDecoration:'none',color:'white',padding:5}} >  Browse </Link>
        <Link to="/Home" style={{textDecoration:'none',color:'white',padding:5}} onClick={serviceLogout}> Logout </Link>
        <Link to="/Signup" style={{textDecoration:'none',color:'white',padding:5}} > Signup </Link>
      </Nav>
      </Container>
    </Navbar>
    );
  }
  else{
      return (
        <Navbar bg="dark" variant="dark" >
        <Container>
        <Navbar.Brand href="#home"> Solace</Navbar.Brand>
        <Nav className="justify-content-end">
          <Link to="/Home" style={{textDecoration:'none',color:'white',padding:5}} > Home </Link>
          <Link to="/About" style={{textDecoration:'none',color:'white',padding:5}} > About </Link>
          <Link to="/Login" style={{textDecoration:'none',color:'white',padding:5}}> Login </Link>
          <Link to="/Signup" style={{textDecoration:'none',color:'white',padding:5}} > Signup </Link>
        </Nav>
        </Container>
      </Navbar>
      );
  }
}

export default Navigation;