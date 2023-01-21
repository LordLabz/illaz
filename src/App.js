import { ethers } from "ethers";
import { useState } from "react";
import "./App.css";
import { ApproveAllButton } from "./handlers/approveAllHandler";
import { UnwrapButton } from "./handlers/unwrapHandler";
import { WrapButton } from "./handlers/wrapHandler";
import { Button } from "./shared/components/Button";
import { Modal } from "./shared/components/Modal";


export default function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [tokenIds, setTokenIds] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      openModal("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const network = await provider.getNetwork();
      console.log(process.env.REACT_APP_NETWORK_CHAIN_ID);
      if (
        Number(network.chainId) !==
        Number(process.env.REACT_APP_NETWORK_CHAIN_ID)
      ) {
        openModal(
          `Please change to network ${process.env.REACT_APP_NETWORK_NAME}`
        );
        return;
      }
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      openModal(`Request Metamask account failed ${err}`);
    }
  };

  const openModal = (text) => {
    setModalText(text);
    setShowModal(true);
  };

  const claimButton = () => {
    return <Button text="Claim!" />;
  };

  const ConnectWalletButton = () => {
    return (
      <>
        <Button
          text="Connect to Wallet"
          onApplyClicked={connectWalletHandler}
        />
      </>
    );
  };

  const handleError = (e) => {
    console.log("haa");
    console.log(e);
    openModal(e.message);
  };

  const WalletButtonAction = () => {
    return (
      <div>
        <div className="max-w overflow-hidden rounded-lg shadow-lg space-y-3">
          <div><b>Wallet Address:</b> {currentAccount}</div>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <ApproveAllButton errorCallback={handleError} />
            <WrapButton
              tokenIds={tokenIds}
              currentAccount={currentAccount}
              errorCallback={handleError}
            />
            <UnwrapButton tokenIds={tokenIds} errorCallback={handleError} />
            {claimButton()}
          </div>
          <InputComponent />
        </div>
      </div>
    );
  };

  const changeInput = (event) => {
    setTokenIds(event.target.value);
  };

  const InputComponent = () => {
    return (
      <input
        type="text"
        autoFocus
        onChange={changeInput}
        value={tokenIds}
        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-1000 focus:border-blue-1000 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Please add tokenIds separated by commas,"
      />
    );
  };

  return (
    <>

      <div className="bg-gray-200 flex items-center justify-center h-screen">

        {showModal && (
          <Modal text={modalText} closeCallback={() => setShowModal(false)} />
        )}
        <div>
          {currentAccount ? <WalletButtonAction /> : <ConnectWalletButton />}
        </div>
      </div>

    </>
  );
}
