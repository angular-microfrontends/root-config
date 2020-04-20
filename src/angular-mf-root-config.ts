import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@angular-mf/navbar",
  app: () => System.import("@angular-mf/navbar"),
  activeWhen: isActive.navbar,
});

start();
