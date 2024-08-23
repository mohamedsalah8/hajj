import { ExcelIcon, ReloadIcon, SearchIcon } from 'components/icons/SharedIcons'
import React from 'react'

export default function ParticipantFilters({ filters, handleFilters, resetFilters, exportToExcel }) {

  return (
    <div className="row participants align-items-center">
      {/* filters search */}
      <div className="col">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="بحث"
            id="participant-search"
            name="participant-search"
            value={filters.search}
            onChange={(e) => handleFilters({ filterKey: "search", value: e.target.value })}
          />
          <span className="input-group-text" id="basic-addon1">
            <SearchIcon />
          </span>
        </div>
      </div>
      {/* filters date */}
      <div className="col">
        <div className="input-group1">
          <label htmlFor="participant-entry_at">تاريخ المشاركة</label>
          <input
            type="date"
            className="form-control"
            id="participant-entry_at"
            name="participant-entry_at"
            value={filters.entry_at}
            onChange={(e) => handleFilters({ filterKey: "entry_at", value: e.target.value })}
          />
        </div>
      </div>

      <div className="col">
        <div className="input-group1">
          <label htmlFor="participant-gender">النوع</label>
          <select className="form-select" 
            id="participant-gender"
            name="participant-gender"
            value={filters.gender}
            onChange={(e) => handleFilters({ filterKey: "gender", value: e.target.value })}
          >
            <option defaultValue>اختر</option>
            <option value="male">ذكر </option>
            <option value="female">أنثي</option>
          </select>
        </div>
      </div>
      <div className="col">
        <div className="input-group1">
          <label htmlFor="participant-age_range">الفئة العمرية</label>
          <select className="form-select" 
            id="participant-age_range"
            name="participant-age_range"
            value={filters.age_range}
            onChange={(e) => handleFilters({ filterKey: "age_range", value: e.target.value })}
          >
            <option defaultValue>اختر</option>
            <option value="20-30">20-30</option>
            <option value="31-40">31-40</option>
            <option value="أكثر من 40"> أكثر من 40</option>
          </select>
        </div>
      </div>

      <div className="col">
        <div className="reset mt-3">
          <button className="btn" onClick={resetFilters}>
            <span className='me-2'>
              <ReloadIcon />
            </span>
            إلغاء
          </button>
        </div>

      </div>

      <div className="col-lg-4 text-end export">
        <button className="btn export" onClick={exportToExcel}>
          <span className='me-2'>
            <ExcelIcon />
          </span>
          تصدير اكسل
        </button>
      </div>
    </div>
  )
}
