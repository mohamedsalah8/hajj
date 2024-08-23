import axios from "axios";
import { pramasCleanEmpty } from "helpers/pramasCleanEmpty";

const URL = process.env.REACT_APP_API_URL + "/api/v1";


export const fetchParticipantList = async (params) => {
  return await axios
    .get(`${URL}/participant`, {
      params: pramasCleanEmpty(params)
    })
    .then((res) => res)
    .catch((err) => err.response);
};
export const viewParticipantDetails = async (id) => {
  return await axios
    .get(`${URL}/participant/${id}`)
    .then((res) => res)
    .catch((err) => err.response);
};
export const exportParticipantsExcel = async (filters) => {
  return await axios
    .get(`${URL}/export/participant`, { params: pramasCleanEmpty(filters), responseType: "blob", })
    .then((res) => res)
    .catch((err) => err.response);
};
