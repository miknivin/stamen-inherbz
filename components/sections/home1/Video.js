'use client'
import React, { useState } from 'react';
import Link from "next/link";
import ModalVideo from 'react-modal-video'
export default function Video() {
    const [isOpen, setOpen] = useState(false)
  return (
    <>
    <section className="video-section p_relative">
      <div className="bg-layer parallax-bg" data-parallax='{"y": 100}' style={{ backgroundImage: 'url(assets/images/background/video-bg.webp)' }}></div>
      <figure className="image-layer"><img src="assets/images/resource/video-1.webp" alt="" /></figure>
      <div className="auto-container">
        <div className="inner-box">
          <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-17.png)' }}></div>
          {/* <div className="video-btn">
          <a onClick={() => setOpen(true)}><i className="fas fa-play"></i>
                            <span className="border-animation border-1"></span>
                            <span className="border-animation border-2"></span>
                            <span className="border-animation border-3"></span>
          </a>
          </div> */}
          <h2>Unlock Your Natural <br />Staying Power</h2>
          <div className="btn-box">
            <Link href="/checkout" className="theme-btn btn-one"><span>Order now</span></Link>
          </div>
        </div>
      </div>
    </section>
     <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="nfP5N9Yc72A" onClose={() => setOpen(false)} />
     </>
  );
};

