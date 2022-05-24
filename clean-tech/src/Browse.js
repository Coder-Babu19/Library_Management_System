import { Container , InputGroup , FormControl , Button , Row , Card , CardGroup } from "react-bootstrap";
import { useNavigate  } from 'react-router-dom';
import Bookinfo from "./Bookinfo";
import { useState, useEffect } from "react";
import axios from "axios"


const Browse = () => {
  const navigate = useNavigate();
  const [books,setBooks] = useState([])
  const [loading,setLoading] = useState('')
  const [seacrhBook,setSearchBook] = useState('')

  useEffect( () => {

    setLoading("Yes")
    const renderBooks = async() => {

      try{
       await axios.get("/category").then(function(response) {
			const data = response.data

      const bookList = [];
      for (let i = 0; i < 9; i++) {
        const book = {
          _id: data[i]._id,
          ISBN: data[i].ISBN,
          Title: data[i]['Book-Title'],
          Author: data[i]['Book-Author'],
          Year_Of_Publication: data[i]["Year-Of-Publication"],
          Publisher: data[i]['Publisher'],
          Image_URL_S:  data[i]['Image-URL-S'],
          Image_URL_M: data[i]['Image-URL-M'],
          Image_URL_L: data[i]['Image-URL-L'],
          Language: data[i]['Language']
        };
        bookList.push(book);
      }
      setBooks(bookList)
      setLoading('No')
		  })
      }
      catch(e){
        console.log(e)
      }
    }
    renderBooks()
    

},[]);


  const toBookinfo = async () => {
    
    try {
      await axios.post("/bookSearch", {
      book : seacrhBook
    })
    .then((responce) => {
     if(responce.data === 'Not Found'){
      alert('Book Not Found!')
     }
     else{
        navigate('/Bookinfo');
     }

    })

  } 
  catch (error) {
    console.error(error)
  }

  }

  if (loading === 'No'){

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
    <Button variant="outline-secondary" id="button-addon2" onClick={toBookinfo}>
      Search
    </Button>
  </InputGroup>
</Row>
<Row style={{paddingTop:10}}>
  <h5> Books recently viewed </h5>
</Row>
<Row style={{padding:5}}>
<CardGroup className= 'mr-3'>
  <Card>
    <Card.Img variant="top" src={books[0]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[0]['Title']}</Card.Title>
      <Card.Text>
      {books[0]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[0]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card >
    <Card.Img variant="top" src={books[1]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[1]['Title']}</Card.Title>
      <Card.Text>
      {books[1]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[1]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card>
    <Card.Img variant="top" src={books[2]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[2]['Title']}</Card.Title>
      <Card.Text>
      {books[2]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[2]['Language']}</small>
    </Card.Footer>
  </Card>
</CardGroup>
</Row>

<Row  style={{paddingTop:30, paddingBottom:10}}>
  <h5> New Releases </h5>
</Row>
<Row>
<CardGroup className= 'mr-3'>
  <Card>
    <Card.Img variant="top" src={books[3]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[3]['Title']}</Card.Title>
      <Card.Text>
      {books[3]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[3]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card >
    <Card.Img variant="top" src={books[4]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[4]['Title']}</Card.Title>
      <Card.Text>
      {books[4]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[4]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card>
    <Card.Img variant="top" src={books[5]['Image_URL_L']} />
    <Card.Body>
      <Card.Title>{books[5]['Title']}</Card.Title>
      <Card.Text>
      {books[5]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[5]['Language']}</small>
    </Card.Footer>
  </Card>
</CardGroup>
</Row>


<Row  style={{paddingTop:30, paddingBottom:10}}>
  <h5> Award Winning </h5>
</Row>
<Row>
<CardGroup className= 'mr-3'>
  <Card>
    <Card.Img variant="top" src={books[6]['Image_URL_L']}  />
    <Card.Body>
      <Card.Title>{books[6]['Title']}</Card.Title>
      <Card.Text>
      {books[6]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[6]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card >
    <Card.Img variant="top" src={books[7]['Image_URL_L']}  />
    <Card.Body>
      <Card.Title>{books[7]['Title']}</Card.Title>
      <Card.Text>
      {books[7]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[7]['Language']}</small>
    </Card.Footer>
  </Card>

  <Card>
    <Card.Img variant="top" src={books[8]['Image_URL_L']}  />
    <Card.Body>
      <Card.Title>{books[8]['Title']}</Card.Title>
      <Card.Text>
      {books[8]['Author']}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{books[8]['Language']}</small>
    </Card.Footer>
  </Card>
</CardGroup>
</Row>
   </Container>
    );
    
  }

  else{
    return (
      <h1></h1>
    );
  }
}

export default Browse;