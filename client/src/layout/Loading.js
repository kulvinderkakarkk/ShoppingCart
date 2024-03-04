import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { StyledDiv } from "./styles";

export default function Loading() {
    return (
        <StyledDiv>
        <CircularProgress color="inherit" />
        </StyledDiv>
    )
} 