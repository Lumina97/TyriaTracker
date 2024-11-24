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
    <div className="rounded-md absolute drop-shadow-black   sm:left-1/2 sm:-translate-x-1/2   m-auto px-4 top-1/4 sm:top-1/2 sm:-translate-y-1/2  w-[98%] ml-[01%] sm:w-3/4 md:max-w-[650px]  h-1/2 text-white bg-slate-800 border-white border-[1px]">
      <div className="flex flex-col pb-4 pt-16 items-center gap-6 w-3/4 m-auto h-full sm:w-full sm:m-0 ">
        <div className="w-full flex-col justify-between whitespace-pre flex sm:flex-col md:flex-row gap-4 ">
          <p>Current {dataFieldName()}</p>
          <p className="text-wrap">{currentFieldData}</p>
        </div>
        <div className="w-full justify-between sm:flex-col flex flex-col pt-4 md:flex-row gap-4">
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
        <div className="w-full pt-4 justify-end flex sm:flex-col   flex-col md:flex-row gap-4">
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
