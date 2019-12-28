const initState = {
  preview: false
};

const previewReducer = (state = initState, actions = {}) => {
  if (actions.type === 'toggle') {
    return {
      ...state,
      preview: !state.preview
    };
  }
  return state;
};

export default previewReducer;
