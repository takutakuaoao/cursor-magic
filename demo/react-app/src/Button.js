"use client";

import { useState } from "react";

const Button = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <button onClick={() => setMessage("Hello.")}>Button</button>
      <p>Message: {message}</p>
    </>
  );
};

export default Button;
