import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { exportParticipantsExcel } from 'services/participant';

export default function useParticipants(initalFilters) {
  const [filters, setFilters] = useState(initalFilters);

  async function exportToExcel() {
    const res = await exportParticipantsExcel(filters)
    if (res?.status === 200) {
      const blob = new Blob([res.data], {
        type: res.data.type,
      });
      const objectUrl = window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.target = "_blank";
      anchor.href = objectUrl;
      anchor.setAttribute(
        "download",
        `participants-list-${moment().format("DD-MM-YYYY")}`
      );
      anchor.click();
    }
    toast.success("تم تصدير الاكسيل")
  }

  function handleFiltersInputs({ filterKey, value }) {
    setFilters({ ...filters, [filterKey]: value })
  }

  function resetFilters() {
    setFilters(initalFilters)
  }

  const goTo = (page = 1) => {
    setFilters({ ...filters, page: page });
  };

  return {
    exportToExcel,
    handleFiltersInputs,
    resetFilters,
    goTo,
    filters,
  }

}
