//import css from "./Header.module.scss";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";
import "./../../../../tailwind.css";
import { Container } from "../Container";

export interface IHeader {
  context: ApplicationCustomizerContext;
}
export const Header: React.FunctionComponent<IHeader> = (props) => {
  return (
    <Container classname="flex items-center justify-center">
      <div className="">
        <div className="">
          <img
            src={
              "https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/Logo.jpg"
            }
            alt=""
            width={180}
            height={50}
          />
        </div>
        <div className="">
          <div className="">
            <div style={{ display: "flex" }}>
              <img
                src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/TempratureIcon.png"
                alt=""
                width={50}
                height={50}
              />
              <p>32</p>
            </div>
            <p>Partly Sunny</p>
          </div>
          <div className="">
            <div style={{ display: "flex" }}>
              <img
                src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/timeIcon.png"
                alt=""
                width={50}
                height={50}
              />
              <p>7.30</p>
            </div>
            <p>Dubai, UAE</p>
          </div>
          <div className="">
            <div>
              <img
                src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/notificationIcon.png"
                alt=""
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="">
            <img
              src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/TempratureIcon.png"
              alt=""
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
