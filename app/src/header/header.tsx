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
            <Button
                variant="contained"
                size="small"
             
            >
                Sign in
            </Button>
            <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ ml: 2 }}
            >
                Register
            </Button>
        </HeaderMenuList>

        </div>
        </>
    )
}
