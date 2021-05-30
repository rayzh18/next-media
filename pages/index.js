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

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();

  useEffect(() => {}, []);
  //AuthCheck (Higher Order Function: Authenticates components)
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia />
      <LazyLoad height={680} offset={-200} placeholder={<h1>Loading</h1>}>
        <MediaRow title="Movies" type="large-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad height={333} offset={-200}>
        <MediaRow title="Series" type="small-h" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad height={440} offset={-200}>
        <MediaRow title="Action" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad height={200}>
        <MediaRow title="Horror" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad height={200}>
        <MediaRow title="Animations" type="large-h" endpoint="api/movies/234" />
      </LazyLoad>
      <LazyLoad height={200}>
        <MediaRow title="Sci-fi" type="small-v" endpoint="api/movies/234" />
      </LazyLoad>
    </MainLayout>
  );
}
