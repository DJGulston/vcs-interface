import {Link} from 'react-router-dom';
import React from 'react';

/**
 * Component that displays the Navigation Menu Search link.
 * @param {*} props 
 * @returns 
 */
export function NavMenu(props) {
    return(
        <nav className='header-item-2'>
            <Link className='link-item' to='/'>Search</Link>
        </nav>
    );
}