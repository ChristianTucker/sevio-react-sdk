import React from 'react';
import {useContext} from "react";
import {SevioContext} from "../context/SevioProvider";
import {SevioContextProps} from "../context/types";

export function useSevio(): SevioContextProps {
    const context = useContext(SevioContext);
    if(!context) throw new Error("useSevio must be used within a SevioProvider");
    return context;
}

