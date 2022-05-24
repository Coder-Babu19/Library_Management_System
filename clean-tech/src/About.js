import { Row , Col , Container , Form , Button } from 'react-bootstrap';
import pic from './components/images/book.jpg';
import './Login.css'


const About = () => {
  
  return (
    <Container fluid>
    <Row style= {{padding:0}}>
      <Col sm={6} className= 'ml-0'>
      <img src={pic} className='sideimage' />
      </Col>
      <Col sm={6} style={{padding:100}}>
        <h2> About Us</h2>
        <text> Solace is a legal depository for all published literary heritage.
           It serves as top most knowledge resource centre as well as fountain head of Library 
           developments in the country. Solace strives to develop significant collection of human
            knowledge, comprehensive collection of national literary heritsage and deliver excellent
             Library services for promotion of knowledge . Solace is responsible for 
             National bibliographic control and preserves the literary heritage of the country 
             for the use of present as well as future generations. A vast collection of publications
             are held at Solace. A significant part of collection consists on manuscripts and rare books. </text>
      </Col>
    </Row>
    </Container>
 );
 }

export default About;