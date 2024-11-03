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
    <>
      <div className="flex w-full justify-between">
        <span>{title}</span>
        <div className="flex gap-4">
          <span>{value}</span>
          <button onClick={onClick}>Edit</button>
        </div>
      </div>
    </>
  );
};

export default AccountDataEntry;
