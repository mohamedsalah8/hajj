import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EditIcon, LinkIcon, ListIcon, PlusIcon, SearchIcon } from '../../components/icons/SharedIcons'
import { changeSautesSurveyManagement, surveyManagementList } from '../../services/surveyManagement';
import { toast } from 'react-toastify';



export default function Survey() {

  const [surveyManagementUsersList, setSurveyManagementUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  async function changeSautes(id, status) {
    const res = await changeSautesSurveyManagement(id, status);
    if (res?.status === 200) {
      getSurveyList()
      toast.success("تم تحديث حالة الاستطلاع");
    }
  }

  async function getSurveyList() {
    const surveyListRes = await surveyManagementList({search: searchTerm});
    if (surveyListRes?.status === 200) {
      setSurveyManagementUsersList(surveyListRes?.data?.data);

    };
  }

  useEffect(() => {
    getSurveyList();
  }, [searchTerm]);



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }; 


  return (
    <>
      <div className="content-header">
        <h1 className="title">
          الاستطلاعات
        </h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <Link href="/" className="disabled"  >الرئيسية </Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>

          <li className="breadcrumbItem">
            <Link to="/survey" className="disable">  قائمة الاستطلاعات </Link>
          </li>
        </ul>
      </div>
      <div className="content-body">
        <div className="card border-0">
          <div className="card-body">
            <div className="row table-header">
              <div className="col-lg-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="بحث"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <SearchIcon />
                  </span>
                </div>
              </div>

              <div className="col-lg-4 text-end">
                <div className="add-survey">
                  <Link to="/survey/details" className="btn btn-survey">
                    <PlusIcon />
                    <span>
                      اضف استطلاع
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table  mt-3">
                <thead>
                  <tr>
                    <th>رقم</th>
                    <th className="w-25">الاسم</th>
                    <th className="text-center">عدد الأسئلة</th>
                    <th className="text-center">التفاعل</th>
                    <th className="text-center">تاريخ النشر</th>
                    <th className="text-center">الحالة</th>
                    {/* <th className="text-center">الرابط</th> */}
                    <th className="text-center">العمليات</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyManagementUsersList.length > 0 ? surveyManagementUsersList.map(item => (
                    <tr key={item.id}>
                      <td className="text-start">{item.id}</td>
                      <td className="text-start">
                        <Link to={`/survey/details/${item?.id}`}>
                          {item.title}
                        </Link>
                      </td>
                      <td>{item.questions_count}</td>
                      <td>{item.responses_count}</td>
                      <td>{item.created_at}</td>
                      <td>
                        <div className="form-check form-switch  d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={item?.status === "published"}
                            id="flexSwitchCheckChecked"
                            onChange={(e) => {
                              let status = e.target.checked ? "published" : "draft";
                              changeSautes(item?.id, status);
                            }}
                          />
                        </div>
                      </td>
                      <td className="d-flex gap-2 justify-content-center align-items-center">
                        <Link to={`/survey/details/${item?.id}`}>
                          <EditIcon />
                        </Link>
                        <Link to={`/survey/reports/${item?.id}`} className="btn">
                          <ListIcon />
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr className="emptyData">
                      <td colSpan="8" rowSpan="8">
                        <img src="assets/images/empty.svg" alt="" />
                        <p>لا يوجد استطلاعات متاحة</p>
                      </td>
                    </tr>
                  )}
                </tbody>


              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
