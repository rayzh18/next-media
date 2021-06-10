import Head from "next/head";
import { useEffect } from "react";
import { useStateContext } from "../../../components/HBOProvider";
import MainLayout from "../../../components/Layouts/MainLayout";
import FeaturedMedia from "../../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../../components/UI/MediaRow/MediaRow";
import { useRouter } from "next/router";
import AuthCheck from "../../../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from "../../../components/UI/Placeholders/PlaceHolders";
import GenreNav from "../../../components/UI/GenreNav/GenreNav";
import { get } from "local-storage";
import axios from "axios";
import { shuffleArray } from "../../../components/utilities";

export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();

  const showRandomMedia = () => {
    let thumbType;
    return props.genresData.map((item, index) => {
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
              updateData={props.query.genre_id}
              title={item.name}
              type={thumbType}
              endpoint={`discover/${props.query.mediaType}?with_genres=${props.query.genre_id}&sort_by=popularity.desc&primary_release_year=2021&page=${index + 1}`}
            />
          </LazyLoad>
        </div>
      );
    });
  };
  console.log("[genre_id]", props)
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
      `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&with_genres=${context.query.genre_id}&api_key=${process.env.tmdbKey}`
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
