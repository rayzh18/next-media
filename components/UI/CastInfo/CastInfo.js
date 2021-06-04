import {useState, useEffect} from 'react'
import axios from 'axios';


const CastInfo = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [credits, setCredits] = useState([]);
  useEffect(() => {
    axios 
      .get(`https://api.themoviedb.org/3/${props.mediaType === 'movie' ? 'movie' : 'tv'}/${props.mediaID}/credits?api_key=${process.env.tmdbKey}`)
      .then(function (response) {
        setCredits(response.data)
        setLoadingData(false)
        console.log(response.data)
      })
      .catch(function(error){
        console.log('Error Response')
        console.log(error)
      })
  }, [])
  
  const showCast = () => {
    //data will show once it is loaded
    if(loadingData !== true){
      return credits.cast.map((item) => {
        return(
          <ul className="cast-info__crew">
            <li>
              {item.character}
            </li>
            <li>
              {item.name}
            </li>
          </ul>
        )
      })
    } else {
      return(<div>Loading Cast</div>)
    }
  }

  const showCrew = () => {
    //data will show once it is loaded
    if(loadingData !== true){
      return credits.crew.map((item) => {
        return(
          <ul className="cast-info__crew">
            <li>
              {item.job}
            </li>
            <li>
              {item.name}
            </li>
          </ul>
        )
      })
    } else {
      return(<div>Loading Cast</div>)
    }
  }

  return(
    <div className="cast-info">
      <div className="cast-info__group-title">
        Cast
      </div>
      <div className="cast-info__list">
        {showCast()}
      </div>
      <div className="cast-info__group-title">
        Crew
      </div>
      <div className="cast-info__list">
       {showCrew()}
        
      </div>
    </div>
  )
}

export default CastInfo;
















