import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 lightest-blue">
                {'This magic brain will detect faces in your picture. Give it a try.'}
                <div className="center pt3">
                    <div className="form center pa4 br3 shadow-5">
                        <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
                        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue navy"
                        onClick={onButtonSubmit}>Detect</button>
                    </div>
                </div>
            </p>
        </div>
    );
}

export default ImageLinkForm;