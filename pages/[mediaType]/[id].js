import Head from 'next/head'
import {useEffect, useState} from 'react'
import MainLayout from '../../components/Layouts/MainLayout'
import CastInfo from '../../components/UI/CastInfo/CastInfo'
import FeaturedMedia from '../../components/UI/FeaturedMedia/FeaturedMedia'
import MediaRow from '../../components/UI/MediaRow/MediaRow'
import AuthCheck from '../../components/AuthCheck'
import {useRouter} from 'next/router'
import axios from 'axios'
import LazyLoad from "react-lazyload";
import Placeholders from '../../components/UI/Placeholders/PlaceHolders'

export default function SingleMediaPage(props) {
    const router = useRouter()
    // const [mediaData, setMediaData] = useState(false)
    // const {id} = router.query
    // useEffect(() => {
    //     axios 
    //       .get(`https://api.themoviedb.org/3/movie/${props.query.id}?api_key=${process.env.tmdbKey}`)
    //       .then(function (response) {
    //         setMediaData(response.data)
    //         console.log(response)
    //       })
    //       .catch(function(error){
    //         console.log('Error Response')
    //       })
    //   }, [mediaData])
    console.log("[id]", props)
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia title={props.query.mediaType === 'movie' ?  props.mediaData.title : props.mediaData.name} 
      mediaUrl={`https://image.tmdb.org/t/p/w1280${props.mediaData.backdrop_path}`} 
      location="In theaters and on HBO MAX. Streaming throughout May 23." 
      linkUrl="/movies/id" 
      type="single"
      />
      <LazyLoad offset={-400} placeholder={<Placeholders title="Movies" type="large-v" />}>
        <MediaRow
        updateData={props.query.id}
         title="More Like This" 
         type="small-v" mediaType={props.query.mediaType} 
         endpoint={`${props.query.mediaType === 'movie' ? 'movie' : 'tv'}/${props.query.id}/similar?`} 
         />
      </LazyLoad>      
      <CastInfo mediaID={props.query.id} mediaType={props.query.mediaType} updateData={props.query.id}/>
    </MainLayout>
  )
}

export async function getServerSideProps(context){
    let mediaData;
    try{
      mediaData = await axios.get(`https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=${process.env.tmdbKey}`)
    } catch(error){
      console.log(error)
    }
    return {
        props: {mediaData: mediaData.data, query: context.query},
    }
}
