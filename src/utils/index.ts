import { AdType, SevioAdvertisement } from '../context/types';

/**
 * Checks to see if an advertisement for the given zone and adType exists.
 *
 * @param advertisements The current advertisement state.
 * @param zone The zone string of the advertisement.
 * @param adType The type of advertisement.
 * @returns boolean
 */
export function doesAdvertisementExist(
  advertisements: SevioAdvertisement[][],
  zone: string,
  adType: AdType
) {
  let exists = false;
  for (const innerArray of advertisements) {
    exists = !!innerArray.find(
      (ad) => ad.zone === zone && ad.adType === adType
    );
    if (exists) return true;
  }
  return false;
}

/**
 * Creates a clone of the current advertisement state and returns a new state with the new placement.
 *
 * @param advertisements The current advertisement state.
 * @param placement The advertisement to be added to the state.
 */
export function pushPlacement(
  advertisements: SevioAdvertisement[][],
  placement: SevioAdvertisement
) {
  if (
    doesAdvertisementExist(advertisements, placement.zone, placement.adType)
  ) {
    throw new Error(
      'Attempted to push an advertisement into state that already exists.'
    );
  }
  const copy = structuredClone(advertisements);
  copy.push([placement]);
  return copy;
}

/**
 * Creates a clone of the current advertisement state and returns a new state without the provided placement.
 *
 * @param advertisements The current advertisement state.
 * @param placement The advertisement to be removed from the state.
 */
export function removePlacement(
  advertisements: SevioAdvertisement[][],
  placement: SevioAdvertisement
) {
  const copy = structuredClone(advertisements);
  for (let i = 0; i < copy.length; i++) {
    copy[i] = copy[i].filter(
      (ad) => ad.zone !== placement.zone && ad.adType !== placement.adType
    );
  }
  return copy;
}
