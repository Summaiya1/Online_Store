import { useState,useEffect} from 'react';
import {searchResults} from '../../config/firebase';
 import Ads from '../Ads';


export default function Search(props)
{
    
    const [finalResults,setFinalResults] = useState([])

    
    useEffect(async ()=>{
        try {
            const results = await searchResults(props.value)
            setFinalResults(results)
            console.log(results)
         } catch (e) {
             alert(e.message);
         }
    
  
    },[])

return(
    <div>
        
        {finalResults.map((result,index) => <Ads title={result.title}  price={result.price} images={result.images}  key={index} id={result.id}/>)}        
        <hr/>
    </div>
);
}



