import React from "react";
import Image from "next/image";

export default function ExperimentFinished() {
  return (
    <>
      <h2>
        Thanks for participating in the experiment! Enjoy the rest of your day!{" "}
      </h2>
      <br></br>
      <Image
        alt="Humorous video of a dog doing science experiments"
        src={
          process.env.NODE_ENV === "production" ? `/DM2350/200.gif` : "/200.gif"
        }
        width={267}
        height={200}
      ></Image>
    </>
  );
}
