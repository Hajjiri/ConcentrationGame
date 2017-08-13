import * as flickrActions from "@actions/flickrActions";

export default function reducer(
  state = {
    images: {},
    imagesError: null,
    fetched: false
  },
  action
) {
  switch (action.type) {
    case flickrActions.FETCH_IMAGES + "_PENDING": {
      return {
        ...state,
        images: null,
        imagesError: null,
        fetched: false
      };
    }
    case flickrActions.FETCH_IMAGES + "_FULFILLED": {
      return {
        ...state,
        images: action.payload,
        imagesError: null,
        fetched: true
      };
    }
    case flickrActions.FETCH_IMAGES + "_REJECTED": {
      return {
        ...state,
        images: null,
        imagesError: action.payload,
        fetched: false
      };
    }
  }
  return state;
}
