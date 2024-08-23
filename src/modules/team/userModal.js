import { useEffect, useState } from "react";
import {   Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ListGroup } from "services/teamManagement";
 
export default function UserModel({
  isOpen,
  toggleModal,
  state,
  setState,
  addUser,
}) {
  console.log("state11", state);
  const [dangerClass, setDangerClass] = useState(false);

  useEffect(() => {
    if (state.password !== state.password_confirmation) {
      setDangerClass(true);
    } else {
      setDangerClass(false);
    }
  }, [state.password_confirmation]);

  const [usersListRole, setUsersListRole] = useState([]);

  async function getUsersListRole() {
    const teamsList = await ListGroup();
    setUsersListRole(teamsList?.data?.data);
    console.log("asdsad", usersListRole);
  }

  useEffect(() => {
    getUsersListRole();
  }, []);



  return (
    <>
      <Modal className="mt-5 " isOpen={isOpen} toggle={toggleModal}
        style={
          {
            maxWidth: "700px"
          }
        }
      >
        <ModalHeader
          className="align-items-center font-weight-bold payment-title hd-title-model text-center"
          toggle={toggleModal}
        >
          اضف مستخدم جديد
        </ModalHeader>
        <ModalBody className="modalBody">
          <form>
            <div className="row g-3 align-items-center">
              <div className="col-6">
                <label for="userName" className="col-form-label">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="اسم المستخدم"
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  value={state.name}

                />
              </div>
              <div className="col-6">
                <label for="permissions" className="col-form-label">
                  {" "}
                  الصلاحيات{" "}
                </label>
                <select
                  name="permissions"
                  id="permissions"
                  className="form-select"
                  value={state.role}
                  onChange={(e) => setState({ ...state, role: e.target.value })}
                >
                  <option value="">اختر الصلاحيات</option>
                  {usersListRole.map((user) => (
                    <option key={user?.id} value={user?.id}>
                      {user?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6">
                <label for="tel" className="col-form-label">
                  {" "}
                  رقم التليفون{" "}
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  value={state.phone}
                  placeholder="رقم التليفون"
                  onChange={(e) =>
                    setState({ ...state, phone: e.target.value })
                  }
                />
              </div>

              <div className="col-6">
                <label for="email" className="col-form-label">
                  {" "}
                  البريد الإلكتروني{" "}
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={state.email}
                  placeholder="البريد الإلكتروني"
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </div>

              <div className="col-6">
                <label for="password" className="col-form-label">
                  {" "}
                  كلمة المرور{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={state.password}
                  placeholder="كلمة المرور"

                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
              </div>

              <div className="col-6">
                <label for="password" className="col-form-label">
                  {" "}
                  تأكيد كلمة المرور{" "}
                </label>
                <input
                  type="password"
                  className={`form-control ${dangerClass ? "border-danger" : ""
                    }`}
                  id="password"
                  placeholder="تأكيد كلمة المرور"

                  value={state.password_confirmation}
                  onChange={(e) =>
                    setState({
                      ...state,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-survey w-100"
            onClick={() => {
              addUser();
              toggleModal();
            }}
            disabled={dangerClass}
          >
            أضف مستخدم
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
