export const quizReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUIZ": {
      return { quizDetails: [...state.quizDetails, action.quiz], start: true };
    }
    case "RESTART": {
      return { ...state, start: false };
    }
    case "START": {
      return { ...state, start: true };
    }
    default:
      return state;
  }
};
