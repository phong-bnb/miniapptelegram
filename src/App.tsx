import { TonConnectUIProvider } from "@tonconnect/ui-react";
import RockPaperScissors from "./components/Rockpaper";

function App() {
  return (
    <TonConnectUIProvider manifestUrl="">
      <RockPaperScissors />
    </TonConnectUIProvider>
  );
}

export default App;
