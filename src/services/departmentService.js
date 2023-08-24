import axios from "axios";
import { DEPARTMENT_API_URL } from "./commont";


class DepartmentService {
    static getDepartment() {
        return axios.get(DEPARTMENT_API_URL)
    }

    static createDepartment(newDept) {
        return axios.post(DEPARTMENT_API_URL, newDept)
    }
}

export default DepartmentService