import { Row , Col , Container , Form , Button } from 'react-bootstrap';
import pic from './components/images/book.jpg';
import './Login.css'
import { useState } from 'react';
import axios from "axios"
import { useNavigate  } from 'react-router-dom';




const Login = () => {
  const navigate = useNavigate();
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  var login_status = "some_status"

  
  const Server_Login = async () => {

    try {
      await axios.post("/login", {
      form
    })
    .then((responce) => {
      login_status = responce.data
      window.location.reload(false);
    })

  } 
  catch (error) {
    console.error(error)
  }

  
  } 


  const handleSubmit = async e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      await Server_Login()


      if (login_status === "User Found"){
        alert('User logged in!')
        // navigate('/Home');

      }
      else{
        alert('User Not Found')
        /// Login failed
      }
     
    }
  }
  const findFormErrors = () => {
    const { password , email } = form
    const newErrors = {}
    // name errors
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if ( !email || email === '' ) newErrors.email = 'Enter an email!'
    else if ( email.length > 30 ) newErrors.email = 'Email too long!'

    if (!password || password === '') newErrors.password = 'Enter a password!'
    else if (password.length < 8) newErrors.password = 'Password should be 8 characters long'
    if (format.test(password)) newErrors.password = 'Special Characters are not allowed'
    else if (!password.match(passw)) newErrors.password = 'Password must include a capital letter, small letter and a number'
  
    return newErrors
  }
  
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }
 
  return (
    <Container fluid>
    <Row style= {{padding:0}}>
      <Col sm={6} className= 'ml-0'>
      <img src={pic} className='sideimage' />
      </Col>
      <Col sm={6} style={{padding:100}}>
        <h2> Login </h2>
        <h6> Welcome Back! </h6>
        <text> 

        </text>
      <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={ e => setField('email', e.target.value) }  isInvalid={ !!errors.email } />
    <Form.Control.Feedback type='invalid'>
        { errors.email }
    </Form.Control.Feedback>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={ e => setField('password', e.target.value) }  isInvalid={ !!errors.password } />
    <Form.Control.Feedback type='invalid'>
        { errors.password }
    </Form.Control.Feedback>  
  </Form.Group>
  <Button variant="danger" className="mb-3" type="submit">
    Login
  </Button>
  
</Form>

      </Col>
    </Row>
    </Container>
 );
 }

export default Login;