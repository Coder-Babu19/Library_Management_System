import { Row , Col , Container , Form , Button } from 'react-bootstrap';
import pic from './components/images/book.jpg';
import { useState } from 'react';
import axios from "axios"



const Signup = () => {
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  var signup_status = "some_status"


  const Server_Signup = async () => {

    const { Name, age , Email , Phone , Password , Address, gender } = form
    const credentials = { Name , gender, age , Email , Password , Address, Phone }

    try {
      await axios.post("/signup", 
      credentials
    )
    .then((responce) => {
      signup_status = responce.data
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
      await Server_Signup()

      if (signup_status === "Successful"){
        alert('Signup Successful!')
      }
      else{
        alert('Email already registered!')
      }
    }
  }
  const findFormErrors = () => {
    const { Name, age , Email , Phone , Password , cPassword , Address, gender } = form
    const newErrors = {}
    // Name errors
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if ( !Name || Name === '' ) newErrors.Name = 'Required Field'
    if ( !age || age === '' ) newErrors.lastName = 'Required Field'
    if ( !Email || Email === '' ) newErrors.Email = 'Required Field'
    else if ( Email.length > 30 ) newErrors.Email = 'Email too long!'


    if ( !Password || Password === '' ) newErrors.Password= 'Required Field'
    else if (Password.length < 8) newErrors.Password = 'Password should be 8 characters long'
    if (format.test(Password)) newErrors.Password = 'Special Characters are not allowed'
    if (!Password.match(passw)) newErrors.Password = 'Password must include a capital letter, small letter and a number'
    if (age < 5 || age > 120) newErrors.lastName = 'Invalid Age'
    if ( !cPassword || cPassword === '' ) newErrors.cPassword = 'Required Field'
    else if (Password !== cPassword) newErrors.cPassword = 'Passwords do not match'
    if ( !Phone || Phone === '' ) newErrors.Phone = 'Required Field'
    else if (Phone.length > 11 || Phone.length < 11) newErrors.Phone = 'Not a valid number'
    if ( !Address || Address === '' ) newErrors.Address = 'Required Field'
    if ( !gender || gender === '' ) newErrors.gender = 'Required Field'
    

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
      <Col sm={6} style={{padding:50}}>
        <h2> Registration </h2>
        <Form onSubmit={handleSubmit}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Name</Form.Label>
      <Form.Control placeholder="John" onChange={ e => setField('Name', e.target.value) }  isInvalid={ !!errors.Name } />
      <Form.Control.Feedback type='invalid'>
        { errors.Name }
    </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridLName">
      <Form.Label> Age </Form.Label>
      <Form.Control placeholder="20"  onChange={ e => setField('age', e.target.value) }  isInvalid={ !!errors.lastName } />
      <Form.Control.Feedback type='invalid'>
        { errors.lastName }
    </Form.Control.Feedback>
    </Form.Group>
  </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type= 'Email' placeholder="johndoe@Email.com" onChange={ e => setField('Email', e.target.value) }  isInvalid={ !!errors.Email } />
      <Form.Control.Feedback type='invalid'>
        { errors.Email }
    </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridLNumber">
      <Form.Label> Phone number </Form.Label>
      <Form.Control placeholder="033576289138" onChange={ e => setField('Phone', e.target.value) }  isInvalid={ !!errors.Phone } />
      <Form.Control.Feedback type='invalid'>
        { errors.Phone }
    </Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type= 'Password' placeholder="**********" onChange={ e => setField('Password', e.target.value) }  isInvalid={ !!errors.Password } />
      <Form.Control.Feedback type='invalid'>
        { errors.Password }
    </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label> Confirm Password </Form.Label>
      <Form.Control type = 'Password' placeholder="************" onChange={ e => setField('cPassword', e.target.value) }  isInvalid={ !!errors.cPassword }/>
      <Form.Control.Feedback type='invalid'>
        { errors.cPassword }
    </Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" onChange={ e => setField('Address', e.target.value) }  isInvalid={ !!errors.Address }/>
    <Form.Control.Feedback type='invalid'>
        { errors.Address }
    </Form.Control.Feedback>
  </Form.Group>

  <fieldset>
    <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2} >
        Gender
      </Form.Label>
      <Row>
        <Col>
        <Form.Check
          type="radio"
          label="Male"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          value="MALE"
          isInvalid={ !!errors.gender }
          onChange={ e => setField('gender', e.target.value) }
        />
        </Col>
        <Col>
        <Form.Check
          type="radio"
          label="Female"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          value="FEMALE"
          isInvalid={ !!errors.gender }
          onChange={ e => setField('gender', e.target.value) }
        />
        </Col>
        <Col>
        <Form.Check
          type="radio"
          label="Other"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
          value="OTHER"
          isInvalid={ !!errors.gender }
          onChange={ e => setField('gender', e.target.value) }
        />
        </Col>
      </Row>
    </Form.Group>
  </fieldset>
  <Button variant="danger" type="submit">
    Signup
  </Button>
</Form>
      </Col>
    </Row>
    </Container>
 );
 }

export default Signup;