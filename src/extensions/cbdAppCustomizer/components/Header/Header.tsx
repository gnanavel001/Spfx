import css from "./Header.module.scss";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";
import { useEffect, useState } from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "./../../../../tailwind.css";
import { Container } from "../Container";
import SubMenu from "./SubMenu";
import { Icon } from "@fluentui/react/lib/Icon";
import "./../../../../tailwind.css";

export interface IHeader {
  context: ApplicationCustomizerContext;
}

// Define the interface for top-level menu items
export interface IMenuItem {
  title: string;
  url?: string;
  submenus?: IMenuItem[];
}
export const Header: React.FunctionComponent<IHeader> = (props) => {
  const sp = spfi().using(SPFx(props.context));
  const [menuBarItems, setMenuBarItems] = useState<IMenuItem[]>();
  const [openSubMenu, setOpenSubMenu] = useState<{
    isOpen: boolean;
    index: number | null;
  }>({
    isOpen: false,
    index: null,
  });
  const [userInfo, setUserInfo] = useState<any>();

  // add event in window after click and open a menu to close the menu

  const MenuBarJsonURL = "/sites/test/SiteAssets/cbd/header/MenuBar.json";
  const LogoImage: any = "/sites/test/SiteAssets/cbd/header/Logo.jpg";
  function getMenuBarItems(): void {
    fetch(MenuBarJsonURL)
      .then((response) => response.json())
      .then((data) => {
        // Here you can work with your menu data
        setMenuBarItems(data?.menu);
      })
      .catch((error) => {
        console.error("Error fetching the menu data:", error);
      });
  }
  async function getUserProperty() {
    const myproperty = await sp.profiles.myProperties.select(
      "Department",
      "JobTitle",
      "givenName",
      "sureName"
    )();
    setUserInfo(myproperty);
    console.log(myproperty, userInfo);
  }
  useEffect(() => {
    getMenuBarItems();
    void getUserProperty();
  }, []);
  const userProfilePicLink = `/_layouts/15/userphoto.aspx?size=L&username=${props.context.pageContext.user.email}`;
  return (
    <>
      <Container classname="flex items-center justify-center border-solid border-0 border-gray-400 border-b py-2">
        <div className="flex items-center justify-between ">
          <div className="">
            <img src={LogoImage} alt="" width={180} height={50} />
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="">
              <div className="relative">
                <img
                  src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/notificationIcon.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div className="absolute rounded-full px-1 bg-red-600 border-2 border-solid border-white top-1 right-1 flex items-center justify-center">
                  <span className="text-white font-Menu text-xs">2</span>
                </div>
              </div>
            </div>
            <div className={css.profile}>
              <img
                className="rounded-full"
                src={userProfilePicLink}
                alt=""
                width={50}
                height={50}
              />
              <div className={css.profileCard}>
                <div className="flex flex-col text-center gap-2 font-Menu">
                  <div className="flex items-center justify-center">
                    <img
                      className="rounded-full"
                      src={userProfilePicLink}
                      alt=""
                      width={90}
                      height={90}
                    />
                  </div>
                  <span className="text-lg  font-bold">
                    {props.context.pageContext.user.displayName}
                  </span>
                  <span> {props.context.pageContext.user.displayName}</span>
                  <span> {props.context.pageContext.user.displayName}</span>
                </div>
                <div className="flex flex-col font-Menu">
                  <div className="flex  w-full items-center hover:bg-lightgrey hover:font-medium rounded-2xl hover:text-greens py-2  gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="pl-3"
                    >
                      <path
                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                        fill="#12BCF1"
                      />
                    </svg>
                    <span className="hover:text-greens">
                      {props.context.pageContext.user.email}
                    </span>
                  </div>
                  <div className="flex  w-full items-center  hover:bg-lightgrey hover:font-medium rounded-2xl hover:text-greens py-2  gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="pl-3"
                    >
                      <path
                        d="M19.95 21C17.8667 21 15.8083 20.546 13.775 19.638C11.7417 18.73 9.89167 17.4423 8.225 15.775C6.55833 14.1077 5.271 12.2577 4.363 10.225C3.455 8.19233 3.00067 6.134 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07933 8.725 3.238C8.90833 3.39667 9.01667 3.584 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.704 12.1123 8.162 12.687C8.62 13.2617 9.12433 13.816 9.675 14.35C10.1917 14.8667 10.7333 15.346 11.3 15.788C11.8667 16.23 12.4667 16.634 13.1 17L15.45 14.65C15.6 14.5 15.796 14.3877 16.038 14.313C16.28 14.2383 16.5173 14.2173 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1377 20.775 15.313C20.925 15.4883 21 15.684 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                        fill="#12BCF1"
                      />
                    </svg>
                    <span className="hover:text-greens ">+91 6382772898</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container classname="flex items-center justify-center">
        {menuBarItems !== null && (
          <div className="flex items-center justify-between">
            <ul className="flex list-none gap-5 items-center p-0">
              {menuBarItems?.map((m, index) => {
                return (
                  <li key={index} className="font-bold relative">
                    {m.submenus && m.submenus.length > 0 ? (
                      <div>
                        <div
                          className="flex items-center gap-2"
                          role="a"
                          tabIndex={1}
                          onClick={() =>
                            setOpenSubMenu({ isOpen: true, index })
                          }
                        >
                          <p className="cursor-pointer m-0 p-0 font-Menu font-semibold text-base text-lightblack">
                            {m.title}
                          </p>
                          <Icon
                            iconName="ChevronDown"
                            className="cursor-pointer"
                            role="a"
                          />
                        </div>

                        <SubMenu
                          submenus={m.submenus}
                          isOpen={
                            openSubMenu.index === index && openSubMenu.isOpen
                          }
                        />
                      </div>
                    ) : (
                      <a
                        href={m.url}
                        className="font-Menu no-underline font-semibold text-base text-lightblack"
                      >
                        {m.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="cursor-pointer relative bg-search flex items-center w-56 h-8 rounded-lg">
              <div className="flex gap-1 absolute items-center pl-1">
                <Icon
                  iconName="Search"
                  className="cursor-pointer rotate-180"
                  role="a"
                />
                <span>Search</span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
