import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${show && "nav__black"}`}>
            <img className='nav__logo'
                src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/7500/Netflix_Logo_RGB-1024.png"
                alt='netflix_logo' />
            <img
                className='nav__avatar'
                src='https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-62wgyitks6f4l79m.webp'
                alt='netflix profile' />
        </div>
    );
}

export default Navbar;
