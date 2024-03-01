const KYC = ({
  email,
  setSelected,
}: {
  email: string;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  console.log(email);
  return (
    <div>
      KYC
      <button onClick={() => setSelected(0)}>done</button>
    </div>
  );
};

export default KYC;
