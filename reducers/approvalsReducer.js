const initialState = {
  favouritesList: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_PUPPY':
      return {
        ...state,
        favouritesList: state.favouritesList.concat(action.payload),
      };
  }
  return state;
};
