import React, { ReactEventHandler } from "react";

const AccountDataEntry = ({
  title,
  value,
  onClick,
}: {
  title: string;
  value: string;
  onClick: ReactEventHandler;
}) => {
  return (
    <div className="flex flex-col pb-6 sm:pb-0 sm:flex-row   text-left w-full justify-between">
      <span>{title}</span>
      <div className="flex flex-col sm:flex-row  gap-2">
        <span>{value}</span>
        <button
          className="hover:scale-110 text-left   origin-left"
          onClick={onClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default AccountDataEntry;
