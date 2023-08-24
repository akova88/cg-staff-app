import axios from "axios";
import { STAFF_API_URL } from "./commont";


class StaffService {
    static getStaff() {
        return axios.get(STAFF_API_URL)
    }

    static createStaff(newStaff) {
        return axios.post(STAFF_API_URL, newStaff)
    }
}

export default StaffService