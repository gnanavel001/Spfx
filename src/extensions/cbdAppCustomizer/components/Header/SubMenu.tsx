import * as React from "react";
import { IMenuItem } from "./Header";
import SubMenuItems from "./SubMenuItem";
import { Icon } from "@fluentui/react/lib/Icon";
// export interface ISubmenuItem {
//   title: string;
//   url: string;
//   submenus?: ISubmenuItem[]; // Optional array of submenu items
// }
export interface IPageProps {
  submenus: IMenuItem[]; // Optional array of submenu items
  isOpen: boolean;
}
const SubMenu: React.FunctionComponent<IPageProps> = ({
  submenus,
  isOpen = false,
}) => {
  const [openSubMenu, setOpenSubMenu] = React.useState<{
    isOpen: boolean;
    index: number | null;
  }>({
    isOpen: false,
    index: null,
  });

  return isOpen ? (
    <div className="absolute ">
      <ul className="relative list-none  space-y-3 z-50 p-3 w-56 rounded-xl bg-white ">
        {submenus.map((m, index) => {
          return (
            <li key={index} className="font-semibold ">
              {m.submenus && m.submenus.length > 0 ? (
                <div className="">
                  <div
                    className="flex items-center justify-between"
                    onClick={() => setOpenSubMenu({ isOpen: true, index })}
                    role="a"
                    tabIndex={1}
                  >
                    <p className="cursor-pointer m-0 p-0">{m.title}</p>
                    <Icon
                      iconName="ChevronRight"
                      role="a"
                      className="cursor-pointer"
                    />
                  </div>

                  <SubMenuItems
                    submenus={m.submenus}
                    isOpen={openSubMenu.index === index && openSubMenu.isOpen}
                  />
                </div>
              ) : (
                <a
                  href={m.url}
                  className="no-underline font-semibold text-base text-lightblack"
                >
                  {m.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};
export default SubMenu;
