import { ethers } from "ethers";
import { Button } from "../shared/components/Button";
import wrapperAbi from "../contracts/abi/WRAPPER_ABI.json";

export const UnwrapButton = ({ tokenIds, errorCallback }) => {
  const unwrapHandler = async () => {
    try {
      if (!tokenIds) {
        throw new Error("Please add inputs divided by commas!");
      }
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const tokenIdsParsed = tokenIds
          .split(",")
          .map((token) => parseInt(token));

        const wrapperContract = new ethers.Contract(
          process.env.REACT_APP_WRAPPER_ABI_ADDRESS,
          wrapperAbi,
          signer
        );

        console.log(tokenIdsParsed);
        let unwrapTxn = await wrapperContract.unwrap(tokenIdsParsed);

        console.log("unwrap... please wait");
        await unwrapTxn.wait();
        console.log(unwrapTxn);
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${unwrapTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
        errorCallback({ message: "Ethereum object does not exist" });
      }
    } catch (err) {
      console.log(err);
      errorCallback({
        message: `Unwrap signing failed! ${err.message}`,
      });
    }
  };

  return <Button text="Unwrap NFT(s)" onApplyClicked={unwrapHandler} />;
};
