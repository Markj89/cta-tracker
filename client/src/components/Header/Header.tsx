/**
 * Header Component
 * Create a Header Component
 * @type {Component}
 * @returns JSX.Element
 */

import React from 'react';
import white_logo from './../../assets/img/logo (white).png';
import clsx from 'clsx';

const Header: React.FC = ({ }) => {
    return (
        <header className={clsx('z-10 top-0 fixed inset-x-0 border-b border-white/5')}>
            <nav className={clsx('bg-white')}>
                <div className={clsx('p-1 header-wrapper')}>
                    <figure>
                        <img src={white_logo} alt="Logo" width={150} />
                        <figcaption style={{ display: 'none' }}>Logo</figcaption>
                    </figure>
                </div>
            </nav>
        </header>
    );
}

export default Header;