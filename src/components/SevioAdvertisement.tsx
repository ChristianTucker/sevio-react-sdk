import React from 'react';
import { SevioAdvertisement } from '../context/types';
import { useSevio } from '../hooks';
import { PropsWithChildren, useEffect } from 'react';
import { pushPlacement, removePlacement } from '../utils';

export function SevioAdvertisement({
  adType,
  zone,
  children,
}: PropsWithChildren<SevioAdvertisement>) {
  const { initialized, accountId, inventoryId, setAdvertisements } = useSevio();

  useEffect(() => {
    // WAITING ON SEVIO LOADER
    if (!initialized) return;

    // SEVIO LOADER HAS BEEN INITIALIZED, SO WE CAN UPDATE THE ADVERTISEMENTS STATE

    // CREATE THE PLACEMENT
    const placement: SevioAdvertisement = {
      accountId,
      inventoryId,
      adType,
      zone,
    };

    setAdvertisements((advertisements) => {
      // HANDLES IMMUTABLE ARRAY MODIFICATION & DUPLICATE ADVERTISEMENT CHECKING
      return pushPlacement(advertisements, placement);
    });

    // WHEN THIS ADVERTISEMENT COMPONENT IS UNMOUNTED, REMOVE THE ZONE FROM THE advertisements STATE
    return () => {
      setAdvertisements((advertisements) => {
        return removePlacement(advertisements, placement);
      });
    };
  }, [initialized]);

  // WHILE WAITING ON LOADER TO INITIALIZE, DO NOT RENDER A COMPONENT.
  if (!initialized) return null;

  // RENDER EMPTY COMPONENT WITH REQUIRED PROPERTIES TO BE PICKED UP BY THE SEVIO LOADER.
  return (
    <div className={'sevioads'} data-zone={zone}>
      {children}
    </div>
  );
}
