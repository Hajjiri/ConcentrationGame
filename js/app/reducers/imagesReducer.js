import * as flickrActions from "@actions/flickrActions";

export default function reducer(
  state = {
    images: {},
    imagesError: null
  },
  action
) {
  switch (action.type) {
    case flickrActions.FETCH_IMAGES + "_PENDING": {
      return {
        ...state,
        images: null,
        imagesError: null
      };
    }
    case flickrActions.FETCH_IMAGES + "_FULFILLED": {
      return {
        ...state,
        images: action.payload,
        imagesError: null
      };
    }
    case flickrActions.FETCH_IMAGES + "_REJECTED": {
      return {
        ...state,
        images: null,
        imagesError: action.payload
      };
    }
  }
  return state;
}
