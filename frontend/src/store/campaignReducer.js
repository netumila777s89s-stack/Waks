const campaignInitialState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
};

const campaignReducer = (state = campaignInitialState, action) => {
  switch (action.type) {
    case 'CAMPAIGN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CAMPAIGN_SUCCESS':
      return {
        ...state,
        campaigns: action.payload,
        loading: false,
      };
    case 'CAMPAIGN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CAMPAIGN_CREATE':
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload],
      };
    case 'CAMPAIGN_DELETE':
      return {
        ...state,
        campaigns: state.campaigns.filter(c => c.id !== action.payload),
      };
    default:
      return state;
  }
};

export default campaignReducer;
