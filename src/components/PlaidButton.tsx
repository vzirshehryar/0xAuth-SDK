import React, { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";
import { links } from "../lib/backendLinks";

const PlaidButton = ({ linkToken, email }: { linkToken: string; email: string }) => {
  const onSuccess = React.useCallback((public_token: string) => {
    // If the access_token is needed, send public_token to server
    const exchangePublicTokenForAccessToken = async () => {
      const response = await fetch(links.set_access_token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token: public_token, email: email }),
      });
      if (!response.ok) {
        console.log("no access_token retrieved");
        return;
      }
      const data = await response.json();
      console.log(data);
    };

    exchangePublicTokenForAccessToken();
  }, []);

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <>
      <Button type="button" size={32} wide={false} onClick={() => open()}>
        Connect Bank
      </Button>
    </>
  );
};

export default PlaidButton;
