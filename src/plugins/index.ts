import pinia from "../store";
import router from "../router";

export function registerPlugins(app: any) {
  app.use(pinia).use(router);
}
