import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const data = {
  props: {
    favoriteDog: "Franklin",
  },
  loaders: {},
};

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement,
  data,
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
