import { Button } from "@mui/material";
import React from "react";
import { HeaderMenuList } from "./header.styles";

export const Header: React.FC = (): JSX.Element => {
    return (
        <>
        <div>
        <HeaderMenuList>
            <li>Books</li>
            <li>Tools</li>
            <li>Patterns</li>
            <Button variant="contained">Sign in</Button>
            <Button variant="contained" color="success">Register</Button>
        </HeaderMenuList>

        </div>
        </>
    )
}
