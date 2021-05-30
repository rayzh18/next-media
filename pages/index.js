import Router from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import { useEffect } from "react";
import { useStateContext } from "../components/HBOProvider";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import { useRouter } from "next/router";
import AuthCheck from "../components/AuthCheck";
import LazyLoad from "react-lazyload";
import Placeholders from '../components/UI/Placeholders/PlaceHolders'
export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();

  useEffect(() => {}, []);
  //AuthCheck (Higher Order Function: Authenticates components)
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia />
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Movies" type="large-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Series" type="small-h" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Action" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Horror" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Animations" type="large-h" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow title="Sci-fi" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
    </MainLayout>
  );
}
