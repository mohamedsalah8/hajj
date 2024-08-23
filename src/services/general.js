import axios from "axios";

const URL = process.env.REACT_APP_API_URL + "/api/v1";


export const fetchDashboardStatistics = async () => {
  return await axios
    .get(`${URL}/dashboard/statistics`)
    .then((res) => res)
    .catch((err) => err.response);
};
