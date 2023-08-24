import { useEffect, useState } from "react"
import DepartmentService from "../services/departmentService";


const UseFetchDepartment = () => {
    const [departmentList, setDepartmentList] = useState([])
    useEffect(() => {
        async function getData() {
            let res = await DepartmentService.getDepartment();
            setDepartmentList(res.data)
        }

        getData();
    }, [])

    return departmentList;
}

export default UseFetchDepartment;
