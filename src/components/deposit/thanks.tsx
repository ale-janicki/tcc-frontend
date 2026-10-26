"use client";
import { getLastDeposit } from "@/services/api";
import { useEffect, useState } from "react";

export default function Thanks() {
  const [userPoints, setUserPoints] = useState("XXXX");
  const [depositedBatteries, setDepositedBatteries] = useState("XXXX");
  const [returned, setReturned] = useState(0);
  useEffect(() => {
    const last = getLastDeposit();
    if (!last) return;
    setUserPoints(last.credits.toString());
    setDepositedBatteries(last.valid.toString());
    setReturned(last.returned);
  }, []);

  return (
    <div className="w-full h-full text-center my-32 md:my-64">
      <h1 className="font-audiowide text-primary-500 text-xl md:text-5xl">
        Obrigado por ser +Verde!
      </h1>
      <div className="mt-6 mx-auto w-3/6 flex justify-between text-black/50 md:mt-14 md:text-2xl">
        <p>Pontos:</p>
        <p>{userPoints}</p>
        <p>Pilhas depositadas:</p>
        <p>{depositedBatteries}</p>
      </div>
      {returned > 0 && (
        <p className="mt-6 text-black/50 md:mt-10 md:text-2xl">
          1 objeto não foi reconhecido como pilha e foi devolvido.
        </p>
      )}
    </div>
  );
}
