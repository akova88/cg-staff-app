import React, { useEffect, useState } from "react";
import StaffService from "../../services/staffService";
import { Link } from "react-router-dom";

function StaffList() {
    const [staffList, setStaffList] = useState([])
    useEffect(() => {
        async function getData() {
            let resp = await StaffService.getStaff();
            setStaffList(resp.data)
        }
        getData();
    }, [])
    return (
        <>
            <section className="staff-info my-3">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h4>Staff Manager</h4>
                        <Link to={"/staff/create"} className="btn btn-warning btn-sm ms-2"><i className="fa fa-plus-circle me-1"></i>New</Link>
                    </div>
                    <p className="fst-italic">Deserunt ex minim ipsum consectetur incididunt nostrud qui sunt qui. Deserunt reprehenderit quis esse dolore officia elit sit. Ad deserunt voluptate quis consectetur aliqua proident cupidatat exercitation aliqua consequat occaecat. Labore ex occaecat enim elit sit qui velit id. Qui ut sit anim excepteur ullamco ipsum. Consequat aliqua incididunt anim ex dolore.</p>
                    <div className="d-flex align-items-center">
                        {/* <input onInput={handleSearch} type="search" className="form-control w-25 me-2" placeholder="Search staff name" /> */}
                        {/* <button className="btn btn-outline-secondary btn-sm">Search</button> */}
                    </div>
                </div>
            </section>
            <section className="staff-list">
                <div className="container">
                    <div className="row">
                        {staffList?.map((staff) => (
                            <div className="col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body py-3">
                                        <div className="row">
                                            <div className="col-lg-3 text-center">
                                                <img src={staff.avatar} className="img-fluid mb-3 rounded-circle" alt="user" />
                                            </div>
                                            <div className="col-lg-9">
                                                <h4>{staff.name}</h4>
                                                <p>{staff.email}</p>
                                                <div className="button-list mt-4 mb-3">
                                                    <button type="button" className="btn btn-outline-primary me-2"><i className="fa fa-square me-2" />Message</button>
                                                    <button type="button" className="btn btn-outline-success me-2"><i className="fa fa-phone me-2" />Call Now</button>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row" className="p-1">Department :</th>
                                                                <td className="p-1">{staff.department.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row" className="p-1">Gender :</th>
                                                                <td className="p-1">{staff.gender}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    )
}

export default StaffList