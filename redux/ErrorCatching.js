import store from "./store";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (action?.payload?.status === 401) {
    if (action?.payload?.data?.message == "Token Not Match") {
      //store.dispatch(logOutAdmin());
    }
  }
  //console.log(action)
  return next(action);
};
