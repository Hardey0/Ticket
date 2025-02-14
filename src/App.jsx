import React, { useState } from "react";
import TicketSelection from "./TicketSelection";
import Upload from "./upload";
import Ticket from "./ticket";

function App() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <TicketSelection onNext={() => setStep(2)} />}
      {step === 2 && <Upload onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <Ticket onBack={() => setStep(2)} />}
    </>
  );
}

export default App;
