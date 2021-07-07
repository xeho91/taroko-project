import React, { Fragment } from "react";

import type { FunctionComponent } from "react";

const Fallback: FunctionComponent = () => {
	const message = "The site path you're trying to visit doesn't exist.";
    return (
        <Fragment>
            <h1>404 - Not Found</h1>
            <p>{message}</p>
        </Fragment>
    );
};

export default Fallback;
