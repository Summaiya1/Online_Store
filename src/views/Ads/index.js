import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory,withRouter} from "react-router-dom";


function Ads({title,price,images,id})
{
    let history = useHistory();
    const showDetails = () =>{
       
        history.push(`/details/${id}`);
    }
   
   return(
    <div style={{'margin-left' :'3%'}}>   
    <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src={images[1]} style={{width:'180px',height:'180px'}}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <p>Price :{price} Rs</p>
            <Button variant="primary" onClick={showDetails}>View Details</Button>
        </Card.Body>
    </Card>
    </div> 
    );

}
export default withRouter(Ads);


