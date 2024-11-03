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
      <button onClick={onClick}>Edit</button>
    </div>
  );
};

export default AccountAPIKeyEntry;
