import React, { StrictMode } from "react";
import { render } from "react-dom";
import "./global.scss";

import App from "./App";

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("app"),
);
