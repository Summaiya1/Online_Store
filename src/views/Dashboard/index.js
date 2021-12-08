import Ads from '../../views/Ads';
import { useEffect,useState } from 'react';
import {withRouter} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { getAllAds} from '../../config/firebase'
import {updateAds} from '../../store/actions/adsAction'




function Dashboard()
{
 const [ads, setAds] = useState([]);
    //const theme = useSelector(state => state.themeReducer.theme)
    const dispatch = useDispatch()
    const ad = useSelector(state => state.adsReducer.ads)
    // console.log(ads)
    

    useEffect(() => {
        // const tempAds = await getAllAds()
        
        dispatch(updateAds())
         
         setAds(ad);
        // setAds(tempAds)}
       
    },[]
    )
  //background:theme
 return(
  
    <div style={{display:'flex',flexDirection:'row','flex-wrap': 'wrap'}}>
    {ads && ads.map((item,index) => 
      <Ads key={index} title={item.title} description={item.description} price={item.price} images={item.images} uid={item.uid} id={item.id}/>)}
    </div>);
}

export default withRouter(Dashboard);

