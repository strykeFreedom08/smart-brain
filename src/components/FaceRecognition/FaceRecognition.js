import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="face recognition" src={imageUrl} width='600px' height='auto' />
                <div id="boundingBox"></div>
            </div>
        </div>
    );
}

export default FaceRecognition;