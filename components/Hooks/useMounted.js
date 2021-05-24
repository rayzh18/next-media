import {useEffect, useState} from 'react';

//This react hook checks if the component has mounted or not
export const useMounted = () => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])
    return { hasMounted }
}