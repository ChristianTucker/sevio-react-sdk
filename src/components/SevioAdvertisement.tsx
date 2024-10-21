import React, { useEffect } from 'react';
import { SevioAdvertisement } from '../context/types';
import { useSevio } from '../hooks';
import { PropsWithChildren } from 'react';
import { pushPlacement, removePlacement } from '../utils';

export function SevioAdvertisement({
  zone,
  adType,
  children,
  style
}: PropsWithChildren<SevioAdvertisement & { style?: any }>) {
  const { initialized, accountId, inventoryId, debugEnabled, setAdvertisements } = useSevio();
  useEffect(() => {
    if(!debugEnabled) return;
    console.log(`[DEBUG]: SevioAdvertisement initialization set to (${initialized}) for zone (${zone})`)
  }, [debugEnabled, initialized])

  useEffect(() => {
    // WAITING ON SEVIO LOADER
    if (!initialized) return;

    // SEVIO LOADER HAS BEEN INITIALIZED, SO WE CAN UPDATE THE ADVERTISEMENTS STATE
    if (debugEnabled)
      console.log(
        '[DEBUG]: Sevio initialization detected in mounted Advertisement component - You may see this more than once if you have multiple mounted components'
      );

    // CREATE THE PLACEMENT
    const placement: SevioAdvertisement = {
      adType,
      zone,
    };

    setAdvertisements((advertisements) => {
      // HANDLES IMMUTABLE ARRAY MODIFICATION & DUPLICATE ADVERTISEMENT CHECKING
      return pushPlacement(advertisements, placement, debugEnabled);
    });

    // WHENEVER THIS ADVERTISEMENT COMPONENT IS UNMOUNTED, REMOVE THE ZONE FROM THE advertisements STATE
    return () => {
      setAdvertisements((advertisements) => {
        return removePlacement(advertisements, placement, debugEnabled);
      });
    };
  }, [initialized]);

  // WHILE WAITING ON LOADER TO INITIALIZE, DO NOT RENDER A COMPONENT.
  if (!initialized) return null;

  // RENDER EMPTY COMPONENT WITH REQUIRED PROPERTIES TO BE PICKED UP BY THE SEVIO LOADER.
  return (
    <div className={'sevioads'} data-zone={zone} style={style}>
      {children}
    </div>
  );
}
