import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  EditIcon,
  PlusIcon,
  SearchIcon,
  ShareIcon,
  User2Icon,
} from "../../components/icons/SharedIcons";
import TeamModal from "./teamModal";
import {
  TeamManagementUsersList,
  TeamManagementUsersView,
  UpdateUsersTeamManagement,
  ChangeSautesUsersTeamManagement,
  CreateUsersTeamManagement,
  ListGroup,
  FetchPermissions,
  CreateGroup,
  UpdateGroup,
} from "../../services/teamManagement";
import { toast } from "react-toastify";
import GroupModal from "./groupModal";
import GroupEditModal from "./groupEditModal";
import TestModel from "./userModal";
import UserModel from "./userModal";
import { TeamManagementGroupView } from "services/teamManagementGroup";
import { date } from "yup";

export default function Team() {
  const [UsersList, setUsersList] = useState([]);
  const [usersGroupList, setUsersGroupList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);

  const [teamUsersView, setTeamUsersView] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
  const [usersListRole, setUsersListRole] = useState([]);

  const [dangerClass, setDangerClass] = useState(false);
  const [reload, setReload] = useState(false);
  console.log("selectedUser11", selectedUser);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  async function getUsersList() {
    const teamsList = await TeamManagementUsersList({ search: searchTerm });
    setUsersList(teamsList?.data?.data);
  }

  useEffect(() => {
    getUsersList();
  }, [searchTerm, reload]);

  const [EditUserTeam, setEditUserTeam] = useState({
    emailEdit: "",
    telEdit: "",
    passwordEdit: "",
    rePasswordEdit: "",
  });


  const TeamView = async (id) => {
    let teamData = {
      emailEdit: EditUserTeam.emailEdit,
      passwordEdit: EditUserTeam.passwordEdit,
      rePasswordEdit: EditUserTeam.rePasswordEdit,
      telEdit: EditUserTeam.telEdit,
    };
    const usersView = await TeamManagementUsersView({ id, teamData });
    setTeamUsersView(usersView);
  };


  useEffect(() => {
    async function getPermission() {
      const res = await FetchPermissions();
      setPermissionsList(res?.data?.data);
    }
    getPermission();
  }, []);

  const update = async () => {
    const data = {
      name: selectedUser?.name,
      email: selectedUser?.email,
      phone: selectedUser?.phone,
      password: selectedUser?.password,
      password_confirmation: selectedUser?.confirm_password,
      role: selectedUser?.role?.id,
    };
    if (selectedUser?.password == selectedUser?.confirm_password) {
      const res = await UpdateUsersTeamManagement(selectedUser?.id, data);
      if (res?.status === 200 || res?.status === 201) {
        toast.success("تم تحديث  بيانات المستحدم بنجاح");

        setSelectedUser({});
        setDangerClass(false);
        setReload((prev) => !prev);
      }
    } else {
      setDangerClass(true);
      toast.error("تاكد من ادخال البيانات صحيحة");
    }
  };
  const changeStatus = async (user) => {
    const res = await ChangeSautesUsersTeamManagement(user?.id, {
      is_active: !user?.is_active,
    });
    if (res.status === 200 || res.status === 201) {
      toast.success("تم تحديث  حالة المستحدم بنجاح");
      setReload((prev) => !prev);
    } else {
      toast.error("لقد حدث خطا");
     }
  };
  const addUser = async () => {
    const data = {
      name: userState?.name,
      email: userState?.email,
      phone: userState?.phone,
      password: userState?.password,
      password_confirmation: userState?.password_confirmation,
      role: +userState?.role,
    };

    const res = await CreateUsersTeamManagement(data);
    if (res?.status === 200 || res?.status === 201) {

       
      toast.success("تم اضافة مستخدم  بنجاح");

      setReload((prev) => !prev);
    } else {
      toast.error("لقد حدث خطا");
    }
  };

  //list group
  useEffect(() => {
    async function getGroupsList() {
      const res = await ListGroup();
      setGroupList(res?.data?.data);
    }
    getGroupsList();
  }, [reload]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleRoleChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      role: { id: e.target.value },
    });
  };

  const [groupState, setGroupState] = useState({
    name: "",
    permissions: [],
  });
  const addGroup = async () => {
    const data = { ...groupState };

    const res = await CreateGroup(data);
    if (res?.status === 200 || res?.status === 201) {
      toast.success("تم اضافة مجموعة  بنجاح");

      setGroupState({
        name: "",
        permissions: [],
      });
      setReload((prev) => !prev);
    } else {
      toast.error("لقد حدث خطا");
    }
  };
  const updateGroupFn = async () => {
    const data = { ...groupState };

    const res = await UpdateGroup(selectedGroup?.id, data);
    if (res?.status === 200 || res?.status === 201) {
      toast.success("تم تحديث مجموعة  بنجاح");

      setGroupState({
        name: "",
        permissions: [],
      });
      setSelectedGroup({});
      setReload((prev) => !prev);
    } else {
      toast.error("لقد حدث خطا");
    }
  };
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditGroup, setIsOpenEditGroup] = useState(false)
  const [isOpenGroup, setIsOpenGroup] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen);
  }
  const toggleEditGrop = () => {
    setIsOpenEditGroup(!isOpenEditGroup);
  }
  const toggleGrop = () => {
    setIsOpenGroup(!isOpenGroup);
  }
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
      <div className="content-header">
        <h1 className="title">فريق العمل</h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <a href="index.html" className="disabled">
              الرئيسية{" "}
            </a>
            <span>
              <ArrowIcon />
            </span>
          </li>

          <li className="breadcrumbItem">
            <a href="#" className="disable">
              {" "}
              فريق العمل{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="tabs-survey">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link  active"
                  id="pills-team-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-team"
                  type="button"
                  role="tab"
                  aria-controls="pills-team"
                  aria-selected="true"
                >
                  <span>
                    <User2Icon />
                  </span>
                  فريق العمل
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="team-work-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#team-tab"
                  type="button"
                  role="tab"
                  aria-controls="team-tab"
                  aria-selected="false"
                >
                  <span>
                    <ShareIcon />
                  </span>
                  الصلاحيات
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-team"
                role="tabpanel"
                aria-labelledby="pills-team-tab"
                tabindex="0"
              >
                <div className="card border-0">
                  <div className="card-body">
                    <div className="row table-header">
                      <div className="col-lg-4">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="بحث"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <span className="input-group-text" id="basic-addon1">
                            <SearchIcon />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 text-end">
                        <div className="add-survey">
                          <button
                            className="btn btn-survey"
                            onClick={toggle}
                          >
                            <span>
                              <PlusIcon />
                            </span>
                            اضف مستخدم
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <TeamModal
                      state={userState}
                      setState={setUserState}
                      addUser={addUser}
                    /> */}
                    <div className="table-responsive">
                      <table className="table  mt-3">
                        <thead>
                          <th className="w-25">الاسم</th>
                          <th className="text-center">الصلاحية</th>
                          <th className="text-center">رقم الهاتف </th>
                          <th className="text-center">البريد الإلكتروني</th>
                          <th className="text-center">أخر مشاركة </th>
                          <th className="text-center">الحالة</th>
                          <th className="text-center">تعديل</th>
                        </thead>
                        <tbody>
                          {UsersList?.length > 0 &&
                            UsersList?.map((user, index) => (
                              <>
                                <tr>
                                  <td className="text-start">
                                    <a>{user?.name}</a>
                                  </td>
                                  <td>{user?.role?.name}</td>

                                  <td>{user?.phone}</td>
                                  <td>{user?.email}</td>
                                  <td>-</td>
                                  <td>
                                    <div className="form-check form-switch  d-flex justify-content-center">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="team"
                                        name="team"
                                        checked={user?.is_active}
                                        onClick={() => {
                                          changeStatus(user);
                                        }}
                                      />
                                    </div>
                                  </td>

                                  <td className="d-flex gap-2 justify-content-center">
                                    <button
                                      className="btn "
                                      data-bs-toggle="collapse"
                                      href="#collapseExample"
                                      aria-controls="collapseExample"
                                      onClick={() => setSelectedUser(user)}
                                    >
                                      <EditIcon />
                                    </button>
                                  </td>
                                </tr>
                                {user?.id === selectedUser?.id && (
                                  <tr>
                                    <td colspan="8" className="p-0">
                                      <div
                                        className="collapse"
                                        id="collapseExample"
                                      >
                                        <div className="card  card-body bg-light border-0">
                                          <form>
                                            <div className="row">
                                              <div className="col-lg-4">
                                                <div className="mb-3 text-start">
                                                  <label
                                                    htmlFor="emailEdit"
                                                    className="form-label"
                                                  >
                                                    البريد الإلكتروني
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    id="emailEdit"
                                                    name="emailEdit"
                                                    placeholder="name@example.com"
                                                    value={selectedUser?.email}
                                                    onChange={(e) =>
                                                      setSelectedUser({
                                                        ...selectedUser,
                                                        email: e.target.value,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3 text-start">
                                                  <label
                                                    htmlFor="telEdit"
                                                    className="form-label"
                                                  >
                                                    التليفون
                                                  </label>
                                                  <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="telEdit"
                                                    name="telEdit"
                                                    placeholder="010 23456789"
                                                    value={selectedUser?.phone}
                                                    onChange={(e) =>
                                                      setSelectedUser({
                                                        ...selectedUser,
                                                        phone: e.target.value,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4 text-start">
                                                <label htmlFor="permissions" className="col-form-label">
                                                  الصلاحيات
                                                </label>
                                                <select
                                                  name="permissions"
                                                  id="permissions"
                                                  className="form-select"
                                                  value={selectedUser?.role?.id || ''}
                                                  onChange={handleRoleChange}
                                                >
                                                  <option value="">اختر الصلاحيات</option>
                                                  {usersListRole.map((user) => (
                                                    <option key={user?.id} value={user?.id}>
                                                      {user?.name}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>

                                            </div>
                                            <div className="row">
                                              <div className="col-lg-4">
                                                <div className="mb-3 text-start">
                                                  <label
                                                    htmlFor="passwordEdit"
                                                    className="form-label"
                                                  >
                                                    {" "}
                                                    كلمة السر{" "}
                                                  </label>
                                                  <input
                                                    type="password"
                                                    className="form-control"
                                                    id="passwordEdit"
                                                    name="passwordEdit"
                                                    placeholder="كلمة السر"
                                                    value={
                                                      selectedUser?.password
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedUser({
                                                        ...selectedUser,
                                                        password:
                                                          e.target.value,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3 text-start">
                                                  <label
                                                    htmlFor="rePasswordEdit"
                                                    className="form-label"
                                                  >
                                                    إعادة كلمة السر
                                                  </label>
                                                  <input
                                                    type="password"
                                                    className={`form-control ${dangerClass
                                                      ? "border-danger"
                                                      : ""
                                                      }`}
                                                    id="rePasswordEdit"
                                                    name="rePasswordEdit"
                                                    placeholder="إعادة كلمة السر"
                                                    value={
                                                      selectedUser?.confirm_password
                                                    }
                                                    onChange={(e) =>
                                                      setSelectedUser({
                                                        ...selectedUser,
                                                        confirm_password:
                                                          e.target.value,
                                                      })
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4 d-flex align-items-end">
                                                <div className="mb-3  text-start w-100">
                                                  <button
                                                    className="btn btn-success  w-100"
                                                    onClick={(e) => {

                                                      update();
                                                    }}
                                                  >
                                                    تعديل البيانات
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* <div className="imgEmpty  text-center">
                                            <img src="assets/images/empty.svg" className="img-fluid w-25 my-5" alt="" />
                                        </div> */}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade "
                id="team-tab"
                role="tabpanel"
                aria-labelledby="team-work-tab"
                tabindex="0"
              >
                <div className="card border-0">
                  <div className="card-body">
                    <div className="row table-header">
                      <div className="col-lg-4">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control "
                            placeholder="بحث"
                          />
                          <span className="input-group-text" id="basic-addon1">
                            <SearchIcon />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 text-end">
                        <div className="add-survey">
                          <button
                            className="btn btn-survey"
                            onClick={toggleGrop}
                          >
                            <span>
                              <PlusIcon />
                            </span>
                            اضف مجموعة
                          </button>
                        </div>
                        <GroupModal
                          isOpen={isOpenGroup}
                          toggleModal={toggleGrop}
                          permissionsList={permissionsList}
                          state={groupState}
                          setState={setGroupState}
                          addGroup={addGroup}
                        />
                      </div>
                    </div>

                    {groupList.length > 0 &&
                      groupList.map((group) => (
                        <div
                          class="accordion teamWork-tab"
                          id="accordionTeamWork"
                        >
                          <div class="accordion-item">
                            <h2 class="accordion-header d-flex justify-content-between align-items-center">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseTeam${group?.id}`}
                                aria-expanded="false"
                                aria-controls={`collapseTeam${group?.id}`}
                                 onClick={() => setSelectedGroup(group)}
                              >
                                {group?.name} 
                                <span>{UsersList?.filter(user => user?.role?.id == group?.id).length}</span>
                              </button>
                              <button
                                class="btn btn-link"

                                onClick={() => {
                                  setSelectedGroup(group);
                                  toggleEditGrop()
                                }}
                              >
                                <EditIcon />
                              </button>
                            </h2>

                            {selectedGroup?.id === group?.id && (
                              <div
                                id={`collapseTeam${group?.id}`}
                                 class="accordion-collapse collapse "
                                data-bs-parent="#accordionTeamWork"
                              >
                                <div class="accordion-body">
                                  <div className="table-responsive">
                                    <table className="table  mt-3">
                                      <thead>
                                        <th className="w-25">الاسم</th>
                                        <th className="text-center">الصلاحية</th>
                                        <th className="text-center">رقم الهاتف </th>
                                        <th className="text-center">البريد الإلكتروني</th>
                                        <th className="text-center">أخر مشاركة </th>
                                        <th className="text-center">الحالة</th>
                                      </thead>
                                      <tbody>
                                        {group?.permissions?.map(permission => {
                                          return (
                                            <tr>
                                              <td className="text-start">
                                                <span>{permission?.display_name}</span>
                                              </td>
                                              <td>{ }</td>
                                              <td>-</td>
                                              <td>-</td>
                                              <td>
                                                <div className="form-check form-switch  d-flex justify-content-center">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="team1"
                                                    name="team1"
                                                  />
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        })}
                                        {UsersList?.length > 0 &&
                                          UsersList?.map((user, index) => (
                                            <>
                                              {user?.role?.id == group?.id ? 
                                                <tr>
                                                  <td className="text-start">
                                                    <a>{user?.name}</a>
                                                  </td>
                                                  <td>{user?.role?.name}</td>

                                                  <td>{user?.phone}</td>
                                                  <td>{user?.email}</td>
                                                  <td>-</td>
                                                  <td>
                                                    <div className="form-check form-switch  d-flex justify-content-center">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="team"
                                                        name="team"
                                                        checked={user?.is_active}
                                                        onClick={() => {
                                                          changeStatus(user);
                                                        }}
                                                      />
                                                    </div>
                                                  </td> 
                                                </tr>
                                                :
                                                null
                                              }


                                            </>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedGroup?.id && (
            <GroupEditModal
              isOpen={isOpenEditGroup}
              toggleModal={toggleEditGrop}
              group={selectedGroup}
              permissionsList={permissionsList}
              state={groupState}
              setState={setGroupState}
              updateGroupFn={updateGroupFn}
            />
          )}

          <UserModel state={userState}
            setState={setUserState}
            addUser={addUser}
            isOpen={isOpen}
            toggleModal={toggle}
          />
        </div>
      </div>
    </>
  );
}
