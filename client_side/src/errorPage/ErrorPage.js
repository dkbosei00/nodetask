import { useRouteError } from "react-router-dom";

import React from "react";

function ErrorPage() {
    const error = useRouteError()
    console.log(error);
    
  return (<div>
    <h1>Oops! An error occured.</h1>
    <p>Sorry, An unexpected error has occured.</p>
    <p>
        <i>{error.statusText || error.message}</i>
    </p>
    </div>);
}

export default ErrorPage;
