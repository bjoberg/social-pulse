import React from 'react';
import DashboardApp from './DashboardApp';
// import DashboardProfile from './DashboardProfile';
// Styles
import styles from '../../main.css';

export function Dashboard() {
  return (
    <div className={styles.container}>
      <DashboardApp />
    </div>
  );
}

export default Dashboard;
