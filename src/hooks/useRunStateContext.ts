import React from "react";
import { useActor } from "@xstate/react";
import { RunStateContext } from "contexts/RunStateContext";
import useGeolocation from "hooks/useGeolocation";

export function useRunStateContext() {
  const { runService } = React.useContext(RunStateContext);
  const [state] = useActor(runService);
  const { position } = useGeolocation();

  React.useEffect(() => {
    if (position) {
      runService.send({ type: "ADD_POSITION", value: position });
    }
  }, [position]);

  function timerExpired() {
    runService.send({ type: "TIMER_EXPIRED" });
  }

  function start() {
    runService.send("START");

    setTimeout(() => {
      timerExpired();
    }, state.context.countdown);
  }

  function pause() {
    runService.send("PAUSE");
  }

  function resume() {
    runService.send("RESUME");
  }

  function end() {
    runService.send("END");
  }

  function exit() {
    runService.send("EXIT");
  }

  return {
    state,
    start,
    pause,
    resume,
    end,
    exit,
  };
}
