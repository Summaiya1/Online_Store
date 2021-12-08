import {useState } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Login from './views/Login';
import SignUp from './views/SignUp';
import PostAd from './views/PostAd';
import Dashboard from './views/Dashboard';
import UpdateProfile from './views/UpdateProfile';
import Profile from './views/Profile';
import Form from 'react-bootstrap/Form';
import { logout } from './config/firebase';
import Search from './views/Search';
import AdDetails from './views/AdDetails';
import { updateTheme } from './store/actions/themeAction';
import { updateUser } from './store/actions/userAction';
import './App.css';

function App() {
  

const [search,setSearch] = useState('')
// const [user, setUser] = useState()
const [isSwitchOn,setIsSwitchOn] = useState(false)
const dispatch = useDispatch()
const user = useSelector(state => state.userReducer.user)
//const user1 = useSelector(state => state.user)
  // const updateUser = (userObj) => {
  //   setUser(userObj)

  // }

  const logOut = () =>{
   logout();
  //  setUser();
   dispatch(updateUser())
  }

  const onColorSelect = () => {
    let theme
    setIsSwitchOn(!isSwitchOn);
    
    if (isSwitchOn == true)
    {
      theme='white'
    }
    else theme = 'black'
   //console.log(theme,value)
  dispatch(updateTheme(theme))
  }
  // useEffect(() =>{
    
  //   setUser(user1)
  // },[])
  
function ProtectedRoute(user, component, redirectTo = "/") {
  return user ? component : <Redirect to={redirectTo} />
}

  return (
  
  <div className="App">
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
               {user? <Nav.Link onClick={logOut}><Link to="/" style={{'text-decoration': 'none',color:"white"}}>Logout</Link></Nav.Link>:
               <div style={{display:'flex'}}>
              <Nav.Link><Link to="/" style={{'text-decoration': 'none',color:"white"}}>Login</Link></Nav.Link>
               <Nav.Link><Link to="/signup" style={{'text-decoration': 'none',color:"white"}}>SignUp</Link></Nav.Link>
               </div>}
             
              
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {user && 
      <div>
        <div className="header">
        <div style={{display:"flex",'align-items':'center','flex-wrap': 'wrap'}}>
        <Image src={user.url} roundedCircle style={{'width':'120px'}}/>
        <h4>Hello {user.fullname} !!</h4>
        </div>
        <div className="header-right">
        <a><Link to="/updateProfile" style={{'text-decoration': 'none'}}>Update Profile</Link></a>
        <a><Link to="/postad" style={{'text-decoration': 'none'}}>Post AD</Link></a>
        <a><Link to="/profile" style={{'text-decoration': 'none'}}>View Profile</Link></a>
        </div>
        <Form>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="switch to dark mode"
            onChange={onColorSelect}
            checked={isSwitchOn}
          />
        </Form>
        
        
       
      </div>
      
        <div>
           <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
           <Button variant="secondary"><Link to="/search" style={{'text-decoration': 'none',color:"white"}}>Search</Link></Button>
        </div>
        <hr/>
     </div>}
     
      
      <Switch>
        <Route exact path="/">
          {ProtectedRoute(!user, <Login/>,"/dashboard")} 
        </Route>
        <Route exact path="/signup">
          {ProtectedRoute(!user, <SignUp/>,"/dashboard")} 
        </Route>
        <Route exact path="/details/:id">
          {ProtectedRoute(user, <AdDetails/>)} 
        </Route>
        <Route exact path="/postad">
          {ProtectedRoute(user,<PostAd/>)}
        </Route>
        <Route exact path="/search">
          {ProtectedRoute(user,<Search value={search}/> )}
        </Route>
        <Route exact path="/updateProfile">
          {ProtectedRoute(user,<UpdateProfile/> )}
        </Route>
        <Route exact path="/dashboard">
        {ProtectedRoute(user,<Dashboard/>)}
        </Route>
        <Route exact path="/profile">
          {ProtectedRoute(user, <Profile/>)}
        </Route>
      </Switch>

   </Router>
 
</div>

   
  );
}

export default App;


// <div style={{display:'flex','align-items':'center','flex-wrap': 'wrap'}}> 
// <Image src={user.url} roundedCircle style={{'width':'120px'}}/>
// <h4>Hello {user.fullname} !!</h4>
// <div style={{'margin-left':'60%',display:'flex'}}>
// <div style={{width:'120px',height:'40px','background-color':'#000080','text-align': 'center',padding:'10px',margin:'10px'}}><Link to="/updateProfile" style={{'text-decoration': 'none',color:"white"}}>Update Profile</Link></div>
// <div style={{width:'120px',height:'40px','background-color':'#000080','text-align': 'center',padding:'10px',margin:'10px'}}><Link to="/postad" style={{'text-decoration': 'none',color:"white"}}>Post AD</Link></div>
// <div style={{width:'120px',height:'40px','background-color':'#000080','text-align': 'center',padding:'10px',margin:'10px'}}><Link to="/profile" style={{'text-decoration': 'none',color:"white"}}>View Profile</Link></div>
// </div>

// </div>