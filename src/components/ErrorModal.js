import reservationError from "assets/images/error.png";
import { useSBSDispatch, useSBSState } from "context/global";
import { Modal, ModalBody } from "reactstrap";

export default function ErrorModal() {
  const { isError, ErrorMassage } = useSBSState();

  const dispatch = useSBSDispatch();

  const closeModal = () => {
    dispatch({ type: "setError", payload: false });
  };



  return (
    <>
      <Modal size="md" className="mt-10	" isOpen={isError}>
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">

          <p className="error-model-title ">
            {"هناك خطأ ما!"}
          </p>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
        </div>

        <ModalBody className="payModal">
          <div
            className="container"
            style={{ height: "250px", overflow: "auto" }}
          >
            <div className="text-center" role="alert">
              <img src={reservationError} className="img-fluid" alt="" style={{width: "120px"}} />
              <p className="m-0 mt-3 h5 text-gray py-4">
                {ErrorMassage?.body
                  ? ErrorMassage?.body
                  : "هناك خطأ ما!"}
              </p>
            </div>

            <div className="box">
              <p className="title-modal-sm"></p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
