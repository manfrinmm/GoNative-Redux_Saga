import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/login";
import Repositories from "./pages/Repositories";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Repositories
  })
);

export default Routes;
