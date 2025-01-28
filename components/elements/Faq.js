'use client';

import { faqData } from "@/utils/faqData";
import React, { useState, useEffect, useMemo } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify
import '../../public/assets/css/module-css/faq.css';

export default function Faq() {
    const [isActive, setIsActive] = useState({ key: null });

    // Memoize the DOMPurify instance to ensure it works only in the browser
    const domPurifyInstance = useMemo(() => {
        if (typeof window !== "undefined") {
            return DOMPurify;
        }
        return null;
    }, []);

    const handleToggle = (key) => {
        setIsActive((prevState) =>
            prevState.key === key ? { key: null } : { key }
        );
    };

    return (
        <section className="faq-section sec-pad">
            <div className="auto-container">
                <div className="sec-title centred mb_50">
                    <span className="sub-title">FAQ'S</span>
                    <h2 className="title-text">Do You Have Any Questions?</h2>
                </div>
                <div className="row clearfix">
                    {faqData.map((faq) => (
                        <div className="col-lg-6 col-md-12 col-sm-12 accordion-column" key={faq.id}>
                            <div className="content-box">
                                <ul className="accordion-box">
                                    <li className="accordion block">
                                        <div
                                            className={isActive.key === faq.id ? "acc-btn active" : "acc-btn"}
                                            onClick={() => handleToggle(faq.id)}
                                        >
                                            <div className="icon-box">
                                                <i className="icon-34"></i>
                                            </div>
                                            <h4 style={{fontSize:"calc(0.8rem + 0.3vw)"}}>{faq.question}</h4>
                                        </div>
                                        <div
                                            className={isActive.key === faq.id ? "acc-content current" : "acc-content"}
                                        >
                                            <div className="content">
                                                <div
                                                    className="text"
                                                    dangerouslySetInnerHTML={{
                                                        __html: domPurifyInstance
                                                            ? domPurifyInstance.sanitize(faq.answer)
                                                            : faq.answer,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
