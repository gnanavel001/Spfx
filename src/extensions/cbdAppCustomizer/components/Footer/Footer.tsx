import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";
import { useEffect, useState } from "react";
import "./../../../../tailwind.css";
import { Container } from "../Container";
interface IFooterMenu {
  Footer: { Title: string; Url: string }[];
  CopyRights: string;
}

export interface IFooter {
  context: ApplicationCustomizerContext;
}

export const Footer: React.FunctionComponent<IFooter> = (props) => {
  const [footerLinks, setFooterLinks] = useState<IFooterMenu>();
  const footerJsonSourceLink = "/sites/test/SiteAssets/cbd/Footer/Footer.json";
  const LogoImage: any =
    "/sites/test/SiteAssets/cbd/Footer/TransparentLogo.png";

  function getMenuBarItems(): void {
    fetch(footerJsonSourceLink)
      .then((response) => response.json())
      .then((data) => {
        // Here you can work with your menu data
        setFooterLinks(data);
      })
      .catch((error) => {
        console.error("Error fetching the menu data:", error);
      });
  }
  useEffect(() => {
    getMenuBarItems();
  }, []);
  return (
    <Container
      classname="flex items-center justify-center py-1 bg-footer"
      containerclassname="flex items-center justify-between text-slate-50"
    >
      <div className="flex items-center gap-x-3 text-white">
        <img
          src={LogoImage}
          alt=""
          width={180}
          height={50}
          className="text-white"
        />
        <span>{footerLinks?.CopyRights}</span>
      </div>
      <div className="flex">
        {footerLinks?.Footer.map((item, index) => {
          return (
            <a
              key={index}
              href={item?.Url}
              className="text-white no-underline px-2 hover:underline"
            >
              {item?.Title}
            </a>
          );
        })}
      </div>
    </Container>
  );
};
