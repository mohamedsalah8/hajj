import axios from "axios";

const URL = process.env.REACT_APP_API_URL;


export const TeamManagementGroupList = async () => {
	return await axios
		.get(`${URL}/api/v1/team-management/role`)
		.then((res) => res)
		.catch((err) => err.response);
};
export const TeamManagementGroupView = async (id) => {
	return await axios
		.get(`${URL}/api/v1/team-management/role/${id}`)
		.then((res) => res)
		.catch((err) => err.response);
};
export const CreateGroupTeamManagement = async () => {
	return await axios
		.post(`${URL}/api/v1/team-management/role`)
		.then((res) => res)
		.catch((err) => err.response);
};
export const UpdateGroupTeamManagement = async (id) => {
	return await axios
		.put(`${URL}/api/v1/team-management/role/${id}`)
		.then((res) => res)
		.catch((err) => err.response);
};
