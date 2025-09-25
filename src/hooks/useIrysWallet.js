import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { WebUploader } from "@irys/web-upload";
import { WebEthereum } from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";

export default function useIrysWallet() {
  const [walletStatus, setWalletStatus] = useState("Not connected");
  const [irysStatus, setIrysStatus] = useState("Not connected");

  const connectWallet = useCallback(async () => {
    console.log("connect wallet");

    if (typeof window.ethereum === "undefined") {
      console.error("No Ethereum provider found. Please install MetaMask or another wallet.");
      setWalletStatus("No Ethereum provider found. Please install MetaMask or another wallet.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const address = await signer.getAddress();
      
      setWalletStatus(`Connected: ${address}`);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setWalletStatus("Error connecting to wallet");
    }
  }, []);

  // Optionally accept a file (Blob/File or string) and upload it after connecting
  const connectIrys = useCallback(async (json) => {
    if (typeof window.ethereum === "undefined") {
      console.error("No Ethereum provider found. Please install MetaMask or another wallet.");
      setIrysStatus("No Ethereum provider found. Please install MetaMask or another wallet.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const irysUploader = await WebUploader(WebEthereum).withAdapter(EthersV6Adapter(provider));
      setIrysStatus(`Connected to Irys: ${irysUploader.address}`);

      // If a file is provided, upload it and return the receipt
      let receipt = null;
      if (json) {
        receipt = await irysUploader.upload(json);
        console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
        setIrysStatus(`Uploaded: https://gateway.irys.xyz/${receipt.id}`);
      }

      return { irysUploader, receipt };
    } catch (error) {
      console.error("Error connecting to Irys:", error);
      setIrysStatus("Error connecting to Irys");
    }
  }, []);



  return { walletStatus, irysStatus, connectWallet, connectIrys };

}
