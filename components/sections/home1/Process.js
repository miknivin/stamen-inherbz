'use client'
import React, { useState } from 'react';

export default function Process() {
  const [showProcess, setShowProcess]=useState(false)

  return (
    <section className="process-section sec-pad">
      <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}></div>
      <div className="shape">
        <div className="shape-1 float-bob-x" style={{ backgroundImage: 'url(assets/images/shape/shape-20.png)' }}></div>
        <div className="shape-2 float-bob-y" style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}></div>
        <div className="shape-3"></div>
      </div>
      <div className="auto-container">
        
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
            <span className="sub-title">Process</span>
            <h2 className="text-white">Want to know <br/>How to use</h2>
            
        </div>
        {showProcess&&(
        <>
          <div className="inner-container gap-mobile-process mb-3">
          <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
          <div className="processing-block-one wow fadeInLeft animated card d-flex  justify-content-center align-items-center rounded-4" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box bg-white my-3 mx-2">
              <span className="count-text">01</span>
              {/* <figure className="image-box"><img src="assets/images/resource/process-1.jpg" alt="" /></figure> */}
              <div className="lower-content">
                <h3>Apply a Small Amount</h3>
                <p>Take a small amount of the cream on your fingertip, about the size of a pea or two. A little goes a long way with this concentrated formula.</p>
              </div>
            </div>
          </div>
          <div className="processing-block-one wow fadeInLeft animated card d-flex  justify-content-center align-items-center rounded-4" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box bg-white my-3 mx-2">
              <span className="count-text">02</span>
              {/* <figure className="image-box"><img src="assets/images/resource/process-2.jpg" alt="" /></figure> */}
              <div className="lower-content">
                <h3>Target the Glans and Corona</h3>
                <p>Apply the cream evenly over the upper and lower parts of the penile head/glans corona. Avoid application on the shaft. </p>
              </div>
            </div>
          </div>
          <div className="processing-block-one wow fadeInLeft animated card d-flex justify-content-center align-items-center rounded-4" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box bg-white my-3 mx-2">
              <span className="count-text">03</span>
              {/* <figure className="image-box"><img src="assets/images/resource/process-3.jpg" alt="" /></figure> */}
              <div className="lower-content">
                <h3>Wait for Absorption</h3>
                <p> Wait 30-40 minutes to allow full absorption into the skin before intimacy. During this time, the botanical extracts will take effect.</p>
              </div>
            </div>
          </div>
          </div>
          <div className="inner-container gap-mobile-process">
            <div className="arrow-shape" style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}></div>
            <div className="processing-block-one wow fadeInLeft animated card d-flex  justify-content-center align-items-center rounded-4" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box bg-white my-3 mx-2">
                <span className="count-text">04</span>
                {/* <figure className="image-box"><img src="assets/images/resource/process-1.jpg" alt="" /></figure> */}
                <div className="lower-content">
                  <h3>Remove Excess Cream</h3>
                  <p>Just before sexual activity, gently wipe away any excess cream with a soft cloth or rinse the area with water. The active compounds will have already been absorbed.</p>
                </div>
              </div>
            </div>
            <div className="processing-block-one wow fadeInLeft animated card d-flex  justify-content-center align-items-center rounded-4" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box bg-white my-3 mx-2">
                <span className="count-text">05</span>
                {/* <figure className="image-box"><img src="assets/images/resource/process-2.jpg" alt="" /></figure> */}
                <div className="lower-content">
                  <h3>Enjoy Prolonged Effects</h3>
                  <p>Stamen Cream's effects can last 2-3 hours, giving you an ample window to enjoy prolonged intimate play. </p>
                </div>
              </div>
            </div>
            <div  style={{minWidth:"300px"}} className="processing-block-one wow fadeInLeft animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box my-3 mx-2">
                {/* <span className="count-text">06</span> */}
                {/* <figure className="image-box"><img src="assets/images/resource/process-3.jpg" alt="" /></figure> */}
                <div className="lower-content">
                  <h3></h3>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </>
        )
        }
        <div className=' d-flex justify-content-center w-100'>
          <button onClick={()=>setShowProcess(!showProcess)} class="theme-btn btn-one my-3 text-center" role="button">
                <span>
                  {showProcess?"Read less":"Yes I want"}
                </span>
          </button>
        </div>
      </div>
      
    </section>
  );
};

