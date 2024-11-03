import React, { ReactEventHandler } from "react";

const AccountAPIKeyEntry = ({
  apiKey,
  onClick,
}: {
  apiKey: string;
  onClick: ReactEventHandler;
}) => {
  return (
    <div className="flex w-full justify-between">
      <span>{apiKey}</span>
      <button className="hover:scale-110 origin-left" onClick={onClick}>
        Edit
      </button>
    </div>
  );
};

export default AccountAPIKeyEntry;
