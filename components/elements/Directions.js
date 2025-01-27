'use client'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Directions() {
    const [isImage, setIsImage] = useState(false);

    return (
        <>
            <div  className="content-box">
                <div
                    className={`sec-title light d-flex justify-content-center align-items-center ${
                        isImage && 'change-pos' 
                    }`}
                >
                    {
                        !isImage?(
                            <button 
                            onClick={() => setIsImage(!isImage)} 
                            className="theme-btn btn-two"
                        >
                            <span>Show Directions to use</span>
                        </button>
                        ):(
                            <button 
                            onClick={() => setIsImage(!isImage)} 
                            className="theme-btn btn-two"
                        >
                            <span style={{borderRadius:'50%',display:"inline-flex"}}  className="p-4"><FontAwesomeIcon icon={faX} /></span>
                        </button>
                        )
                    }
                  
                </div>
                {isImage && (
                    <div className="sec-title light">
                        <img className="w-100" src="assets/images/background/chooseus-bg.webp" alt="directions" />
                    </div>
                )}
                 
            </div>
        </>
    );
}
