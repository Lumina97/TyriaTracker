import { useEffect, useState } from "react";
import { TUser, useAPI } from "../../Providers/APIProvider";
import AccountAPIKeyEntry from "./AccountAPIKeyEntry";
import AccountDataEntry from "./AccountDataEntry";
import AccountInformationEditModal from "./AccountInformationEditModal";

export enum EAccountEditOptions {
  none,
  email,
  password,
  APIKey,
}

const AccountDataComponent = () => {
  const { GetUser, updateUserInformation } = useAPI();
  const [accountDataToChange, setAccountDataToChange] =
    useState<EAccountEditOptions>(EAccountEditOptions.none);
  const [currentFieldData, setCurrentFieldData] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowEditModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const EditUserInformation = (newFieldData: string) => {
    const newUser: TUser = {
      email:
        accountDataToChange === EAccountEditOptions.email
          ? newFieldData
          : GetUser().email,
      password:
        accountDataToChange === EAccountEditOptions.password
          ? newFieldData
          : undefined,
      APIKey:
        accountDataToChange === EAccountEditOptions.APIKey
          ? newFieldData
          : GetUser().APIKey,
      jwt: GetUser().jwt,
    };
    updateUserInformation(newUser).then(() => {
      setShowEditModal(false);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-12 ">
        <div className=" flex  flex-col w-1/3">
          <h3 className="text-2xl font-bold pb-4 flex flex-col">
            Account Information
          </h3>
          <AccountDataEntry
            title="Email:"
            value={GetUser().email}
            onClick={() => {
              setAccountDataToChange(EAccountEditOptions.email);
              setCurrentFieldData(GetUser().email);
              setShowEditModal(true);
            }}
          />
          <AccountDataEntry
            title="Password:"
            value={"********"}
            onClick={() => {
              setAccountDataToChange(EAccountEditOptions.password);
              setCurrentFieldData("********");
              setShowEditModal(true);
            }}
          />
        </div>
        <div className="flex-col w-1/3">
          <h3 className="text-2xl pb-4 font-bold">API Key</h3>
          {GetUser().APIKey && (
            <AccountAPIKeyEntry
              apiKey={GetUser().APIKey}
              onClick={() => {
                setAccountDataToChange(EAccountEditOptions.APIKey);
                setCurrentFieldData(GetUser().APIKey);
                setShowEditModal(true);
              }}
            />
          )}
        </div>
      </div>

      {showEditModal && (
        <AccountInformationEditModal
          options={accountDataToChange}
          currentFieldData={currentFieldData}
          OnSubmit={EditUserInformation}
          OnCancel={() => {
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
};

export default AccountDataComponent;
