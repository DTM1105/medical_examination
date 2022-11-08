const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  // //admin
  // ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
  // ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
  // PROCESS_LOGOUT: 'PROCESS_LOGOUT',

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILDED: "FETCH_GENDER_FAILDED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILDED: "FETCH_POSITION_FAILDED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILDED: "FETCH_ROLE_FAILDED",

  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILDED: "CREATE_USER_FAILDED",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILDED: "EDIT_USER_FAILDED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILDED: "DELETE_USER_FAILDED",

  FETCH_ALL_USER_SUCCESS:'FETCH_ALL_USER_SUCCESS',
  FETCH_ALL_USER_FAILED:'FETCH_ALL_USER_FAILED',

  FETCH_TOP_DOCTOR_SUCCESS:'FETCH_TOP_DOCTOR_SUCCESS',
  FETCH_TOP_DOCTOR_FAILED:'FETCH_TOP_DOCTOR_FAILED',

  FETCH_ALL_DOCTOR_SUCCESS:'FETCH_ALL_DOCTOR_SUCCESS',
  FETCH_ALL_DOCTOR_FAILED:'FETCH_ALL_DOCTOR_FAILED',

  SAVE_DETAIL_DOCTOR_SUCCESS:'SAVE_DETAIL_DOCTOR_SUCCESS',
  SAVE_DETAIL_DOCTOR_FAILED:'SAVE_DETAIL_DOCTOR_FAILED',

  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
  FETCH_ALLCODE_SCHEDULE_TIME_FAILED:'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',
});

export default actionTypes;
