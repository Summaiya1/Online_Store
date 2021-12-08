import {useSelector} from 'react-redux'

export default function Profile()
{
  
  const user = useSelector(state => state.userReducer.user)

//   useEffect( async()=>{
    
//         let user = await getCurrentUserData()
//         setData(user)
//   },[])

  return(
        
        <div style={{width:'400px',height:'180px','margin-left':'10px'}}>
            <br/>
            <h3>{user.fullname}</h3>
            <br/>
            <h3 style={{color:'grey'}}>Email: </h3><h3 style={{color : '#1B18B9'}}> {user.email}</h3>
            <br/>
            <h3 style={{color:'grey'}}>Contact No: </h3><h3 style={{color : '#1B18B9'}}>{user.contactno}</h3>
            <br/>
            <img src={user.url} style={{width:'220px',height:'150px'}}/>
        </div>
  );
}

