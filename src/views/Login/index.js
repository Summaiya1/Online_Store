import {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import {loginUser} from '../../config/firebase';
import { useHistory,withRouter} from "react-router-dom";
import { useDispatch} from 'react-redux';
import {updateUser} from '../../store/actions/userAction'


function Login()
{
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const login = async () => {
      setLoading(true)
      try {
        const userObj = await loginUser(email,password)
         dispatch(updateUser(userObj))
        
      } catch (e) {
        alert(e.message)
      }
      setLoading(false)
     
      history.push('/dashboard')
    }

 return(
      <Form style={{margin:'10px'}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={ e => setEmail(e.target.value)}/>
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value)}/>
      </Form.Group>
        
    
    {loading?
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>:
      <Button variant="primary" onClick={login}>
          Login
      </Button>}
   
    </Form>
    
     
  
  

 );
}

export default Login;