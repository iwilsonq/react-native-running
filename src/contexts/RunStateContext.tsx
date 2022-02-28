import React from "react";
import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";
import { runMachine } from "machines/runMachine";

interface Props extends React.PropsWithChildren<{}> {}

export const RunStateContext = React.createContext({
  runService: {} as InterpreterFrom<typeof runMachine>,
});

export function RunStateProvider(props: Props) {
  const runService = useInterpret(runMachine);

  return (
    <RunStateContext.Provider value={{ runService }}>
      {props.children}
    </RunStateContext.Provider>
  );
}
