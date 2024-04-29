import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";

export interface IFooter {
  context: ApplicationCustomizerContext;
}
export const Footer: React.FunctionComponent<IFooter> = (props) => {
  return (
    <>
      <p>footer file</p>
    </>
  );
};
