import * as React from "react";
import { IMenuItem } from "./Header";

export interface IPageProps {
  submenus: IMenuItem[]; // Optional array of submenu items
  isOpen: boolean;
}
const SubMenuItems: React.FunctionComponent<IPageProps> = ({
  submenus,
  isOpen = false,
}) => {
  return isOpen ? (
    <ul
      style={{ left: "100%", top: 0 }}
      className="absolute list-none bg-white space-y-3 z-50 p-3 rounded-xl w-56"
    >
      {submenus.map((m, index) => {
        return (
          <li key={index} className="font-semibold">
            {m.submenus && m.submenus.length > 0 ? (
              <div className="relative">
                <p role="a" tabIndex={1} className="cursor-pointer m-0 p-0">
                  {m.title}
                </p>
              </div>
            ) : (
              <a href={m.url} className="no-underline text-black">
                {m.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  ) : null;
};
export default SubMenuItems;
