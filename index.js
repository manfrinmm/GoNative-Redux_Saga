/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src";
import { name as appName } from "./app.json";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Warning: Async"]);

AppRegistry.registerComponent(appName, () => App);
