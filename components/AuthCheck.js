import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import ls from 'local-storage';
import {useMounted}  from './Hooks/useMounted';

const AuthCheck = (component) => {
    const router = useRouter()
    const {hasMounted} = useMounted()
    let activeUID = ls('activeUID')
    let users = ls('users') !== null ? ls('users') : []

    useEffect(() => {
        //if there is a user then redirect to login page
        // if(users.length >= 1){
        //     router.push('/login')
        // }
        //if there are no users than redirect to create page
        if(activeUID === null && users < 1){
            router.push('/create')
        }
    //empty bracket used to run only once
    }, [])

    if(users.length >= 1 && activeUID !== null){
        return hasMounted ? (component) : (
            <div className="crate-user">
                <div className="create-user__top">
                    <div className="create-user__logo">

                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="crate-user">
                <div className="create-user__top">
                    <div className="create-user__logo">

                    </div>
                </div>
            </div>
        )
    }

    return component
}

export default AuthCheck;