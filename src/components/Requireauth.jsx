import { UrlState } from '@/Context';
import React, { Children, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

function Requireauth({children}) {
    const navigate = useNavigate();
    const {loading, isAuthenticated} = UrlState();
    useEffect(()=>{
        if(!isAuthenticated && !loading) navigate('/auth');
    }, [isAuthenticated, loading])
    if(loading) return <BarLoader width={"100%"} color={"#36d7b7"} />;
    if(isAuthenticated) return children;
}

export default Requireauth
