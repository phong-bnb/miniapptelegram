import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import RockPaperScissors from "./components/Rockpaper";
import { TonConnect } from "@tonconnect/sdk"; // Import TonConnect

const tonConnect = new TonConnect(); // Tạo instance TonConnect

function WalletConnection() {
  const [wallet, setWallet] = useState<{ address: string } | null>(null);

  useEffect(() => {
    const connectedWallet = tonConnect.wallet; // Truy cập trực tiếp vào wallet
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
