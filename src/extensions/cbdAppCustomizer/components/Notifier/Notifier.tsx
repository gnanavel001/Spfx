import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";

export interface INotifier {
  context: ApplicationCustomizerContext;
}
export const Notifier: React.FunctionComponent<INotifier> = (props) => {
  return (
    <>
      <p>Notifier file</p>
    </>
  );
};
