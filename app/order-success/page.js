import styles from './order.module.css';

export default function Page() {
    return (
        <div style={{height:'100vh'}} className='w-100 d-flex justify-content-center align-items-center'>
        <div className={styles.card}>
          <button className={styles.dismiss} type="button">
            ×
          </button>
          <div className={styles.header}>
            <div className={styles.image}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20 7L9.00004 18L3.99994 13"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </div>
            <div className={styles.content}>
              <span className={styles.title}>Order validated</span>
              <p className={styles.message}>
                Thank you for your purchase. you package will be delivered within 2
                days of your purchase
              </p>
            </div>
            <div className={styles.actions}>
              <button className={styles.history} type="button">
                History
              </button>
              <button className={styles.track} type="button">
                Track my package
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}