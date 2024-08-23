import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { viewParticipantDetails } from 'services/participant';

export default function ParticipantDetails() {
  // global hooks
  const { id } = useParams();
  const navigate = useNavigate();
  // states
  const [participantData, setParticipantData] = useState(null);

  //** function
  async function getParticipantDate() {
    const res = await viewParticipantDetails(id);
    if (res?.status === 200) {
      setParticipantData(res?.data?.data);
    } else {
      navigate('/participant')
    }
  }

  useEffect(() => {
    if (id) {
      getParticipantDate();
    } else {
      navigate('/participant')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  if (!participantData) {
    return null
  }

  return (
    <>
      <div className="content-header">
        <h1 className="title">
          مشارك
        </h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <Link href="/" className="disabled">الرئيسية </Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988"
                  stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </span>
          </li>

          <li className="breadcrumbItem">
            <Link href="/participant" className="disabled"> المشاركين</Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988"
                  stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </span>
          </li>
          <li className="breadcrumbItem">
            <span className="disable" style={{ color: "var(--mainColor)" }}>
              المشارك
            </span>
          </li>
        </ul>
      </div>

      <div className="content-body participant-details">
        <div className="card border-0">
          <div className="card-body">
            <div className="participant-title">
              <h2 className="title">
                {participantData?.name}
              </h2>
              <p className="gender"> {participantData?.gender}</p>
            </div>
            <div className="row mt-3">
              <div className="col-lg-3 col-md-6">
                <div className="details">
                  <h4 className="title"> رقم التواصل</h4>
                  <p className="desc">{participantData?.phone || "-"}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="details">
                  <h4 className="title"> الفئة العمرية </h4>
                  <p className="desc"> {participantData?.age_range || "-"}</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="details">
                  <h4 className="title"> المحافظة </h4>
                  <p className="desc">{participantData?.governorate || "-"} </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="details">
                  <h4 className="title"> رقم الجواز </h4>
                  <p className="desc">{participantData?.passport_number || "-"} </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="content-header mt-5">
          <h3 className="title">المشاركات
            <span>{participantData?.entries?.length}</span>
          </h3>
        </div>

        <div className="presentation-available">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            {participantData?.entries?.map(entry => {
              return (
                <div className="accordion-item p-4" key={entry?.id}>

                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne">
                      <p>
                        <span className="title">{entry?.title}</span>
                        <span className="desc"> المشاركة: {entry?.created_at ? moment(entry?.created_at).format("DD/MM/yyyy") : "-"} </span>
                      </p>
                    </button>
                  </h2>
                  <div id="panelsStayOpen-collapseOne" className="accordion-collapse border-0 collapse show">
                    <div className="accordion-body">
                      <h4 className="title">
                        الاجابات
                      </h4>
                      {entry?.answers?.map(question => {
                        return (
                          <div className="answers" key={question?.id}>
                            <div className="answer-details">
                              <h6 className="title">{question?.question}</h6>
                              <p className="desc">{question?.answer}</p>
                            </div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </div>

              )
            })}

          </div>

        </div>
      </div>
    </>
  )
}
