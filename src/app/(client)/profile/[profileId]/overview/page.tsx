import React from "react";
import StatCard from "./_components/stat-card";

const OverviewProfile = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard stat="Posts" number={100} />
      <StatCard stat="Posts" number={100} />
      <StatCard stat="Posts" number={100} />
      <StatCard stat="Posts" number={100} />
    </div>
  );
};

export default OverviewProfile;
