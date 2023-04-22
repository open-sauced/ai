import React from "react";

interface HomeProps {
  osAccessToken: string;
  setRenderedPage: (page: string) => void;
}

function Home({ osAccessToken, setRenderedPage }: HomeProps) {
  return (
    <div>
      <p className="text-white">Home</p>
    </div>
  );
}

export default Home;
