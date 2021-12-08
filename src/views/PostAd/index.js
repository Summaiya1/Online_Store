import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {postAd} from '../../config/firebase';



function PostAd()
{
    
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    
   
    //no need to make separate state for each input
    const onChangeValues = (key, e) => {
        
        const value = key === 'images' ? e.target.files : e.target.value
        if( key === 'images' && (e.target.files).length > 5)
        {
 
            e.preventDefault();
            e.target.value=''
            alert('Cannot upload files more than 5');
    
        }
        else setForm({ ...form, [key]: value })
      }

    const submitPost = async () => {
        setLoading(true);
        
        try {
         await postAd(form);
        
        } catch (e) {
            alert(e.message);
        }
      
        setLoading(false);
        
        
        
    }
  

 return(
   
    <Form style={{margin:'10px'}}>
     
   
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Title</Form.Label>
          <Form.Control  placeholder="Title" onChange={(e) => onChangeValues('title', e)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control placeholder="Description" onChange={(e) => onChangeValues('description', e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control  placeholder="Price" onChange={(e) => onChangeValues('price', e)}/>
      </Form.Group>
      <Form.Label>Images:</Form.Label>
      <br/>
      <input type="file" multiple onChange={(e) => onChangeValues('images', e)}/>
      {loading?
          <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
          </Spinner>:
          <Button variant="primary" onClick={submitPost}>
           Post
        </Button>}
     
    </Form>
   
     

 );
}

export default PostAd;





