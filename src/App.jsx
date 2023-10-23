import "./App.scss";
import { useState } from "react";
import { uploadImageToIPFS, connectWallet, getContract } from "./apiFeature";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [hash, setHash] = useState(null);

  const handleConnectWallet = async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setIsWalletConnected(true);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const path = await uploadImageToIPFS(file);
    setHash(path);

    const contract = getContract();
    console.log(contract);
    const result = await contract.methods
      .addImage(path)
      .send({ from: window.ethereum.selectedAddress });
    console.log(result);
  
  };

  return (
    <div className="App">
      {isWalletConnected ? (
        <div className="Upload">
          <form onSubmit={onSubmit} className="Uploader">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
          {hash && (
            <div className="Data">
              <div className="Image">
                <img
                  src={`https://ipfs.io/ipfs/${hash}`}
                  alt="Uploaded"
                />
              </div>
              <div className="HashId">
                <p>Hash ID: {hash}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="Connection">
          <h1>Imaginez Upload</h1>
          <p>Connect Your Wallet to Begin Uploading Your Images Securely.</p>
          <button onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default App;
