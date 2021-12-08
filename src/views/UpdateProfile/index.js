import {useState} from 'react'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {getCurrentUserData,updateProfile} from '../../config/firebase'
import {updateUser} from '../../store/actions/userAction'



function UpdateProfile(props)
{
    const [load, setLoad] = useState(false)
    const [userid,setUserid]=useState({})
    const [email,setEmail] = useState('')
    //const [password,setPassword] = useState('')
    const [fullname,setFullname] = useState('')
    const [contactno , setContactno] = useState('')
    const [picture,setPicture] =useState('')
    const [newpic,setNewpic]=useState('')
    const dispatch = useDispatch()
    var uid;

    useEffect(() => {
      async function fetchData() {
          // You can await here
        
          var tempUser = await getCurrentUserData()
          setUserid(tempUser.id)
          setEmail(tempUser.email)
          setContactno(tempUser.contactno)
          setFullname(tempUser.fullname)
          setPicture(tempUser.url)
          setNewpic(tempUser.url)
          
        }
        fetchData()
      
    }, [])

  const setProfile = async (fullname,contactno,email,newpic) => {
      
      setLoad(true)
     try {
       if(picture == newpic){ 
         let setpic = false;
         uid = await updateProfile({fullname,contactno,email,userid,setpic});}
       else{
        let setpic = true;
         uid = await updateProfile({fullname,contactno,email,userid,newpic,setpic});
       }
   
      var r = await getCurrentUserData(uid)
       } catch (e) {
       alert(e.message)
       }
      setLoad(false)
      dispatch(updateUser(r))
     
      
      
    }
   
    const setImage = (e) =>{
      let file = e.target.files
    
     if(file.length > 1)
      {
          alert('only 1 picture allowed');
          e.target.value=''
  
      }
     else{setPicture(URL.createObjectURL(file[0]))
      setNewpic(file[0])
     }
    }



 return(
  
    <Form style={{margin:'10px'}}>
   
    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Name</Form.Label>
    <Form.Control  placeholder="Name" onChange={ e => setFullname(e.target.value)} value={fullname}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contact No</Form.Label>
        <Form.Control placeholder="Contact No" onChange={ e => setContactno(e.target.value)} value={contactno}/>
    </Form.Group>
  
  
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={ e => setEmail(e.target.value)} value={email}/>
    </Form.Group>

    
    <h5>Picture </h5><img src={picture} style={{width:'200px'}}/>
   <input type="file" multiple onChange={(e) => setImage(e)} />
 
   <br/>
      {load?
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>:
        <Button variant="primary" onClick={() =>setProfile(fullname,contactno,email,newpic)}>
         Update Profile
      </Button>}
     
    </Form>
   
     

 );
}

export default UpdateProfile;

