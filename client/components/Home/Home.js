import React from 'react';
import styles from './Home.css';
export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1> Pulse </h1>
        <p className={styles.mainparagraph}>
          <br />This is a paragraph. Bl ahBl ahBl ahBl ahBlahBl ahBlah B la hBlah Bla hBlahB lahBlah BlahB lahBla hBlah BlahBla hBla hBla hBlahBl ahB
                lahBlahB lahBla hBla hBlahBlahB lah BlahBlahB lah BlahB lahBlahBl ahBlahBlahBla hBlahBl ahB lah BlahBl ahBlahBl ahBlahB lah BlahBlah
          <br /> <br /> <br />
        </p>
        <h2> Testimonial 1 </h2>
      </div>
    </div>
  );
}

export default Home;
