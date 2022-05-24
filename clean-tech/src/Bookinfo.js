import { Container , Row , InputGroup , FormControl , Button , Card , Col } from "react-bootstrap";
import harry from "./components/images/harrypotter.jpg";
import { useState, useEffect } from "react";
import axios from "axios"





const Bookinfo = () => {
  const [seacrhBook,setSearchBook] = useState('')
  const [Book,setBook] = useState({})

  useEffect( () => {

    const conn = async() => {
      try{
        await axios.get("/getBook").then(function(response) {
         const data = response.data
 
         const book = {
           _id: data._id,
           ISBN: data.ISBN,
           Title: data['Book-Title'],
           Author: data['Book-Author'],
           Year_Of_Publication: data["Year-Of-Publication"],
           Publisher: data['Publisher'],
           Image_URL_S:  data['Image-URL-S'],
           Image_URL_M: data['Image-URL-M'],
           Image_URL_L: data['Image-URL-L'],
           Language: data['Language']
         };

        setBook(book)
       })

       }
       catch(e){
         console.log(e)
       }
  }
    conn()

  },[]);



  const findBook = async () => {
    
    try {
      await axios.post("/bookSearch", {
      book : seacrhBook
    })
    .then((responce) => {
     if(responce.data === 'Not Found'){
      alert('Book Not Found!')
     }
     else{
      const data = responce.data
      const book = {
        _id: data._id,
        ISBN: data.ISBN,
        Title: data['Book-Title'],
        Author: data['Book-Author'],
        Year_Of_Publication: data["Year-Of-Publication"],
        Publisher: data['Publisher'],
        Image_URL_S:  data['Image-URL-S'],
        Image_URL_M: data['Image-URL-M'],
        Image_URL_L: data['Image-URL-L'],
        Language: data['Language']
      };

     setBook(book)
     }

    })

  } 
  catch (error) {
    console.error(error)
  }

  }



  const handleBorrow = async () => {
    
    try {
      await axios.post("/borrow", {
      message : "borrow book"
    })
    .then((responce) => {
     if(responce.data === 'Not Found'){
      alert('Book Not Found!')
     }
     else if(responce.data === 'already booked!'){
      alert('Book not available for borrow!')
     }
     else{
      alert('Booking Successful!')
     }
    })

  } 
  catch (error) {
    console.error(error)
  }

  }




 return (
    <Container fluid>
    <Row style= {{padding:20}}>
       <InputGroup className="mb-3">
    <FormControl
      placeholder="Enter the book's name"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      onChange={ e => setSearchBook(e.target.value) } 
    />
    <Button variant="outline-secondary" id="button-addon2" onClick={findBook}>
      Search
    </Button>
  </InputGroup>
  </Row>
  <Row style={{padding:15}}>
    <Col  sm={6} style={{padding:40}}>
    <Card style={{height:500, width:500}}>
    <Card.Img variant="top" src= {Book['Image_URL_L']} style={{height:500, width:500}}/>
    {/* <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer> */}
  </Card>
    </Col >
    <Col  sm={6} style={{padding:40}}>
       <h2> {Book['Title']} </h2>
       <h5> {Book['Publisher']} </h5>
       {/* <text> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de 
           texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el
            año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta)
             desconocido usó una galería de textos y los mezcló de tal manera que logró hacer
              un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien
               ingresó como texto de relleno en documentos electrónicos, quedando esencialmente
                igual al original. Fue popularizado en los 60s con la creación de las hojas 
                "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente 
                con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye
                 versiones de Lorem Ipsum.</text> */}
    <Row style={{padding:15}}>
        <Col style={{paddingBottom:25}}>
        <h5> {'Author: ' + Book['Author']} </h5>
        <h5> {'ISBN: ' + Book['ISBN']} </h5>
        </Col>
         <Col style={{paddingBottom:25}}>
         <h5> {'Language: ' + Book['Language']}</h5>
         <h5> {'Published: ' + Book['Year_Of_Publication']}</h5>
         </Col>
    </Row >
    <Row style={{padding:15}}>
    <Button variant="outline-secondary" id="button-addon2" onClick={handleBorrow}>
      Borrow
    </Button>
    </Row>
    </Col>
  </Row>
    </Container>
 );
}

export default Bookinfo;