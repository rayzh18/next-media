import Router from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import {useEffect} from 'react';
import {useStateContext} from '../components/HBOProvider';
import MainLayout from '../components/Layouts/MainLayout'
import FeaturedMedia from '../components/UI/FeaturedMedia/FeaturedMedia'
import MediaRow from '../components/UI/MediaRow/MediaRow'
import {useRouter} from 'next/router'
import AuthCheck from '../components/AuthCheck'

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();

  useEffect(()=> {
   
  }, [])
  //AuthCheck (Higher Order Function: Authenticates components)
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia />
      <MediaRow title="Movies" type="large-v" endpoint="api/movies/234" />
      <MediaRow title="Series" type="small-h" endpoint="api/movies/234"/>
      <MediaRow title="Action" type="small-v" endpoint="api/movies/234"/>
      <MediaRow title="Horror" type="small-v" endpoint="api/movies/234"/>
      <MediaRow title="Sci-fi" type="small-v" endpoint="api/movies/234"/>


    </MainLayout>
  )
}
