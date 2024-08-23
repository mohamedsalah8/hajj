import axios from "axios";
import { useSBSDispatch, useSBSState } from "../context/global";
import { uuidv4Generator } from "./generateUUID";



let axiosInterceptor = null;
let axiosRequestInterceptor = null;
const AxiosConfiguration = () => {
	let agent_token = localStorage.getItem("agent_token") ?? uuidv4Generator();


	let { token } = useSBSState();
	const dispatch = useSBSDispatch();


	// axios.defaults.headers.common["X-Client-ID"] = IPv4;
	axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	axios.defaults.headers.common["X-Agent-Token"] = `${agent_token}`;
	// axios.defaults.withCredentials = true;
	axios.defaults.withXSRFToken = true;

	let counter = 0;
	if (!!axiosInterceptor || axiosInterceptor === 0) {
		axios.interceptors.response.eject(axiosInterceptor);
	}

	if (!!axiosRequestInterceptor || axiosRequestInterceptor === 0) {
		axios.interceptors.request.eject(axiosRequestInterceptor);
	}
	axiosRequestInterceptor = axios.interceptors.request.use(
		async (request) => {
			// if (IPv4=="") {
			// 	const response = await fetch('https://ipapi.co/json/')
			// 	const data = await response.json();
			// 	request.headers.common["X-Client-ID"] = data.ip;
			// 	localStorage.setItem("IPv4",data.ip);
			// }
			counter++;
			if (request.data && request.data.hasOwnProperty("search")) {
				return request;
			} else {
				dispatch({ type: "setLoading", payload: true });
				return request;
			}
		},
		(error) => {
			counter--;
		}
	);

	axiosInterceptor = axios.interceptors.response.use(
		(response) => {
			counter--;
			// if (!response.config.url.includes("view_user_profile")) {
			if (counter === 0) {
				dispatch({ type: "setLoading", payload: false });

				if (response.status == 202) {
					// window.location.href = response.data.data.url;
					if (response.data.actionType === "redirect") {
						window.location.href = response.data.data.url
					} else if (response.data.actionType === "form-redirect") {

					} else if (response.data.actionType === "session") {
						localStorage.setItem("checkoutId", response.data.data.sessionId);
						window.location.href = "/hyperpay";
					}
				}
				return response;
			} else {
				return response;
			}
		},

		(error) => {
			counter--;
			// Show Alert FOr Error

			if (counter === 0) {
				dispatch({ type: "setLoading", payload: false });
			}
			if (
				error.response &&
				error.response.status === 400 &&
				!error.response.config.url.includes("files/fetch") &&
				!error.response.data.message.includes("company block from system") &&
				error.response.data.err_code !== "403"
			) {
				dispatch({
					type: "setError",
					payload: true,
					message: {
						title: "هناك خطأ ما!",
						body: Array.isArray(error?.response?.data?.message)
							? error?.response?.data?.message.msg
							: error?.response?.data?.message,
					},
				});
			} else if (
				!error.config.url.includes("lookups_common_product_builder") &&
				error.response &&
				error.response.status === 401
			) {
				// debugger
				dispatch({
					type: "setError",
					payload: true,
					message: { title: "Unauthenticated!", body: "Go Back to Login" },
				});

				localStorage.removeItem("isAuth");
				localStorage.removeItem("token");
				localStorage.removeItem("currentLocale");
				window.location.href = "/login";
			} else if (
				error.response &&
				error.response.status === 422
			) {
				let errorsMsgs = ``;
				if (!error.config.url.includes("marketplace/hotels/search")) {
					const errorMessages = [];
					Object.values(error.response.data.errors).forEach((msg) =>
						errorMessages.push(Array.isArray(msg) ? msg[0] : msg)
					);
					errorsMsgs = [...new Set(errorMessages).values()].join(" ");
				} else {
					Object.values(error.response.data.errors).map(
						(msg) => (errorsMsgs = msg)
					);
				}
				const configUrl = error.response.config.url;
				if (
					configUrl.includes("hotels/check_availability") ||
					configUrl.includes("issue-request/edit-request-passengers")
				) {

				} else {
					dispatch({
						type: "setError",
						payload: true,
						message: {
							title: error?.response?.data?.message,
							body: errorsMsgs,
						},
					});
				}
			} else if (error.response && error.response.status === 500) {
				dispatch({
					type: "setError",
					payload: true,
					message: {
						title: "Internal Server Error, Please try again later",
						body: error?.response?.data?.message,
					},
				});
			} else if (error.response && error.response.status === 404) {
				dispatch({
					type: "setError",
					payload: true,
					message: {
						title: error?.response?.data?.message,
						body: "Page not found 404",
					},
				});
			} else if (
				error.response &&
				error.response.status === 400 &&
				error?.response?.data?.message.includes("company block from system")
			) {
				dispatch({
					type: "setError",
					payload: true,
					message: {
						title: "company block from system!",
						body: error?.response?.data?.message,
					},
				});

				localStorage.removeItem("isAuth");
				localStorage.removeItem("token");
				localStorage.removeItem("currentLocale");
				window.location.href = "/auth/login";
			}

			return Promise.reject(error);
		}
	);
};

export default AxiosConfiguration;
