import React from 'react';
import {Home} from './Svgs';
import {Link} from 'react-router-dom';

const About =()=>{
  return (
    <div className="container" style={{
      fontSize:"16px",
      height: "100vh",
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      width: "100%",
      margin: "20px",
    }}>
      <h2>About</h2>
      <p style={{
        marginTop: "10px",
        textAlign: "center",
      }}>
        Hi, I am Akshay Kanade. This is a fun project that I build to practice my React skills. 
        This site shows you random anime quotes using some fun APIs. If you want to check how 
        I build it you can check my <a href="https://github.com/akshay782/anime_quotes">GitHub Repo</a> about this.
      </p>

      <h4 style={{
        color: "red",
        marginTop: "20px",
        textDecoration: "underline",
      }}>Note</h4>
      
      <p style={{
        marginTop: "10px",
        textAlign: "center",
      }}>
        I am using two APIs for image and quote respectively. So sometimes character name and 
        image will not match. It happens only when the character's name sounds similar. 
        But If you are an Anime nerd you will immediately notice.
      </p>
      <button style={{
        marginTop:"10px",
        width:"50px",
        height:"50px",
        border:"none",
        borderRadius:"50%",
        background:"gray",
        cursor:"pointer"
      }}>
        <Link to="/">
          <Home/>
        </Link>
      </button>
    </div>
  );
}

export default About;