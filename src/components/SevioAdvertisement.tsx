import React from 'react';
import {SevioAdvertisement} from "../context/types";
import {useSevio} from "../hooks";
import {PropsWithChildren, useEffect} from "react";
import {doesAdvertisementExist, pushPlacement} from "../utils";

export function SevioAdvertisement({ adType, zone, children }: PropsWithChildren<SevioAdvertisement>) {
    const { initialized, accountId, inventoryId, advertisements, setAdvertisements } = useSevio();

    useEffect(() => {
        // WAITING ON SEVIO LOADER
        if(!initialized) return;

        // SEVIO LOADER HAS BEEN INITIALIZED, SO WE CAN UPDATE THE ADVERTISEMENTS STATE

        // CREATE THE PLACEMENT
            const placement: SevioAdvertisement = {
                accountId, inventoryId, adType, zone
            }

            setAdvertisements(advertisements => {
                // HANDLES IMMUTABLE ARRAY MODIFICATION & DUPLICATE ADVERTISEMENT CHECKING
                return pushPlacement(advertisements, placement);
            })

        // WHEN THIS ADVERTISEMENT COMPONENT IS UNMOUNTED, REMOVE THE ZONE FROM THE advertisements STATE
        return () => {
            setAdvertisements(advertisements => {
                let copy = structuredClone(advertisements);
                for(let i = 0; i < copy.length; i++) {
                    copy[i] = copy[i].filter(ad => ad.zone !== zone);
                }
                return copy;
            })
        }
    }, [initialized])

    // WHILE WAITING ON LOADER TO INITIALIZE, DO NOT RENDER A COMPONENT.
    if(!initialized) return null;

    // RENDER EMPTY COMPONENT WITH REQUIRED PROPERTIES TO BE PICKED UP BY THE SEVIO LOADER.
    return <div className={"sevioads"} data-zone={zone}>{children}</div>
}