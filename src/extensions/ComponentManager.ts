import * as React from "react";
import * as ReactDOM from "react-dom";

import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { Header } from "./cbdAppCustomizer/components/Header/Header";
import { Footer } from "./cbdAppCustomizer/components/Footer/Footer";
import { Notifier } from "./cbdAppCustomizer/components/Notifier/Notifier";

export default class ComponentManager {
  public static renderHeader(
    context: ApplicationCustomizerContext,
    element: HTMLElement
  ): void {
    const component = React.createElement(Header, { context });
    ReactDOM.render(component, element);
  }

  public static renderFooter(
    context: ApplicationCustomizerContext,
    element: HTMLElement
  ): void {
    const component = React.createElement(Footer, { context });
    ReactDOM.render(component, element);
  }

  public static renderNotifier(
    context: ApplicationCustomizerContext,
    element: HTMLElement
  ): void {
    const component = React.createElement(Notifier, { context });
    ReactDOM.render(component, element);
  }

  public static _dispose(element: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(element);
  }
}
