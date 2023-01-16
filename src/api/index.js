import axios from "axios";

const baseUrl = "http://localhost:5000/tasks";

export const fetchTasks = () => axios.get(baseUrl);
export const createTask = (data) => axios.post(baseUrl + "/create",data);
