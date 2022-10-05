import React from "react";
import Image from "next/image";

export default function ExperimentFinished() {
  return (
    <>
      <h2 style={{ marginBottom: "1rem" }}>
        Thanks for participating in the experiment! Enjoy the rest of your day!{" "}
      </h2>
      <Image
        alt="Humorous video of a dog doing science experiments"
        src={"/200.gif"}
        width={267}
        height={200}
      ></Image>
    </>
  );
}
