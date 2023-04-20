import React from "react";

interface StartProps {
  setRenderedPage: (page: string) => void;
}

function Start({ setRenderedPage }: StartProps) {
  return (
    <div>
      <h1>OpenSauced</h1>
      <p>Welcome Text</p>
      <button onClick={() => setRenderedPage("signin")}>Get Started</button>
    </div>
  );
}

export default Start;
