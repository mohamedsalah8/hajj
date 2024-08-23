import React, { useState } from 'react'

let citiesShowedCount = 5;

export default function LocationReports({ citiesList }) {
  const totalCitiesCount = citiesList?.reduce((totalCitiesCount, city) => totalCitiesCount + city?.count, 0);
  const splicedCitiesList = citiesList.slice(0, citiesShowedCount);

  const [showedCitiesList, setShowedCitiesList] = useState(splicedCitiesList);

  
  function toggleShowAllCities() {
    if (showedCitiesList.length === citiesShowedCount) {
      setShowedCitiesList(citiesList);
      return
    }
    setShowedCitiesList(splicedCitiesList)
  }

  return (
    <div className="card border-0 mb-5">
      <div className="card-header">
        <h3 className='title'> إحصائيات الموقع الجغرافي</h3>
        {citiesList.length > citiesShowedCount &&
          <button className='btn p-0 more' onClick={toggleShowAllCities}>
            {showedCitiesList.length === citiesShowedCount ? "المزيد" : "أقل"}

          </button>
        }

      </div>

      <div className="card-body">
        {showedCitiesList.map((city, index) => {
          const cityPercentage = ((100 * city?.count) / totalCitiesCount).toFixed(2);
          return (
            <div className='allProgress row align-items-center' key={`city-${index}`}>
              <h4 className='title col-lg-2'>{city?.name || "غير محدد"}</h4>
              <div className="col-lg-9">
                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{ width: `${cityPercentage}%` }}></div>
                </div>
              </div>

              <h5 className='title col-lg-1 text-end'>{cityPercentage}%</h5>
            </div>
          )
        })}
      </div>

    </div>
  )
}
