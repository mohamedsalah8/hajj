import axios from "axios";
import { pramasCleanEmpty } from "helpers/pramasCleanEmpty";

const URL = process.env.REACT_APP_API_URL + "/api/v1";


export const surveyManagementList = async (search) => {
  return await axios
    .get(`${URL}/survey-management/survey` ,
    {
      params: pramasCleanEmpty(search)
    } )
    .then((res) => res)
    .catch((err) => err.response);
};
export const surveyManagementView = async (id) => {
  return await axios
    .get(`${URL}/survey-management/survey/${id}`)
    .then((res) => res)
    .catch((err) => err.response);
};
export const createSurveyManagement = async (data) => {
  return await axios
    .post(`${URL}/survey-management/survey`, data)
    .then((res) => res)
    .catch((err) => err.response);
};
export const updateSurveyManagement = async (id, data) => {
  return await axios
    .put(`${URL}/survey-management/survey/${id}`, data)
    .then((res) => res)
    .catch((err) => err.response);
};
export const changeSautesSurveyManagement = async (id, status) => {
  return await axios
    .put(`${URL}/survey-management/survey/${id}/status/${status}`)
    .then((res) => res)
    .catch((err) => err.response);
};


export const surveyManagementStatistics = async (id) => {
  return await axios
    .get(`${URL}/survey-management/statistics/${id}`)
    .then((res) => res)
    .catch((err) => err.response);
};

export const surveyManagementParticipants = async (surveyId) => {
  return await axios
    .get(`${URL}/participant`, {
      params: pramasCleanEmpty(surveyId)
    })
    .then((res) => res)
    .catch((err) => err.response);
};


///lookup/participant-fields

export const lookupParticipantFields = async () => {
  return await axios
    .get(`${URL}/lookup/participant-fields`)
    .then((res) => res)
    .catch((err) => err.response);
};
