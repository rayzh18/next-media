import Head from "next/head";
import { useEffect } from "react";
import { useStateContext } from "../../components/HBOProvider";
import MainLayout from "../../components/Layouts/MainLayout";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import { useRouter } from "next/router";
import AuthCheck from "../../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../../components/UI/Placeholders/PlaceHolders";
import GenreNav from "../../components/UI/GenreNav/GenreNav";
import { get } from "local-storage";
import axios from "axios";
import { shuffleArray } from "../../components/utilities";

export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();

  const showRandomMedia = () => {
    let thumbType;
    return props.genresData.map((item) => {
      thumbType = shuffleArray(globalState.thumbTypes)[0];
      return (
        <div key={item.id}>
          <LazyLoad
            offset={-200}
            placeholder={
              <Placeholders title={item.name} type={thumbType} key={item.id} />
            }
          >
            <MediaRow
              title={item.name}
              type={thumbType}
              changeData={props.query.mediaType}
              endpoint={`discover/${props.query.mediaType}?with_genres=${item.id}&sort_by=popularity.desc&primary_release_year=2021`}
            />
          </LazyLoad>
        </div>
      );
    });
  };
  console.log("mediaType index", props)

  //AuthCheck (Higher Order Function: Authenticates components)
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        mediaUrl={`https://image.tmdb.org/t/p/w1280${props.featuredData.backdrop_path}`}
        title={
          props.query.mediaType === "movie"
            ? props.featuredData.title
            : props.featuredData.name
        }
        linkUrl={`/${props.query.mediaType}/${props.featuredData.id}`}
        type="single"
        mediaType={props.query.mediaType}
        mediaId={props.featuredData.id}
      />
      <GenreNav
        mediaType={props.query.mediaType}
        genresData={props.genresData}
      />
      {showRandomMedia()}
    </MainLayout>
  );
}

//getServerSideProps gets data before it loads
//data is passed down as props
export async function getServerSideProps(context) {
  let genresData;
  let featuredData;
  try {
    //get data from genres axios call
    genresData = await axios.get(
      `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=${process.env.tmdbKey}`
    );
    //get data from featured axios call
    featuredData = await axios.get(
      `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&api_key=${process.env.tmdbKey}`
    );
    console.log("genresData");
    console.log(genresData.data);
  } catch (error) {
    console.log("error");
    console.log(error);
  }
  console.log(genresData);
  //returns genres, features, and queries
  return {
    props: {
      genresData: genresData.data.genres,
      featuredData: shuffleArray(featuredData.data.results)[0],
      query: context.query,
    },
  };
}
