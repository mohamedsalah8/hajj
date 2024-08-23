import React, { useEffect, useMemo, useState } from 'react'
import { FiletIcon, ListIcon2, ParticipantIcon, } from 'components/icons/SharedIcons'
import { Link, useParams } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { surveyManagementParticipants, surveyManagementStatistics } from 'services/surveyManagement';
import LocationReports from './StatisticsComponents/LocationReports';
import GenderAndAgeReport from './StatisticsComponents/GenderAndAgeReport';
import QuestionsReport from './StatisticsComponents/QuestionsReport';
import useParticipants from 'modules/participant/useParticipants';
import ParticipantFilters from 'modules/participant/Filters';
import ParticipantsList from 'modules/participant/List';

ChartJS.register(ArcElement, Tooltip, Legend);


// export const total = {
//   labels: [' 7 - 10 (50%) ', ' 6 - 4 (35%) ', ' 3 - 1 (15%) '],

//   datasets: [
//     {
//       label: ' ',
//       data: [50, 35, 15],
//       backgroundColor: [
//         '#C19301',
//         '#DDDCDC',
//         'grey',
//       ]
//     }

//   ],

// };
// const options = {
//   plugins: {
//     legend: {
//       position: 'right',
//       rtl: true,
//       labels: {
//         usePointStyle: true,
//         pointStyle: 'circle',
//         padding: 20,
//       }
//     }
//   },
// }

export default function Reports() {
  // ** global hooks
  const { id } = useParams();
  const initalFilters = {
    search: "",
    entry_at: "",
    gender: "",
    age_range: "",
    survey_id: id
  }


  const { filters, exportToExcel, handleFiltersInputs, resetFilters, goTo } = useParticipants(initalFilters);
  // states
  const [surveyReports, setSurveyReports] = useState({
    statistics: null,
    participants: null
  });
  const [meta, setMeta] = useState();

  // get Survey Statistics
  useEffect(() => {
    async function getSurveyStatistics() {
      const res = await surveyManagementStatistics(id);
      if (res?.status === 200) {
        setSurveyReports((prev) => ({ ...prev, statistics: res?.data?.data }))
      }
    }
    getSurveyStatistics();
  }, [id]);

  // get Survey Participants list with filters
  useEffect(() => {
    async function getSurveyParticipants() {
      const res = await surveyManagementParticipants(filters);
      if (res?.status === 200) {
        setSurveyReports((prev) => ({ ...prev, participants: res?.data?.data }))
        setMeta(res?.data?.meta);
      }
    }
    getSurveyParticipants()
  }, [id, filters]);


  const genderData = useMemo(() => {
    if (surveyReports?.statistics?.gender) {
      const data = surveyReports?.statistics?.gender;
      return {
        labels: data?.map(item => item?.name === "male" ? "ذكور" : item?.name === "female" ? "إناث" : "غير محدد"),
        datasets: [
          {
            label: 'عدد ',
            data: data?.map(item => item?.count),
            backgroundColor: ['#1D548F', '#C19301', "#DDDCDC"]
          },
        ],
      }
    }
  }, [surveyReports.statistics?.gender]);

  const ageRangeData = useMemo(() => {
    if (surveyReports?.statistics?.age_range) {
      const data = surveyReports?.statistics?.age_range
      return {
        labels: data.map(item => item?.name ? item?.name : "غير محدد"),
        datasets: [
          {
            label: 'عدد',
            data: data.map(item => item?.count),
            backgroundColor: [
              '#DDDCDC',
              'grey',
              '#C19301',
            ]
          },
        ],
      }
    }
  }, [surveyReports.statistics?.age_range])

  if (!surveyReports.statistics) {
    return null
  }

  return (
    <>
      <div className="content-header">
        <h1 className="title">
          الإحصائيات و التقارير
        </h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <Link to="/" className="disabled">الرئيسية</Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>

          <li className="breadcrumbItem">
            <Link to="/survey" className="disabled">قائمة الاستطلاعات</Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>
          <li className="breadcrumbItem">
            <Link to={`/survey/reports/${id}`} className="disabled">الاستطلاع</Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>
          <li className="breadcrumbItem">
            <Link to={`/survey/reports/${id}`}>التقارير</Link>
          </li>
        </ul>
      </div>

      <div className="content-body">
        <div className="card border-0 reports">
          <div className="card-body">
            <h2 className="title">
              {surveyReports.statistics?.title}
            </h2>
            <div className="total">
              <div className="icon">
                <ParticipantIcon />
              </div>
              <div className="title-icon">
                <h3 className="title">إجمالي عدد المشاركين</h3>
                <p className='num'>{surveyReports?.statistics?.entries_count}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="tabs-survey">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link  active" id="pills-stats-tab" data-bs-toggle="pill" data-bs-target="#pills-stats"
                type="button" role="tab" aria-controls="pills-stats" aria-selected="true">
                <span>
                  <ListIcon2 />
                </span>
                احصائيات
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-participants-tab" data-bs-toggle="pill" data-bs-target="#pills-participants" type="button" role="tab" aria-controls="pills-participants" aria-selected="false">
                <span>
                  <FiletIcon />
                </span>
                المشاركين
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-random-tab" data-bs-toggle="pill" data-bs-target="#pills-random" type="button" role="tab" aria-controls="pills-random" aria-selected="false">
                <span>
                  <Random />
                </span>
                استطلاع عشوائي
              </button>
            </li> */}
          </ul>


          <div className="tab-content tab-content-reports" id="pills-tabContent">
            {/* StatisticsTab content */}
            <div className="tab-pane fade show active" id="pills-stats" role="tabpanel"
              aria-labelledby="pills-stats-tab" tabIndex="0">

              <LocationReports citiesList={surveyReports.statistics?.cities} />
              <GenderAndAgeReport ageRangeData={ageRangeData} genderData={genderData} />
              <QuestionsReport questionsList={surveyReports.statistics?.questions} />

              {/* <div className="card border-0 mt-5">
                <div className="row answer">
                  <div className="col-lg-12">
                    <div className="card-header">
                      <h3 className='title'>
                        هل ترشح الشركة المنظمة لقريب أو صديق ؟
                      </h3>
                    </div>
                    <div className="card-body">
                      <Pie data={total} options={options} />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* ParticipantsTab content */}
            <div className="tab-pane fade contact-form" id="pills-participants" role="tabpanel" aria-labelledby="pills-participants-tab" tabIndex="0">
              {surveyReports.participants &&
                <div className="contet-body">
                  <div className="card border-0">
                    <div className="card-body">
                      <ParticipantFilters
                        filters={filters}
                        handleFilters={handleFiltersInputs}
                        resetFilters={resetFilters}
                        exportToExcel={exportToExcel}
                      />
                      {/* Participants list */}
                      <ParticipantsList
                        participantsList={surveyReports.participants}
                        goTo={goTo}
                        meta={meta}
                      />
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
