import Button from 'react-bootstrap/Button';
import {getUserData,getAdData} from '../../config/firebase'
import FbImageLibrary from 'react-fb-image-grid'
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';



function AdDetails()
{

//    const {title,description,price,images} = props.adData;
    const [data,setData] = useState({})
    const [data2,setData2] = useState({})
    let {id} = useParams();
    console.log(id)
    

   useEffect(async () => {
    const result = await getAdData(id);
    setData(result)
    let result2 = await getUserData(result.uid)
    setData2(result2)
    
    
    
  }, [])
  
   return(
    <div>
      <div style={{width:'400px',height:'180px',display:'flex'}}>
        <FbImageLibrary images={data.images}/>
        <div>
            <br/>
            <h3>{data.title}</h3>
            <br/>
            <h4 style={{color:'grey'}}>Rs: {data.price}</h4>
            <br/>
            <h5 style={{color:'grey'}}>Description: <br/> {data.description}</h5>
            <br/>
            <h5>Seller Name: </h5><h5 style={{color : '#1B18B9'}}>{data2.fullname}</h5>
            <br/>
            <h5>Seller Contact No: </h5><h5 style={{color : '#1B18B9'}}>{data2.contactno}</h5>
            <br/>
            <h5>Seller Email: </h5><h5 style={{color : '#1B18B9'}}>{data2.email}</h5>
            <Button>Buy</Button>
        </div>

        </div>
        
    </div>
     
    );

}

export default AdDetails;


