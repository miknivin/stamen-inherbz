import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


export default function service() {
  return (
    <section className="service-section sec-pad">
    <div className="auto-container">
      <div className="sec-title mb_50 centred">
        {/* <span className="sub-title">Our Services</span> */}
        <h2>Boost Your Confidence,<br /> Deepen Your Connection</h2>
      </div>
      <div className="row clearfix">
        <div className="col-lg-4 col-md-6 col-sm-12 service-block">
          <div className="service-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <div className="image-box">
                <figure className="image"><div><img src="assets/images/service/service-3.webp" alt="" /></div></figure>
                {/* <div className="icon-box d-flex align-items-center justify-content-center"><FontAwesomeIcon color='#df2232' icon={faCheck} width={50} /></div> */}
              </div>
              {/* <div className="lower-content">
                <h3><div>Endurance</div></h3>
                <p>Natural botanical formula extends intimate moments up to 3 hours with controlled sensitivity</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 service-block">
          <div className="service-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <div className="image-box">
                <figure className="image"><div ><img src="assets/images/service/service-2.webp" alt="" /></div></figure>
                {/* <div className="icon-box d-flex align-items-center justify-content-center"><FontAwesomeIcon color='#df2232' icon={faCheck} width={50} /></div> */}
              </div>
              {/* <div className="lower-content">
                <h3><div>Safety</div></h3>
                <p>Side-effect free herbal blend ensures peace of mind while delivering consistent performance</p>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 service-block">
          <div className="service-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
            <div className="inner-box">
              <div className="image-box">
                <figure className="image"><div><img src="assets/images/service/service-1.webp" alt="" /></div></figure>
                {/* <div className="icon-box d-flex align-items-center justify-content-center"><FontAwesomeIcon color='#df2232' icon={faCheck} width={50} /></div> */}
              </div>
              {/* <div className="lower-content">
                <h3><div>Simplicity</div></h3>
                <p>Quick-absorbing cream requires just one targeted application to work effectively within minutes</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
