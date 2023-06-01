import React from "react";

import "./index.css";

const Preloader = ({page = false}) => {
    return (
        <div className={`preloader__inner${page ? " page" : ""}`}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Preloader;
