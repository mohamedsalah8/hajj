import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function GenderAndAgeReport({ genderData, ageRangeData }) {
  return (
    <div className="row mb-5">
      <div className="col-lg-6">
        <div className="card border-0">
          <div className="card-header justify-content-center">
            <h3 className='title'>
              إحصائيات النوع الإجتماعي
            </h3>
          </div>
          <div className="card-body charts">
            <Pie data={genderData} />
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card border-0">
          <div className="card-header justify-content-center">
            <h3 className='title'>
              إحصائيات الفئة العمرية
            </h3>
          </div>
          <div className="card-body charts">
            <Pie data={ageRangeData} />
          </div>
        </div>
      </div>
    </div>
  )
}
