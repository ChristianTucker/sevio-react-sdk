import React from 'react';
import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {SevioAdvertisement, SevioContextProps, SevioProviderProps} from "./types";

export const SevioContext = createContext<SevioContextProps | undefined>(undefined);

export function SevioProvider({ accountId, inventoryId, debug, children }: PropsWithChildren<SevioProviderProps>) {
    // RATHER OR NOT THE SEVIO LOADER HAS BEEN INITIALIZED
    const [initialized, setInitialized] = useState<boolean>(false);
    // THE CURRENT ADVERTISEMENTS
    const [advertisements, setAdvertisements] = useState<SevioAdvertisement[][]>([]);

    // VALIDATE PROPS
    if(!accountId) throw new Error('SevioProvider must be initialized with an accountId');
    if(!inventoryId) throw new Error('SevioProvider must be initialized with an inventoryId');

    // WHEN THE PROVIDER IS MOUNTED...
    useEffect(() => {
        // CREATE SCRIPT ELEMENT
        const script = document.createElement('script');

        // SET SCRIPT SOURCE TO THAT OF THE SEVIO LOADER.
        script.src = 'https://cdn.adx.ws/scripts/loader.js';

        // SET SCRIPT TO LOAD ASYNC
        script.async = true;

        // WAIT FOR THE SCRIPT TO LOAD
        script.onload = () => {
            if(debug) console.log('[DEBUG]: Sevioads loader successfully injected.')
            // SET CURRENT ADVERTISEMENTS BASED ON window.sevioads IN THE EVENT INTERNAL CACHING OCCURS.
            setAdvertisements(window.sevioads ?? []);
            // SET INITIALIZED STATE TO TRUE, THIS WILL ALLOW ADVERTISEMENTS TO RENDER.
            setInitialized(true);
        }

        // PRINT TO THE CONSOLE ON FAILURE LOADING THE LOADER.
        script.onerror = () => {
            console.error('[DEBUG]: Sevioads loader failed to load. Check the console for more information.')
            setInitialized(false)
        }

        // MOUNT THE SCRIPT TO THE DOM, THIS WILL TRIGGER LOADING.
        document.head.appendChild(script);

        // IF PROVIDER IS UNMOUNTED, REMOVE THE SCRIPT FROM DOM.
        return () => {
            document.head.removeChild(script);
        }
    }, []);

    // WHENEVER LOCAL advertisements STATE CHANGES WE NEED TO UPDATE window.sevioads
    useEffect(() => {
        window.sevioads = advertisements;
    }, [advertisements]);

    // IMPLEMENT ZONE REFRESHING


    return <SevioContext.Provider value={{ initialized, accountId, inventoryId, advertisements, setAdvertisements }}>
        { children }
    </SevioContext.Provider>


}