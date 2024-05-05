// import * as React from "react";
// import { useEffect, useState } from "react";

// export const Header: React.FunctionComponent = (props) => {
//     const [menuBarItems, setMenuBarItems] = useState();
//     const [openSubMenu, setOpenSubMenu] = useState<{
//       isOpen: boolean;
//       index: number | null;
//     }>({
//       isOpen: false,
//       index: null,
//     });
//     // add event in window after click and open a menu to close the menu

//     const MenuBarJsonURL = "/sites/test/SiteAssets/cbd/header/MenuBar.json";
//     const LogoImage: any = "/sites/test/SiteAssets/cbd/header/Logo.jpg";
//     function getMenuBarItems(): void {
//       fetch(MenuBarJsonURL)
//         .then((response) => response.json())
//         .then((data) => {
//           // Here you can work with your menu data
//           setMenuBarItems(data?.menu);
//         })
//         .catch((error) => {
//           console.error("Error fetching the menu data:", error);
//         });
//     }

//     useEffect(() => {
//       getMenuBarItems();
//     }, []);
//     return(
//         <nav className="navbar">
//         <ul>
//           {MenuList.map((mainMenu, mainIndex) => (
//             <li key={mainIndex}>
//               <a href={mainMenu.RedirectUrl}>
//                 {mainMenu.Name}
//                 {mainMenu.SubMenu.length > 0 && (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="12"
//                     height="8"
//                     viewBox="0 0 12 8"
//                     fill="none"
//                   >
//                     <path
//                       d="M1 1.54596L5.9081 6.45406L10.8162 1.54596"
//                       stroke="#353535"
//                       stroke-width="2"
//                     />
//                   </svg>
//                 )}
//               </a>
//               <ul style={{ height: `${mainMenu.SubMenu.length * 52}px` }}>
//                 {mainMenu.SubMenu.map((subMenu, subIndex) => (
//                   <li key={subIndex}>
//                     <Link to={subMenu.RedirectUrl}>
//                       {subMenu.Name}
//                       {subMenu.SubMenu.length > 0 && (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                         >
//                           <path
//                             d="M10 17L15 12L10 7"
//                             stroke="#006E7D"
//                             stroke-width="1.6"
//                           />
//                         </svg>
//                       )}
//                     </Link>
//                     {subMenu.SubMenu.length > 0 && (
//                       <ul
//                         style={{
//                           minHeight: `${mainMenu.SubMenu.length * 52}px`,
//                           marginTop: `-${
//                             subIndex * 53 > 0 ? subIndex * 53 : 10
//                           }px`,
//                         }}
//                       >
//                         {subMenu.SubMenu.map((subMenuOption, optionIndex) => (
//                           <li key={optionIndex}>
//                             <Link to={subMenuOption.RedirectUrl}>
//                               {subMenuOption.Name}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//         <div className="search-box">
//           <div className="search-icon-container">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 20 20"
//               fill="none"
//             >
//               <path
//                 d="M15.7832 14.3899L20 18.6057L18.6069 19.9988L14.3911 15.782C12.8224 17.0395 10.8713 17.7234 8.86088 17.7206C3.96968 17.7206 0 13.7509 0 8.85969C0 3.96849 3.96968 -0.00119019 8.86088 -0.00119019C13.7521 -0.00119019 17.7218 3.96849 17.7218 8.85969C17.7246 10.8701 17.0407 12.8212 15.7832 14.3899ZM13.8082 13.6593C15.0577 12.3744 15.7555 10.652 15.7527 8.85969C15.7527 5.05247 12.6681 1.9679 8.86088 1.9679C5.05366 1.9679 1.96909 5.05247 1.96909 8.85969C1.96909 12.6669 5.05366 15.7515 8.86088 15.7515C10.6532 15.7543 12.3756 15.0565 13.6605 13.807L13.8082 13.6593Z"
//                 fill="#353535"
//               />
//             </svg>
//           </div>
//           <input type="text" placeholder="Search..." />
//         </div>
//       </nav>
//     )
// }
