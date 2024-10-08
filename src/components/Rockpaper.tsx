import { useState } from "react";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
  useReadContract,
} from "thirdweb/react";
import { client } from "../clienst";
import { inAppWallet } from "thirdweb/wallets";
import { shortenAddress } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { claimTo, getBalance } from "thirdweb/extensions/erc20";
import { FaHandRock } from "react-icons/fa";

type Choice = "Đấm" | "Bao" | "Kéo";
type Result = "Win" | "Lose" | "Tie";

const choices: Choice[] = ["Đấm", "Bao", "Kéo"];

const getComputerChoice = (): Choice =>
  choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (
  playerChoice: Choice,
  computerChoice: Choice
): Result => {
  if (playerChoice === computerChoice) return "Tie";
  if (
    (playerChoice === "Đấm" && computerChoice === "Kéo") ||
    (playerChoice === "Bao" && computerChoice === "Đấm") ||
    (playerChoice === "Kéo" && computerChoice === "Bao")
  ) {
    return "Win";
  }
  return "Lose";
};

interface GameResult {
  playerChoice: Choice;
  computerChoice: Choice;
  gameResult: Result;
}

export default function RockPaperScissors() {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: "2mv1JLwGQSHH9Dc8qLbpzhZTZZ7_FpKa3Mt3D524gYw2v9Bj",
  });

  const [result, setResult] = useState<GameResult | null>(null);
  const [showPrize, setShowPrize] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);

  const handleChoice = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const gameResult = determineWinner(playerChoice, computerChoice);
    setResult({ playerChoice, computerChoice, gameResult });
    setShowPrize(gameResult === "Win");
  };

  const resetGame = () => {
    setResult(null);
    setShowPrize(false);
    setPrizeClaimed(false);
  };

  const claimPrize = () => {
    setShowModal(true);
  };

  const { data: tokenbalance } = useReadContract(getBalance, {
    contract: contract,
    address: account?.address ?? "defaultAddress",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f0f0",
        color: "#333",
      }}
    >
      <div
        style={{
          padding: "2rem",
          margin: "0 0.5rem",
          width: "400px",
          maxWidth: "98%",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Kéo Búa Bao
        </h1>
        {!account ? (
          <ConnectButton
            client={client}
            accountAbstraction={{
              chain: baseSepolia,
              sponsorGas: true,
            }}
            wallets={[
              inAppWallet({
                auth: {
                  options: ["email"],
                },
              }),
            ]}
          />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "auto",
                width: "100%",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #f0f0f0",
                padding: "0.5rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.5rem",
                    marginBottom: "-10px",
                    marginTop: "-10px",
                  }}
                >
                  {shortenAddress(account.address)}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "-10px",
                  }}
                >
                  Balance: {tokenbalance?.displayValue}
                </p>
              </div>
              <button
                onClick={() => disconnect(wallet!)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                }}
              >
                Logout
              </button>
            </div>
            {!result ? (
              <div>
                <h3>Lựa chọn của bạn:</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                    margin: "2rem",
                  }}
                >
                  {choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => handleChoice(choice)}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "3rem",
                      }}
                    >
                      {choice === "Đấm" ? (
                        <FaHandRock />
                      ) : choice === "Bao" ? (
                        "📄"
                      ) : (
                        "✂️"
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "1.5rem", marginBottom: "-10px" }}>
                  Bạn chọn: {result.playerChoice}
                </p>
                <p style={{ fontSize: "1.5rem", marginBottom: "-20px" }}>
                  Máy chọn: {result.computerChoice}
                </p>
                <p style={{ fontWeight: "bold", fontSize: "2rem" }}>
                  Kết quả: {result.gameResult}
                </p>
                <div
                  style={{
                    position: "absolute",
                    bottom: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={resetGame}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Chơi lại
                  </button>
                  {showPrize && !prizeClaimed && (
                    <button
                      onClick={claimPrize}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#ffc107",
                        color: "black",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Đổi thưởng
                    </button>
                  )}
                  {showModal && (
                    <div
                      onClick={() => setShowModal(false)} // Sự kiện click ra ngoài để đóng modal
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()} // Ngăn modal đóng khi click bên trong nó
                        style={{
                          background: "white",
                          padding: "2rem",
                          borderRadius: "8px",
                          maxWidth: "300px",
                          textAlign: "center",
                        }}
                      >
                        <h2
                          style={{ fontSize: "1.2rem", marginBottom: "1rem" }}
                        >
                          Claim 10 Tokens!
                        </h2>
                        <p style={{ marginBottom: "1rem" }}>
                          Bạn đã có 10 token trong ví điện tử!
                        </p>

                        <TransactionButton
                          transaction={() =>
                            claimTo({
                              contract: contract,
                              to: account?.address ?? "",
                              quantity: "10",
                            })
                          }
                          onTransactionConfirmed={() => {
                            alert("Prize claimed!");
                            setShowModal(false); // Đóng modal sau khi transaction thành công
                            setPrizeClaimed(true); // Cập nhật trạng thái đã claim
                          }}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Đổi thưởng
                        </TransactionButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
