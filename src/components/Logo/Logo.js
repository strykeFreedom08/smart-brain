import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className="ma4 mt0 pa3" style={{ "maxWidth": '10em' }}>
            <Tilt>
                <div className="br3 shadow-2" style={{ paddingTop: '5px',  height: '110px', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' }}>
                    <img src={brain} alt="brain" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;