import React from "react";
import { SplashMenu } from "./splash.styles";

export const Splash: React.FC=(): JSX.Element => {
    return (
        <SplashMenu>
        <h1>McGrisket Library</h1>
        <h3>The McLibrary project is the creation of a library of resources for sharing with our community.  Upon initial launch of this project our closest friends should be able to log in to the website and access resources that the McGrisket household has in stock, then check them out. As development continues, we would like to be able to extend library creation ability to other households thereby creating a communal network of resources to use.  </h3>
        </SplashMenu>
    )}