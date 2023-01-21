import { ethers } from "ethers";
import nftAbi from "../contracts/abi/NFT.json";
import { Button } from "../shared/components/Button";

export const ApproveAllButton = ({ errorCallback }) => {
  const approveAllHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(process.env.REACT_APP_NFT_ABI_ADDRESS);
        const nftContract = new ethers.Contract(
          process.env.REACT_APP_NFT_ABI_ADDRESS,
          nftAbi,
          signer
        );

        console.log("set approval for all");
        console.log(process.env.REACT_APP_WRAPPER_ABI_ADDRESS);
        let nftTxn = await nftContract.setApprovalForAll(
          process.env.REACT_APP_WRAPPER_ABI_ADDRESS,
          true
        );

        console.log("approving... please wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
        errorCallback({ message: "Ethereum object does not exist" });
      }
    } catch (err) {
      console.log(err);
      errorCallback({
        message: `Approve all signing failed! ${err.message}`,
      });
    }
  };

  return <Button text="Approve OG NFT's" onApplyClicked={approveAllHandler} />;
};
