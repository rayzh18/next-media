import Router from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import {useEffect} from 'react';
import {useStateContext} from '../components/HBOProvider';
import Login from '../components/UI/Login/Login';
import {useRouter} from 'next/router'

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();

  useEffect(()=> {
   
  }, [])
  return (
    <div>
       SHOW HOME PAGE
    </div>
  )
}
