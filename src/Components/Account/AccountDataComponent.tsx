import { TUser, useAPI } from "../../Providers/APIProvider";
import AccountAPIKeyEntry from "./AccountAPIKeyEntry";
import AccountDataEntry from "./AccountDataEntry";

const AccountDataComponent = () => {
  const { GetUser } = useAPI();
  const user = GetUser();
  return (
    <>
      <div className="w-3/4 m-auto mt-16 bg-neutral-400 p-12 rounded-sm">
        <h3 className="text-2xl font-bold pb-4">Account Information</h3>

        <AccountDataEntry
          title="Email:"
          value={user && user.email ? user.email : "No user logged in"}
          onClick={() => {}}
        />

        <AccountDataEntry
          title="Password:"
          value={"********"}
          onClick={() => {}}
        />
      </div>
      <div className="w-3/4 m-auto mt-16 font-bold bg-neutral-400 p-12 rounded-sm relative">
        <h3 className="text-2xl pb-4">API Key</h3>
        {/* <button className="border-sun border-2 px-4 bg-sun text-white py-1 absolute top-2 right-2 ">
          Add key
        </button> */}
        {user && user.apiKey && (
          <AccountAPIKeyEntry apiKey={user.apiKey} onClick={() => {}} />
        )}
      </div>
    </>
  );
};

export default AccountDataComponent;
