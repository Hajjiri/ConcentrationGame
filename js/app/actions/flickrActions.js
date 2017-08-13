export const FETCH_IMAGES = "FETCH_IMAGES";

export function fetchImages() {
  return {
    type: FETCH_IMAGES,
    payload: getImages().then(images => {
      if (images.stat === "ok") {
        return images.photos.photo.map(image => {
          return formImageUrl(image);
        });
      }
      throw images;
    })
  };
}

import { FlickerSettings } from "@accessors/settings";

//https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=027fdb30ea1a7ef76e0420eaab5042b1&user_id=151568653@N06&method=flickr.people.getPhotos
function getImages() {
  var requestUrl =
    "https://api.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=" +
    FlickerSettings.getApiKey() +
    "&user_id=" +
    FlickerSettings.getUserId() +
    "&method=flickr.people.getPhotos";
  return fetch(requestUrl).then(images => images.json()); // returns a promise, will be handled by middleware with three possibilites (rejected, pending, fulfilled)
}

function formImageUrl(image) {
  return {
    uri: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
  };
}
