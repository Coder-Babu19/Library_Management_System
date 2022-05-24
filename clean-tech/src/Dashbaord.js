import { Container , Modal , Button , Row , Card , Col, Table , Form} from "react-bootstrap";
import DonutC from "./DonutChart";
import BarChart from "./Bar";
import React from "react";
import { useState , useEffect} from "react";
import axios from "axios"



const Dashbaord = () => {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  const [ loading, setLoading ] = useState('')
  const [ dueList, setDueList ] = useState([])

  useEffect( () => {

    setLoading('Yes')
    const conn = async() => {
    try {
			  await axios.get("/getDueData", {
			})
      .then((responce) => {
        const data = responce.data

      const List = [];
      for (let i = 0; i < 5; i++) {
        const due = {
          "Email": data[i]['Email'],
          "Issue_Date": data[i]['Issue_Date'],
          "Fine": data[i]['Fine']
        };
        List.push(due);
      }
      setDueList(List)
      setLoading('No')
      console.log(dueList)
      })
		} catch (error) {
			console.error(error)
		}}
    conn()
    
  },[]);


  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Thank you for your feedback!')
    }
  }

  const findFormErrors = () => {
    const { email , status , title , isbn , author , rdate , publisher , language , image } = form
    const newErrors = {}
    const arr = ['librarian','user']
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if ( !email || email === '' ) newErrors.email = 'Required Field'
    if (!arr.includes(status)) newErrors.status = 'Invalid Status field'
    if ( !title || title === '' ) newErrors.title = 'Required Field'
    // if (!(date_regex.test(rdate))) newErrors.rdate = 'Required Field'
    if ( !isbn || isbn === '' ) newErrors.isbn = 'Required Field'
    else if (isbn.length > 10 || isbn.length < 10) newErrors.isbn = 'Length should be 10'
    if ( !author || author === '' ) newErrors.author = 'Required Field'
    if ( !publisher || publisher === '' ) newErrors.publisher = 'Required Field'
    if ( !language || language === '' ) newErrors.language = 'Required Field'
    if ( !image || image === '' ) newErrors.image = 'Required Field'
    // else if (!status.match(type2)) newErrors.status = 'Invalid Status field'
    
    return newErrors
  }


  const serviceStatusUpdate = async () => {

    console.log(form['status'])
    

    try {
      await axios.post("/changeStatus", {
        email : form['email'],
        status : form['status']
    })
    .then((responce) => {
      var data = responce.data
      if (data === "Invalid status"){
        alert('Invalid Entry In Status Field!')
      }
      else if (data === "User Not Found!"){
        alert('No user found with this Email!')
      }
      else{
        alert('Status Updated!')
      }
    })

  } 
  catch (error) {
    console.error(error)
  }

  
  } 


  const serviceAddBook = async () => {
    try {
      await axios.post("/addBook", {
        ISBN : form['isbn'],
        Title : form['title'],
        Author : form['author'],
        Publisher : form['publisher'],
        Language : form['lamguage'],
        Year_published : form['rdate'],
        Image : form['image']
    })
    .then((responce) => {
      var data = responce.data

      if (data === "UnSuccessful"){
        alert('Book Already registered!')
      }
      else{
        alert('Status Updated!')
      }
    })

  } 
  catch (error) {
    console.error(error)
  }
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

  if (loading === "No"){


  return (
    <Container fluid>
        <Row style={{padding:15}}>
          <Col sm={4} style={{padding:20}}>
        <Card border="danger" bg='danger' text='white' style={{margin:5, width: '18rem'}} >

    <Card.Body>
      <Card.Title>Borrowed Books</Card.Title>
      <Card.Text>
        1
      </Card.Text>
    </Card.Body>
  </Card>
  <Card border="danger" bg='danger' text='white' style={{margin:5 , width: '18rem'}} >
    <Card.Body>
      <Card.Title>Overdue Books</Card.Title>
      <Card.Text>
        3
      </Card.Text>
    </Card.Body>
  </Card>
  <Card border="danger" bg = "danger" text='white' style={{margin:5 , width: '18rem'}} >
    <Card.Body>
      <Card.Title>Library Visitors</Card.Title>
      <Card.Text>
       25k
      </Card.Text>
    </Card.Body>
  </Card>
  <Button variant='danger' onClick={() => setSmShow(true)} className="me-2"> Change Status</Button>
      <Button variant='danger' onClick={() => setLgShow(true)}> Enter Book Details</Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Change Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="title">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="Enter user email" onChange={ e => setField('email', e.target.value) }  isInvalid={ !!errors.email }/>
    <Form.Control.Feedback type='invalid'>
        { errors.email }
    </Form.Control.Feedback>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2} >
        Status
      </Form.Label>
      <Row>
        <Col>
        <Form.Check
          type="radio"
          label="Librarian"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          value="librarian"
          isInvalid={ !!errors.email }
          onChange={ e => setField('status', e.target.value) }
        />
        </Col>
        <Col>
        <Form.Check
          type="radio"
          label="User"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          value="user"
          isInvalid={ !!errors.status }
          onChange={ e => setField('status', e.target.value) }
        />
        </Col>
      </Row>
    </Form.Group>
  </fieldset>
  <Row style={{padding:20}}>
  <Button type='submit' onClick={serviceStatusUpdate}> Submit </Button>
         </Row>
         </Form>

        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Book details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
        <Form.Group className="mb-3" controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Enter title"  onChange={ e => setField('title', e.target.value) }  isInvalid={ !!errors.title } />
    <Form.Control.Feedback type='invalid'>
        { errors.title }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label> ISBN </Form.Label>
    <Form.Control type="text" placeholder="Enter ISBN"  onChange={ e => setField('isbn', e.target.value) }  isInvalid={ !!errors.isbn } />
    <Form.Control.Feedback type='invalid'>
        { errors.isbn }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  </Row>
  <Row>
            <Col>
        <Form.Group className="mb-3" controlId="title">
    <Form.Label> Author </Form.Label>
    <Form.Control type="text" placeholder="Enter author's name"  onChange={ e => setField('author', e.target.value) }  isInvalid={ !!errors.author } />
    <Form.Control.Feedback type='invalid'>
        { errors.author }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label> Release Date </Form.Label>
    <Form.Control type="text" placeholder="Enter release date"  onChange={ e => setField('rdate', e.target.value) }  isInvalid={ !!errors.rdate } />
    <Form.Control.Feedback type='invalid'>
        { errors.rdate }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  </Row>
  <Row>
  <Col>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label> Publisher </Form.Label>
    <Form.Control type="text" placeholder="Enter release date"  onChange={ e => setField('publisher', e.target.value) }  isInvalid={ !!errors.publisher } />
    <Form.Control.Feedback type='invalid'>
        { errors.publisher }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  <Col>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label> Language </Form.Label>
    <Form.Control type="text" placeholder="Enter release date"  onChange={ e => setField('language', e.target.value) }  isInvalid={ !!errors.language} />
    <Form.Control.Feedback type='invalid'>
        { errors.language }
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  </Row>
  <Row>
  <Form.Group className="mb-3" controlId="title">
    <Form.Label> Image URL-L </Form.Label>
    <Form.Control type="text" placeholder="Enter release date"  onChange={ e => setField('image', e.target.value) }  isInvalid={ !!errors.image } />
    <Form.Control.Feedback type='invalid'>
        { errors.image }
    </Form.Control.Feedback>
  </Form.Group>
  </Row>
  <Row style={{padding:20}}>
  <Button type='submit' onClick={serviceAddBook}> Submit </Button>
         </Row>
        </Form></Modal.Body>
      </Modal>

  </Col>
  <Col >
  <Col sm={12} style={{padding:20}}>
            <h5 style={{paddingBottom:15}}>Overdue Booklist </h5>
        <Table>
    <thead>
      <tr>
        <th>ID </th>
        <th> Email </th>
        <th> Issue Date </th>
        <th> Fine </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>{dueList[0]['Email']}</td>
        <td>{dueList[0]['Issue_Date']}</td>
        <td>{dueList[0]['Fine']}</td>
      </tr>
      <tr>
        <td>2</td>
        <td>{dueList[1]['Email']}</td>
        <td>{dueList[1]['Issue_Date']}</td>
        <td>{dueList[1]['Fine']}</td>
   

      </tr>
      <tr>
        <td>3</td>
        <td>{dueList[2]['Email']}</td>
        <td>{dueList[2]['Issue_Date']}</td>
        <td>{dueList[2]['Fine']}</td>
      
  
      </tr>
      <tr>
        <td>4</td>
        <td>{dueList[3]['Email']}</td>
        <td>{dueList[3]['Issue_Date']}</td>
        <td>{dueList[3]['Fine']}</td>
   

      </tr>
      <tr>
        <td>5</td>
        <td>{dueList[4]['Email']}</td>
        <td>{dueList[4]['Issue_Date']}</td>
        <td>{dueList[4]['Fine']}</td>
   

      </tr>
    </tbody>
  </Table>

</Col>
  </Col>
        </Row>
        <Row>
         
<Col sm={6} style={{padding:15}}>
<Card>
  <Card.Body>
      <Card.Title>Visitors by Age</Card.Title>
      <DonutC/>
    </Card.Body>
  
  </Card>
</Col>
<Col>
<Card  style={{width:'40rem', padding:15}}>
  <Card.Body>
      <Card.Title style={{padding:10}}> Visitors and Borrowers </Card.Title>
      <BarChart/>
    </Card.Body>
  
  </Card></Col>
        </Row>
        </Container>
  );
 }

  else{
    return(
      <h1></h1>
    );
  }
}

export default Dashbaord;