import React from 'react';
import not_available_img from '../images/not_available_img.png';
import loading_img from '../images/loading_img.png';

const Character_Image = (props)=>{
  const {img} = props;
  return (
    <div className="img">
      <img className="img__char" src={img} alt=""/>
    </div>
  );
}

const Loading_Image = ()=>{
  return (
    <div className="img">
      <img className="img__char" src={loading_img} alt=""/>
    </div>
  )
}

const Image_NotAvailable = ()=>{
  return (
    <div className="img">
      <img className="img__char" src={not_available_img} alt=""/>
    </div>
  )
}

export {
    Character_Image,
    Loading_Image,
    Image_NotAvailable,
}