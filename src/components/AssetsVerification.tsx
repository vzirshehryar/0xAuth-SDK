import { useEffect, useState } from "react";
import { links } from "../lib/backendLinks";
import PlaidButton from "./PlaidButton";

var oneTime = false;

const AssetsVerification = ({
  email,
  setSelected,
}: {
  email: string;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    async function getLinkToken() {
      // to make request only one time. To request again reload the page
      if (!oneTime) {
        oneTime = true;
      } else return;

      try {
        // setting email to backend and getting link token
        const response = await fetch(links.get_link_token, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });
        const data: { link_token: string; error: null | string } = await response.json();
        if (data) {
          if (data.error != null) {
            console.log(data.error);
            return;
          }
        }
        setLinkToken(data.link_token);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getLinkToken();
  }, []);

  return (
    <main className="oxauth_assets_verification">
      {linkToken && (
        <>
          <PlaidButton linkToken={linkToken} email={email} />
        </>
      )}
      <button onClick={() => setSelected(0)}>done</button>
    </main>
  );
};

export default AssetsVerification;
