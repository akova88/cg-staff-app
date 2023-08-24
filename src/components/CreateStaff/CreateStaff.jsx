import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DepartmentService from "../../services/departmentService";
import { DEPARTMENT_API_URL } from "../../services/commont";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { toast } from "react-toastify";
import StaffService from './../../services/staffService';
import UseFetchDepartment from "../../hooks/UseFetchDepartment";

const schema = yup.object({
    email: yup.string().email("Please enter a valid email").required(),
    name: yup.string()
        .min(5, "username phải nhiều hơn 5 ký tự")
        .max(20)
        .required()
})

function CreateStaff() {
    // const [departmentList, setDepartmentList] = useState([])
    // useEffect(() => {
    //     async function getData() {
    //         let resp = await DepartmentService.getDepartment(DEPARTMENT_API_URL)
    //         setDepartmentList(resp.data)
    //     }
    //     getData();
    // },[])

    const departmentList = UseFetchDepartment();

    const navigate = useNavigate()

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema)
    })

    const handleCreateStaff = async (data) => {
        console.log(data);
        data = {
            ...data,
            department: JSON.parse(data.department)
        }
        
        let createRes = await StaffService.createStaff(data)
        if(createRes && createRes.data) {
            toast.success(`Staff: ${createRes?.data?.name} created success`);
            navigate('/staff/list')
        }
    }

    return (
        <>
            <section className="staff-list-info">
                <div className="container mt-3">
                    <div className="d-flex align-items-center">
                        <h5 className="m-0">CREATE STAFF</h5>
                        <Link className="btn btn-sm btn-outline-dark ms-2" to={'/staff/list'}>
                            <i className="fa fa-arrow-left me-2"></i>
                            Back to staff list
                        </Link>
                    </div>
                    <p className="fst-italic mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, minima beatae laudantium tempore est voluptatem reprehenderit aliquid quia culpa incidunt dignissimos ipsa, quos autem unde neque quasi! Corrupti, ipsam exercitationem!</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit(handleCreateStaff)}>
                            <div className="col-sm-6">
                                <div className="form-group mb-2">
                                    <label className="form-lable">Name</label>
                                    <input type="text" className="form-control" {...register("name")}/>
                                    <span className="text-danger">{errors?.name?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Email</label>
                                    <input type="text" className="form-control" {...register('email', {
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        },
                                    })}/>
                                    <span className="text-danger">{errors?.email?.message}</span>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable me-2">Gender</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" value={"male"} defaultChecked={true} {...register("gender")}/>
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" value={'female'} {...register("gender")}/>
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Avatar</label>
                                    <input type="url" className="form-control" {...register("avatar")}/>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-lable">Department</label>
                                    <select className="form-control mb-2" {...register("department")}>
                                        {
                                            departmentList?.map(dept => (
                                                <option key={dept.id} value={JSON.stringify(dept)}>{dept.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <button type="submit" className="btn btn-sm btn-danger mt-2 p-2">
                                        <i className="fa fa-plus me-2"></i>
                                        Create
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateStaff