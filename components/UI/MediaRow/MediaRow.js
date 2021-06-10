import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const MediaRow = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [movies, setMoviesData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.endpoint}&api_key=${process.env.tmdbKey}`
      )
      .then(function (response) {
        setMoviesData(response.data.results);
        setLoadingData(false);
        console.log("Success Response For " + props.title);
        console.log(response);
      })
      .catch(function (error) {
        console.log("Error Response For " + props.title);
      });
  }, [props.updateData]);
  console.log("mediarow", props)
  const loopComp = (comp, digit) => {
    let thumbnails = [<Skeleton key={'a'}/>, <Skeleton key={'b'}/>, <Skeleton key={'c'}/>, <Skeleton key={'d'}/>, <Skeleton key={'e'}/>, <Skeleton key={'f'}/>,<Skeleton key={'g'}/>, <Skeleton key={'h'}/>, <Skeleton key={'i'}/>];
    // for (let index = 1; index <= digit; index++) {
    //   thumbnails.push(comp);
    // }

    return thumbnails;
  };
  const showThumbnails = (type, changeData) => {
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : movies.map((movie) => {
          console.log('hi', changeData)
          return <Thumbnail key={movie.id} movieData={movie} type={type} mediaType={props.mediaType} />;
        });
  };

  // const thumbSize = (type) => {
  //   if(type === 'large-v'){
  //     return 400;
  //   }
  //   if(type === 'small-v'){
  //     return 240;
  //   }
  //   if(type === 'large-h'){
  //     return 700;
  //   }
  //   if(type === 'small-h'){
  //     return 450;
  //   }
  // }
 
  console.log(props)
  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">
        {showThumbnails(props.type)}
        {/* {loopComp((<Thumbnail />), 10)} */}
      </div>
    </div>
  );
};

const Thumbnail = (props) => {
  const thumbSize = (type) => {
    if (props.type === "large-v") {
      return "400";
    }
    if (props.type === "small-v") {
      return "185";
    }
    if (props.type === "large-h") {
      return "500";
    }
    if (props.type === "small-h") {
      return "342";
    }
  };
  //link each movie to its individual page
  return (
    <Link href={`/${props.mediaType === 'movie' ? 'movie' : 'tv'}/${props.movieData.id}`}>
      <a>
        <div className="media-row__thumbnail">
          <img
            src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}/${
              props.movieData.poster_path
            }`}
          />
          <div className="media-row__top-layer">
            <i className="fas fa-play" />
          </div>
        </div>
      </a>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};

MediaRow.defaultProps = {
  mediaType: 'movie'
}
export default MediaRow;
