import * as React from "react";
import { ReactNode } from "react";
import "./../../../tailwind.css";
interface IContainer {
  classname?: string;
  containerclassname?: string;
  children: ReactNode;
}
export const Container: React.FunctionComponent<IContainer> = (props) => {
  return (
    <div className={`w-full h-fit ${props.classname || ""}`}>
      <div className={`lg:container ${props.containerclassname || ""} `}>
        {props.children}
      </div>
    </div>
  );
};
