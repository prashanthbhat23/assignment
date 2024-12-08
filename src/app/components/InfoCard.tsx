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
      className={`flex flex-col sm:flex-row items-center p-4 sm:p-6 rounded-lg shadow-md bg-${bgColor} text-${textColor} hover:scale-105 transition-transform`}
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white">
        {icon}
      </div>
      {/* Title and Count */}
      <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
        <p className="text-sm sm:text-base font-medium">{title}</p>
        <p className="text-xl sm:text-2xl font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default InfoCard;
