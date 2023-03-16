import axios from "axios";

import LocalStorageUtil from "./utils/LocalStorageUtil";

export default axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${LocalStorageUtil.getToken()}`,
    },
});