import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    localStorage.setItem('token', '');
    
    useEffect(() => history.push('/login'), 
    // eslint-disable-next-line
    []);
    return (
        <div></div>
    )
}

export default Logout
