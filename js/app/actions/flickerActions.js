export const FETCH_IMAGES = "FETCH_IMAGES";

export function fetchImages() {
  return {
    type: FETCH_IMAGES,
    payload: images // get from flcikr api
  };
}
