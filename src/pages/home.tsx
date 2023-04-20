import React from "react";

interface HomeProps {
  osAccessToken: string;
  setRenderedPage: (page: string) => void;
}

function Home({ osAccessToken, setRenderedPage }: HomeProps) {
  return <div>Home</div>;
}

export default Home;
