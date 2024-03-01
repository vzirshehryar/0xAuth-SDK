import { useState } from "react";
import AssetsVerification from "./AssetsVerification";
import KYC from "./KYC";

import "./components.css";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selected, setSelected] = useState(0);

  if (!isModalOpen) return <></>;

  return (
    <div className="oxauth_modal_overlay">
      <div className="oxauth_modal">
        <header className="oxauth_modal_header">
          <h2 style={{ marginTop: 0 }}>0xAuth Verification</h2>
          <div>
            <div
              style={{
                background: "rgba(255, 0, 0, 0.1)",
                cursor: "pointer",
                display: "inline-grid",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <img src="/close.png" alt="close" width={16} height={16} />
            </div>
          </div>
        </header>
        <main className="oxauth_modal_main">
          {selected === 1 ? (
            <KYC email={"email"} setSelected={setSelected} />
          ) : selected === 2 ? (
            <AssetsVerification
              email={"vzirshehryar@gmail.com"}
              setSelected={setSelected}
            />
          ) : (
            <>
              <button onClick={() => setSelected(1)}>KYC</button>
              <button onClick={() => setSelected(2)}>Verify Your Asset</button>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Modal;
