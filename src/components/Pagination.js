
export default function Pagination({ info, goTo, withDetailsText = true }) {

  const paginate = (page) => {
    let current;
    if (page.url !== null) {
      current =
        page.label === "Next &raquo;" || page.label === "التالي"
          ? info.current_page + 1
        : page.label === "&laquo; Previous" || page.label === "السابق"
            ? info.current_page - 1
            : page.label;
    }

    goTo(current);
  };

  return (
    <>
      {info?.total > info?.per_page ? (
        <div className="d-flex justify-content-between align-items-center mb-2 mr-2 ml-2 pagination-container">
          {withDetailsText ?
            <div className="text-body">
              {"عرض"} {info.from} {"الى"} {info.to}{" "}
              {"من"} {info.total} {"نتيجة"}
            </div>
            : null
          }

          <nav aria-label="Page navigation example">
            <ul className="pagination">

              {info?.links?.map((page) => {
                console.log(page.label);
                return page.url ? (
                  <li
                    key={`page-${page.label}`}
                    className={page.active ? "page-item active" : "page-item"}
                    onClick={() => paginate(page)}
                  >
                    <button className={`page-link ${page.url === null ? "false" : ""}`}>
                      {/* {page.label === "Next" ? (
												<i className="fas fa-caret-right"></i>
											) : page.label === "Previous" ? (
												<i className="fas fa-caret-left"></i>
											) : (
												page.label
											)} */}
                      {page.label === "Next &raquo;" ? "التالي" : page.label === "&laquo; Previous" ? "السابق" : page.label}
                      {/* {page.label} */}
                    </button>
                  </li>
                ) : (
                  <li
                    key={`page-${page.label}`}
                    className={"page-item disabled"}
                    onClick={() => false}
                  >
                    <button className={`page-link disabled`}>
                        {page.label === "Next &raquo;" && "التالى"}
                        {page.label === "&laquo; Previous" && "السابق"}
                      {/* <i className="fas fa-caret-left"></i> */}
                    </button>
                  </li>
                );
              })}
            </ul>

          </nav>
        </div>
      ) : null}
    </>
  );
}
