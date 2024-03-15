import React from 'react';
import black_logo from './../assets/img/logo(black).png';

const headerStyles = {
  width: '200px',
  height: '100%'
};

const Logo = () => {
  return (
    <figure>
      <img src={black_logo} alt="Logo" style={{ width: headerStyles.width}} />
      <figcaption style={{ display: 'none' }}>Logo</figcaption>
    </figure>
  )
}
export default Logo;
