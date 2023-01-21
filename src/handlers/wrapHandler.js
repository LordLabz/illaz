import { ethers } from "ethers";
import dbAbi from "../contracts/abi/DB_ABI.json";
import wrapperAbi from "../contracts/abi/WRAPPER_ABI.json";
import { Button } from "../shared/components/Button";

export const WrapButton = ({ tokenIds, currentAccount, errorCallback }) => {
    const wrapHandler = async () => {
        try {
            if (!tokenIds) {
                throw Error("Please add inputs divided by commas!");
            }
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const dbContract = new ethers.Contract(
                    process.env.REACT_APP_DB_ABI_ADDRESS,
                    dbAbi,
                    signer
                );

                const tokenIdsParsed = tokenIds
                    .split(",")
                    .map((token) => parseInt(token));
                const numberOfValues = tokenIdsParsed.length;

                const wrapperContract = new ethers.Contract(
                    process.env.REACT_APP_WRAPPER_ABI_ADDRESS,
                    wrapperAbi,
                    signer
                );

                console.log(tokenIdsParsed);
                let wrapTxn = await wrapperContract.wrap(tokenIdsParsed);

                console.log("wrap... please wait");
                await wrapTxn.wait();

                console.log(
                    `Mined, see transaction: https://rinkeby.etherscan.io/tx/${wrapTxn.hash}`
                );
            } else {
                console.log("Ethereum object does not exist");
                errorCallback({ message: "Ethereum object does not exist" });
            }
        } catch (e) {
            console.log(e);
            errorCallback({
                message: `Wrap signing failed! ${e.message}`,
            });
        }
    };

    return (
        <>
            <Button text="Wrap NFT(s)" onApplyClicked={wrapHandler} />
        </>
    );
};
