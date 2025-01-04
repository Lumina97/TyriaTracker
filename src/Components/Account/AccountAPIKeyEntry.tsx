import React, { ReactEventHandler, useState } from "react";

const AccountAPIKeyEntry = ({
  apiKey,
  onClick,
}: {
  apiKey: string;
  onClick: ReactEventHandler;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col sm:flex-row gap-4 justify-between">
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {isHovered ? apiKey : [...Array(17)].map(() => "*")}
      </span>
      <button
        className="hover:scale-110 origin-left text-left"
        onClick={onClick}
      >
        Edit
      </button>
    </div>
  );
};

export default AccountAPIKeyEntry;
