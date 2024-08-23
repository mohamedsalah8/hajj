import React, { useEffect, useState } from 'react'
import { Total, Users, UsersGroup } from '../../components/icons/SharedIcons';
import { fetchDashboardStatistics } from 'services/general';

export default function Home() {
  const [dashboardStatistics, setDashboardStatistics] = useState({
    participants: 0,
    surveys: 0,
    users: 0,
  });

  async function getDashboardStatistics() {
    const res = await fetchDashboardStatistics();
    if (res?.status === 200) {
      setDashboardStatistics(res?.data?.data)
    }
  }

  useEffect(() => {
    getDashboardStatistics()
  }, [])


  return (
    <>
      <div className="content-header">
        <h1 className="title">
          الرئيسية
        </h1>
      </div>
      <div className="content-body">

        <div className="row mx-0">

          <div className="col-lg-4 col-md-6">
            <div className="card-details">
              <div className="card-body-text">
                <h2 className="title">
                  إجمالي عدد استطلاعات
                </h2>
                <h3>
                  {dashboardStatistics.surveys}
                </h3>
              </div>
              <div className="card-body-icon">
                <Total />
              </div>

            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card-details">
              <div className="card-body-text">
                <h2 className="title">
                  إجمالي عدد المشاركين
                </h2>
                <h3>
                  {dashboardStatistics.participants}
                </h3>
              </div>
              <div className="card-body-icon">
                <Users />
              </div>

            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card-details">
              <div className="card-body-text">
                <h2 className="title">
                  إجمالي المسؤولين
                </h2>
                <h3>
                  {dashboardStatistics.users}
                </h3>
              </div>
              <div className="card-body-icon">
                <UsersGroup />

              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}
