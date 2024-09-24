import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  stat: string;
  number: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ stat, number }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
