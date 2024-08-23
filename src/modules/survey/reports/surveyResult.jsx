import React from 'react'
import { ExcelIcon, EyeIcon, ListIcon, ListIcon2, ParticipantIcon, ReloadIcon, SearchIcon } from '../../../components/icons/SharedIcons'
import { Link } from 'react-router-dom'

export default function SurveyResult() {
    return (
        <div>
            <div className="content-header">
                <h1 className="title">
                    الإحصائيات و التقارير
                </h1>
                <ul className="breadcrumb">
                    <li className="breadcrumbItem">
                        <a href="/" className="disabled"  >الرئيسية </a>
                        <span>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </li>

                    <li className="breadcrumbItem">
                        <a href="/" className="disabled" >  قائمة الاستطلاعات </a>
                        <span>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </li>
                    <li className="breadcrumbItem">
                        <a href="/" className="disabled" >  الاستطلاع   </a>
                        <span>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </li>
                    <li className="breadcrumbItem">
                        <a href="/" >  التقارير   </a>

                    </li>
                </ul>
            </div>
            <div className="content-body">
                <div className="card border-0 reports surveyResult">
                    <div className="card-body">
                        <div className="title-head">
                            <h2 className="title">
                                نموذج استطلاع رأي لتقييم رحلة عمرة شعبان
                            </h2>
                        </div>
                        <div className="total">
                            <Link className='btn btn-survey' to="/survey/reports">
                                <span>
                                    <ListIcon2 />
                                </span>
                                الرجوع للإحصائيات
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tab-content-reports mt-4">
                    <div className="card border-0">
                        <div className="row answer">
                            <div className="col-lg-12">
                                <div className="card-header">
                                    <h3 className='title'>
                                        هل تلقيت ما وعدت به في البرنامج السياحي المتفق عليه مع الشركة
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <div className='allProgress   row align-items-center'>
                                        <div className="col-lg-5">
                                            <h4 className='title'>راضي عموماً عما تلقيت</h4>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="row   align-items-center">
                                                <div className="col-lg-3">
                                                    <h5 className='num-share'>
                                                    50 مشاركة
                                                    </h5>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="progress" role="progressbar" aria-label="Basic example"
                                                        aria-valuenow="76" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar" style={{ width: " 76%" }}>

                                                        </div>

                                                    </div>
                                                </div>
                                                <div className='col-lg-1 text-end'>
                                                    <p>
                                                        76%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border-0 mt-5">
                    <div className="card-body">
                        <div className="row table-header participants align-items-center">
                            <div className="col">
                                <div className="input-group">
                                    <input type="text" className="form-control "
                                        placeholder="بحث" />
                                    <span className="input-group-text" id="basic-addon1">
                                        <SearchIcon />
                                    </span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group1">
                                    <label for="">تاريخ المشاركة</label>
                                    <input type="date" className="form-control " />

                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group1">
                                    <label for="">النوع</label>
                                    <select className="form-select" >
                                        <option selected>اختر</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="input-group1">
                                    <label for="">الفئة العمرية</label>
                                    <select className="form-select" >
                                        <option selected>اختر</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col">
                                <div className="reset mt-3">
                                    <button className="btn">
                                        <span className='me-2'>
                                            <ReloadIcon />
                                        </span>
                                        إلغاء
                                    </button>
                                </div>

                            </div>

                            <div className="col-lg-4 text-end">
                                <div className="export">
                                    <button className="btn export">
                                        <span className='me-2'>
                                            <ExcelIcon />
                                        </span>
                                        تصدير اكسل
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table participants-table  mt-3">
                                <thead>
                                    <th  >الاسم</th>
                                    <th className="text-center">رقم الهاتف  </th>
                                    <th className="text-center">النوع</th>
                                    <th className="text-center">الفئة العمرية</th>
                                    <th className="text-center">تاريخ المشاركة</th>

                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map(item => {
                                        return (
                                            <tr key={item}>
                                                <td className="text-start">
                                                    <Link >
                                                        محمد احمد
                                                    </Link>
                                                </td>
                                                <td>010 23456789</td>
                                                <td>ذكر</td>
                                                <td>25 - 35</td>
                                                <td>20/03/2024</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
