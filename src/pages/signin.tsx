import React from "react";

interface SignInProps {
  setRenderedPage: (page: string) => void;
}

function SignIn({ setRenderedPage }: SignInProps) {
  return <div>
    <h1>Sign In</h1>
    <p>Sign in with your PAT</p>
    <input type="text" />
    <button onClick={() => setRenderedPage("home")}>Sign In</button>
  </div>;
}

export default SignIn;
