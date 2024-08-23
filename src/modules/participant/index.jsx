import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchParticipantList } from 'services/participant';
import ParticipantFilters from './Filters';
import ParticipantsList from './List';
import useParticipants from './useParticipants';


const initalFilters = {
  search: "",
  entry_at: "",
  gender: "",
  age_range: "",
}

export default function Participant() {
  // states
  const [participantsList, setParticipantsList] = useState([]);
  const [meta, setMeta] = useState();
  const { filters, exportToExcel, handleFiltersInputs, resetFilters, goTo } = useParticipants(initalFilters);

  async function getParticipantList() {
    const res = await fetchParticipantList(filters);
    if (res?.status === 200) {
      setParticipantsList(res?.data?.data);
      setMeta(res?.data?.meta);
    }
  }

  useEffect(() => {
    getParticipantList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);




  return (
    <>
      <div className="content-header">
        <h1 className="title">
          المشاركين
        </h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <Link to="index.html" className="disabled"  >الرئيسية </Link>
            <span>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.74995 12.1199L4.94662 8.31655C4.49745 7.86738 4.49745 7.13238 4.94662 6.68322L8.74995 2.87988" stroke="#292D32" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>

          <li className="breadcrumbItem">
            <Link to="#" className="disable">  المشاركين   </Link>
          </li>
        </ul>
      </div>

      <div className="content-body">
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
              participantsList={participantsList}
              meta={meta}
              goTo={goTo}
            />



          </div>
        </div>
      </div>
    </>
  )
}
