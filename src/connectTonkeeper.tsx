import { useState, useEffect } from "react";
import TonWeb from "tonweb";
import nacl from "tweetnacl"; // Sử dụng tweetnacl để tạo keypair

const WalletComponent = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const getWalletAddress = async () => {
    try {
      const tonweb = new TonWeb();

      // Tạo keypair sử dụng tweetnacl
      const keyPair = nacl.sign.keyPair(); // Tạo cặp khóa ngẫu nhiên (publicKey, secretKey)

      // Tạo ví với public key
      const WalletClass = tonweb.wallet.all.v3R2;
      const wallet = new WalletClass(tonweb.provider, {
        publicKey: keyPair.publicKey,
      });

      // Lấy địa chỉ ví
      const address = await wallet.getAddress();
      setWalletAddress(address.toString());
    } catch (error) {
      console.error("Error getting wallet address:", error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <div>
      <h3>Địa chỉ ví:</h3>
      <p>{walletAddress ? walletAddress : "Đang lấy địa chỉ ví..."}</p>
    </div>
  );
};

export default WalletComponent;
