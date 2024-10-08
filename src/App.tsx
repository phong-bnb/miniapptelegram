import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import RockPaperScissors from "./components/Rockpaper";
import { TonConnect } from "@tonconnect/sdk"; 

const tonConnect = new TonConnect(); 

function WalletConnection() {
  const [wallet, setWallet] = useState<{ address: string } | null>(null);

  useEffect(() => {
    const connectedWallet = tonConnect.wallet; 
    if (connectedWallet) {
      setWallet(connectedWallet.account);
    }
  }, []);

  return (
    <div className="wallet-section">
      <TonConnectButton />
      {wallet && (
        <div>
          <p>Địa chỉ ví: {wallet.address}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <TonConnectUIProvider connector={tonConnect}>
      <div className="app-container">
        <WalletConnection />
        <RockPaperScissors />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
