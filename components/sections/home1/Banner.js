import React from 'react';
import Link from "next/link";
import { nextArt } from '@/lib/font';
import BannerSlider from '@/components/slider/BannerSlider';

export default function Banner() {
  return (
    <section className="banner-section p_relative">
      <div className="pattern-layer wow slideInDown animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ backgroundImage: 'url(assets/images/shape/bg-banner.webp)' }}></div>
      <div className="shape">
        <div className="shape-1" style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}></div>
        <div className="shape-2 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}></div>
        <div className="shape-3" style={{ backgroundImage: 'url(assets/images/shape/shape-4.png)' }}></div>
        <div className="shape-4" style={{ backgroundImage: 'url(assets/images/shape/shape-5.png)' }}></div>
      </div>
      <div className="auto-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <span className="upper-text">Unleash Your Staying Power</span>
              <h2 style={{ fontFamily: `${nextArt.style.fontFamily} !important` }}>
                inHerbz <span>Stamen</span> Cream.
              </h2>

              <p className='mb-0'>Are you struggling with premature ejaculation? </p>
              <p  className='mb-0'>Do you wish you could last longer in bed to fully satisfy your partner?</p>
              <p  className='mb-5'>Introducing inHerbz Stamen Cream - the natural solution to help you control your climax and enjoy intimate moments without cutting them short.</p>
              <div className="btn-box">
                <Link href="/checkout" className="theme-btn btn-two"><span>Order now</span></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <div className="image float-bob-y">
                <BannerSlider/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

