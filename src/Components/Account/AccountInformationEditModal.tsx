import { useState } from "react";
import { EAccountEditOptions } from "./AccountDataComponent";

const AccountInformationEditModal = ({
  options,
  currentFieldData,
  OnSubmit,
  OnCancel,
}: {
  options: EAccountEditOptions;
  currentFieldData: string;
  OnSubmit: (newFieldData: string) => void;
  OnCancel: () => void;
}) => {
  const [newFieldData, setNewFieldData] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const dataFieldName = () => {
    switch (options) {
      case EAccountEditOptions.email:
        return "E-mail";

      case EAccountEditOptions.APIKey:
        return "API Key";

      case EAccountEditOptions.password:
        return "password";
    }
  };

  return (
    <div className="rounded-sm absolute top-1/2 -translate-y-1/2 translate-x-1/4 w-2/3 h-1/2 bg-sun">
      <div className="flex flex-col pt-16 items-center gap-6 w-2/3 m-auto h-full">
        <div className="w-full justify-between whitespace-pre flex flex-row gap-4">
          <p>Current {dataFieldName()}</p>
          <p className="text-wrap">{currentFieldData}</p>
        </div>
        <div className="w-full justify-between flex flex-row gap-4">
          <p>Enter new {dataFieldName()}</p>
          <input
            disabled={submitted}
            type={
              options === EAccountEditOptions.password ? "password" : "text"
            }
            onChange={(e) => {
              setNewFieldData(e.target.value);
            }}
          />
        </div>
        <div className="w-full justify-end flex flex-row gap-4">
          <button
            disabled={submitted}
            className="hover:scale-105 border-solid border-black rounded-sm border-[1px] px-6 py-1"
            onClick={() => {
              setSubmitted(true);
              OnSubmit(newFieldData);
            }}
          >
            Submit
          </button>
          <button
            disabled={submitted}
            className="hover:scale-105 border-solid border-black rounded-sm border-[1px] px-6 py-1"
            onClick={() => OnCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformationEditModal;
