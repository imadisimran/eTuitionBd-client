import React from "react";

const TutorDashboardHome = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
      <h2 className="text-xl font-bold">Using pipeline this can be dynamic</h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Tuition Posts</div>
          <div className="stat-value">20</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Applications</div>
          <div className="stat-value">4,200</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Paid</div>
          <div className="stat-value">1,200</div>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardHome;
