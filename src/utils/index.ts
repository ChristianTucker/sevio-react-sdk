import { AdType, SevioAdvertisement } from '../context/types';

/**
 * Checks to see if an advertisement for the given zone and adType exists.
 *
 * @param advertisements The current advertisement state.
 * @param zone The zone string of the advertisement.
 * @param adType The type of advertisement.
 * @param debugEnabled Rather or not to print debug messages
 * @returns boolean
 */
export function doesAdvertisementExist(
  advertisements: SevioAdvertisement[],
  zone: string,
  adType: AdType,
  debugEnabled?: boolean
) {
  if (debugEnabled)
    console.log(`[DEBUG]: Checking if placement exists for zone (${zone})`);

  const exists = advertisements.find((ad) => ad.zone === zone && ad.adType === adType);
  if (exists) {
    if (debugEnabled) console.log(`[DEBUG]: Zone (${zone}) exists in state.`);
    return true;
  }

  if (debugEnabled)
    console.log(`[DEBUG]: Zone (${zone}) does not exist in state.`);

  return false;
}

/**
 * Creates a clone of the current advertisement state and returns a new state with the new placement.
 *
 * @param advertisements The current advertisement state.
 * @param placement The advertisement to be added to the state.
 * @param debugEnabled Rather or not to print debug messages to console.
 */
export function pushPlacement(
  advertisements: SevioAdvertisement[],
  placement: SevioAdvertisement,
  debugEnabled?: boolean
): SevioAdvertisement[] {
  if (debugEnabled) {
    console.log('[DEBUG]: Current state:', advertisements);
    console.log('[DEBUG]: Removing placement from state:', placement);
  }
  if (
    doesAdvertisementExist(advertisements, placement.zone, placement.adType)
  ) {
    throw new Error(
      'Attempted to push an advertisement into state that already exists.'
    );
  }
  const copy = structuredClone(advertisements);
  copy.push(placement);
  if (debugEnabled)
    console.log('[DEBUG]: New state after adding placement:', copy);
  return copy;
}

/**
 * Creates a clone of the current advertisement state and returns a new state without the provided placement.
 *
 * @param advertisements The current advertisement state.
 * @param placement The advertisement to be removed from the state.
 * @param debugEnabled Rather or not to print debug messages to console.
 */
export function removePlacement(
  advertisements: SevioAdvertisement[],
  placement: SevioAdvertisement,
  debugEnabled?: boolean
): SevioAdvertisement[] {
  if (debugEnabled)
    console.log('[DEBUG]: Removing placement from state:', placement);
  let clone = structuredClone(advertisements);
  clone = clone.filter((ad) => ad.zone !== placement.zone && ad.adType !== placement.adType);
  if (debugEnabled)
    console.log('[DEBUG]: New state after removing placement:', clone);
  return clone;
}
