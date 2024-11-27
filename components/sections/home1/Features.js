import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
export default function feature() {
  return (
    <section className="feature-section pt_120 pb_90">
    <div className="shape" style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}></div>
    <div className="auto-container">
      <div className="row clearfix align-items-stretch">
        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-one h-100">
            <div className="inner-box d-flex flex-column justify-content-between h-100">
              <div className="icon-box d-flex justify-content-center"><FontAwesomeIcon width={40} icon={faCheckToSlot}/></div>
              <h3><Link href="/">Regulates premature ejaculation </Link></h3>
              <p>More time, more confidence, more pleasure.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-one h-100">
            <div className="inner-box d-flex flex-column justify-content-between h-100">
              <div className="icon-box d-flex justify-content-center"><FontAwesomeIcon width={40} icon={faCheckToSlot}/></div>
              <h3><Link href="/">The Power of Botanical Extracts</Link></h3>
              <p>Harnesses the potent properties of 7 exotic plant extracts.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-one h-100">
            <div className="inner-box d-flex flex-column justify-content-between h-100">
              <div className="icon-box d-flex justify-content-center"><FontAwesomeIcon width={40} icon={faCheckToSlot}/></div>
              <h3><Link href="/">Revitalise Your Intimacy</Link></h3>
              <p>Regain control and reignite the spark by lasting longer.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
          <div className="feature-block-one h-100">
            <div className="inner-box d-flex flex-column justify-content-between h-100">
              <div className="icon-box d-flex justify-content-center"><FontAwesomeIcon width={40} icon={faCheckToSlot}/></div>
              <h3><Link href="/">Simple, Discreet Application</Link></h3>
              <p>Easy and discreet. Simply apply a small amount.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
