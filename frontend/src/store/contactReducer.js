const contactInitialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactReducer = (state = contactInitialState, action) => {
  switch (action.type) {
    case 'CONTACT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CONTACT_SUCCESS':
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case 'CONTACT_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CONTACT_CREATE':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'CONTACT_DELETE':
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload),
      };
    default:
      return state;
  }
};

export default contactReducer;
