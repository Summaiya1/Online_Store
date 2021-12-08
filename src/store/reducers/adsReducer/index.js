const initialState = { 
  ads: [],
  favoriteAds: []
}

export default function adsReducer(state = initialState, action) {
  console.log('reducer called ->', action)
  switch(action.type) {
    case 'UPDATE_ADS': {
      return { ...state, ads: action.data }
    }
    case 'REMOVE_ADS': {
      return { ...state, ads: null }
    }
    default: {
      return state
    }
  }
}
