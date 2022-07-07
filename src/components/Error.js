import React from 'react';
import {Home} from './Svgs';
import error_cloud from '../images/error_cloud.png';
import {Link} from 'react-router-dom';

const Error = () =>{
  return (
    <div style={{
      height:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <img style={{
        height:"70px",
        width:"70px",
      }} src={error_cloud} alt="error cloud" />
      <h2 style={{
        color:"red"
      }}>Opps !!</h2>
      <h3>Something happens</h3>
      <Link to="/">
        <button style={{
          marginTop:"10px",
          width:"50px",
          height:"50px",
          border:"none",
          borderRadius:"50%",
          background:"gray",
          cursor:"pointer"
        }}>
          <Home/>
        </button>
      </Link>
    </div>
  );
}

export default Error;