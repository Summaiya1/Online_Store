import {useState} from 'react'
import { useDispatch} from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {registerUser,getCurrentUserData} from '../../config/firebase';
import {updateUser} from '../../store/actions/userAction';



function SignUp()
{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [fullname,setFullname] = useState('')
    const [contactno , setContactno] = useState('')
    const [picture,setPicture] =useState([])

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const signup = async () => {
      
      setLoading(true)
      try {
        if  (picture.length > 1)
        {
  
            alert('only 1 picture allowed');
    
        }
        else 
        {
        const id =await registerUser({ email, password,fullname,contactno,picture});
        const data = await getCurrentUserData(id);
        dispatch(updateUser(data));
        // props.updateUser(data);
         }
      } catch (e) {
        alert(e.message)
      }
      setLoading(false)
     
    }
    const setPicture2 = (e) =>{
      let file = e.target.files
      setPicture(file[0])
    }
    

 return(
  <Form style={{margin:'10px'}}>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control  placeholder="Name" onChange={ e => setFullname(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contact No</Form.Label>
        <Form.Control placeholder="Contact No" onChange={ e => setContactno(e.target.value)}/>
    </Form.Group>
      
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={ e => setEmail(e.target.value)}/>
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={ e => setPassword(e.target.value)}/>
      </Form.Group>
      <input type="file" multiple onChange={(e) => setPicture2(e)}/>
         
    {loading?
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>:
      <Button variant="primary" onClick={signup}>
          Register
      </Button>}
     </Form>
   
  
  
   

 );
}

export default SignUp;

