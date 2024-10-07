import { TonConnectUIProvider } from "@tonconnect/ui-react";
import RockPaperScissors from "./components/Rockpaper";
// import WalletComponent from "./connectTonkeeper";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="ji">
      < RockPaperScissors/>
    </TonConnectUIProvider>
  );
}

export default App;
