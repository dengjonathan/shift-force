import * as React from 'react';
import {Link} from 'react-router';

export default () => (
  <nav className='nav'>
    <div className='navContent'>
      <h1 className='navTitle'>SHIFTforce</h1>
        <Link className='navLink' activeClassName='active' to='/'>Home</Link>
        <Link className='navLink' activeClassName='active' to='/about'>About</Link>
        <Link className='navLink' activeClassName='active' to='/dashboard'>Dashboard</Link>
    </div>
  </nav>
);
