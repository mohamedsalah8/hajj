import axios from "axios";
import { pramasCleanEmpty } from "helpers/pramasCleanEmpty";

const URL = process.env.REACT_APP_API_URL;


export const TeamManagementUsersList = async (search) => {
	return await axios
		.get(`${URL}/api/v1/team-management/user` ,
			{
				params: pramasCleanEmpty(search)
			  } 
		)
		.then((res) => res)
		.catch((err) => err.response);
};
export const TeamManagementUsersView = async (id) => {
	return await axios
		.get(`${URL}/api/v1/team-management/user${id}`)
		.then((res) => res)
		.catch((err) => err.response);
};
export const CreateUsersTeamManagement = async (data) => {
	return await axios
		.post(`${URL}/api/v1/team-management/user`,data)
		.then((res) => res)
		.catch((err) => err.response);
};
export const UpdateUsersTeamManagement = async (id,data) => {
	return await axios
		.put(`${URL}/api/v1/team-management/user/${id}`,data)
		.then((res) => res)
		.catch((err) => err.response);
};
export const ChangeSautesUsersTeamManagement = async (id,data) => {
	return await axios
		.put(`${URL}/api/v1/team-management/user/${id}/status`,data)
		.then((res) => res)
		.catch((err) => err.response);
};

export const ListGroup = async () => {
	return await axios
		.get(`${URL}/api/v1/team-management/role`  )
		.then((res) => res)
		.catch((err) => err.response);
};


export const FetchPermissions = async () => {
	return await axios
		.get(`${URL}/api/v1/lookup/permissions`)
		.then((res) => res)
		.catch((err) => err.response);
};
export const CreateGroup = async (data) => {
	return await axios
		.post(`${URL}/api/v1/team-management/role`,data)
		.then((res) => res)
		.catch((err) => err.response);
};


export const veiwGroup = async (id) => {
	return await axios
		.get(`${URL}/api/v1/team-management/role/${id}`)
		.then((res) => res)
		.catch((err) => err.response);
};

export const UpdateGroup = async (id,data) => {
	return await axios
		.put(`${URL}/api/v1/team-management/role/${id}`,data)
		.then((res) => res)
		.catch((err) => err.response);
};