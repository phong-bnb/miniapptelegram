import { createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
const secretKey = import.meta.env.VITE_TEMPLATE_SECRET_KEY;

if (!clientId || !secretKey) {
  console.error("Missing client ID or secret key!");
}

export const client = createThirdwebClient({
  clientId: clientId || "",
  secretKey: secretKey || "",
});
