import { override } from "@microsoft/decorators";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";

import ComponentManager from "../ComponentManager";

export interface ICbdAppCustomizerApplicationCustomizerProperties {
  cssurl: string;
}

export default class CbdAppCustomizerApplicationCustomizer extends BaseApplicationCustomizer<ICbdAppCustomizerApplicationCustomizerProperties> {
  private header: PlaceholderContent | undefined;
  private footer: PlaceholderContent | undefined;
  private notifier: PlaceholderContent | undefined;
  @override
  public onInit(): Promise<void> {
    this.properties.cssurl = "/sites/test/SiteAssets/cbd/cbd.css";
    const cssUrl: string = this.properties.cssurl;

    if (cssUrl) {
      const head: any =
        document.getElementsByTagName("body")[0] || document.documentElement;
      const customStyle: HTMLLinkElement = document.createElement("link");
      customStyle.href = cssUrl;
      customStyle.rel = "stylesheet";
      customStyle.type = "text/css";
      head.insertAdjacentElement("beforeEnd", customStyle);
    }
    this.context.application.navigatedEvent.add(this, this.bootstrap);
    //this.bootstrap();
    return Promise.resolve();
  }

  private bootstrap(): void {
    // initializeIcons();

    if (!this.header) {
      this.header = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    if (!this.footer) {
      this.footer = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );
    }

    if (!this.notifier) {
      this.notifier = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    ComponentManager.renderHeader(this.context, this.header!.domElement);
    ComponentManager.renderNotifier(this.context, this.notifier!.domElement);
    ComponentManager.renderFooter(this.context, this.footer!.domElement);
  }

  private _onDispose(): void {
    ComponentManager._dispose(this.header!.domElement);
    ComponentManager._dispose(this.notifier!.domElement);
    ComponentManager._dispose(this.footer!.domElement);
  }
}
