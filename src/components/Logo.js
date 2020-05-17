import React from 'react';
//import white_logo from './../assets/img/logo (white).png';
import black_logo from './../assets/img/logo(black).png';


const headerStyles = {
  width: '200px',
  height: '100%'
};

function Logo() {
  return (
    <figure>
      <img src={black_logo} alt="Logo" style={{ width: headerStyles.width}}  />
    </figure>
  )
}
export default Logo;
