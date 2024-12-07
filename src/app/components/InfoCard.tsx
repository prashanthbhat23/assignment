import React from "react";

interface InfoCardProps {
  title: string; 
  count: number | string; 
  icon: React.ReactNode; 
  bgColor: string; 
  textColor: string; 
}

const InfoCard: React.FC<InfoCardProps> = ({ title, count, icon, bgColor, textColor }) => {
    return (
      <div
        className={`flex items-center p-4 rounded-lg shadow-md ${bgColor} text-${textColor}`}
      >
        {/* Icon Container */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
          {icon}
        </div>
        {/* Title and Count */}
        <div className="ml-4">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-semibold">{count}</p>
        </div>
      </div>
    );
  };
  
  export default InfoCard;
  