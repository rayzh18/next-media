import Router from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import {useEffect} from 'react';
import {useStateContext} from '../components/HBOProvider';
import MainLayout from '../components/Layouts/MainLayout'
import FeaturedMedia from '../components/UI/FeaturedMedia/FeaturedMedia'
import ForYouList from '../components/UI/ForYouList/ForYouList'
import JustAdded from '../components/UI/JustAdded/JustAdded'
import PosterView from '../components/UI/PosterView/PosterView'
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
      <ForYouList />
      <JustAdded />
      <PosterView />
    </MainLayout>
  )
}
