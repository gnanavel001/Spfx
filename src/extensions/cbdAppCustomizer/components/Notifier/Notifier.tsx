import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import * as React from "react";
import { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/profiles";

import "../../../../tailwind.css";
import { Container } from "../Container";

interface INotifier {
  context: ApplicationCustomizerContext;
}

export const Notifier: React.FunctionComponent<INotifier> = (props) => {
  const [listItem, setListItem] = useState<any>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const sp = spfi().using(SPFx(props.context));
  const timeNow = new Date().toISOString();
  let customUserPropertyValue: any;

  async function getAlertListLastRecord() {
    const listLastRecord: any = await sp.web.lists
      .getByTitle("CBDAlerts")
      .items.filter(
        `StartDate le datetime'${timeNow}' and EndDate ge datetime'${timeNow}'`
      )
      .orderBy("ID", false)
      .top(1)();
    setListItem(listLastRecord);
    console.log("List ID", listLastRecord[0]?.ID);
  }
  async function getCustomUserProperty() {
    const myproperty = await sp.profiles.myProperties();
    myproperty.UserProfileProperties.forEach(
      (prop: { Key: string | number; Value: any }) => {
        if (prop.Key === "CDBAlertID") {
          customUserPropertyValue = prop.Value;
          console.log("Property ID", prop.Value);
        }
      }
    );
  }
  function checkPropertyMatch(listID: string) {
    if (listID == customUserPropertyValue) {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }
  async function updateCustomUserProperty() {
    let loginName = `i:0#.f|membership|${
      props.context!.pageContext.user.loginName
    }`;
    await sp.profiles.setSingleValueProfileProperty(
      loginName,
      "CDBAlertID",
      `${listItem[0]?.ID}`
    );
    setShowAlert(false);
  }
  useEffect(() => {
    void getAlertListLastRecord();
    void getCustomUserProperty().then(() => {
      checkPropertyMatch(listItem[0]?.ID);
    });
  }, []);
  return (
    <>
      {listItem && showAlert && (
        <Container
          classname="w-full h-12 bg-Alert flex items-center justify-center"
          containerclassname="flex items-center justify-between"
        >
          <div className="flex items-center justify-start gap-3">
            <img
              src="https://1n4s36.sharepoint.com/sites/test/SiteAssets/cbd/header/Alert.png"
              alt=""
              width={20}
              height={20}
            />
            <span className=" text-white font-Menu text-base">
              <b>Alert:</b> {listItem[0]?.Title}
            </span>
          </div>
          <div></div>
          <VscChromeClose
            className="text-white cursor-pointer"
            onClick={() => updateCustomUserProperty()}
          />
        </Container>
      )}
    </>
  );
};
