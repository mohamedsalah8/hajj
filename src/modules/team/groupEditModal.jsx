// import React, { useEffect, useState } from 'react'
// import { veiwGroup } from 'services/teamManagement';

// export default function GroupEditModal({group ,permissionsList,state,setState,updateGroupFn}) {
//     function handleCloseModal(){            
//         document.getElementById("group-edit-modal").classList.remove("show", "d-block");
//         document.querySelectorAll(".modal-backdrop")
//                 .forEach(el => el.classList.remove("modal-backdrop"));
//     }
//     useEffect(() => {
//      async function view(){
//         const res= await veiwGroup(group.id);
//         debugger
//         let perms=res?.data?.data?.permissions?.map(item=>item.id)
//         setState({...res?.data?.data,permissions:[...perms]})
//      }
//      view();
//     }, [group])
    
//     return (

//         <div className="modal fade" id="group-edit-modal" data-bs-backdrop="static" 
//             data-bs-keyboard="false" tabindex="-1"
//             aria-labelledby="team-edit-modalLabel" aria-hidden="true">
//             <div className="modal-dialog  modal-dialog-centered ">
//                 <div className="modal-content">
//                     <div className="modal-header border-0">
//                         <h6 className="modal-title fs-5" id="team-modalLabel">
//                             تعديل مجموعة 
//                         </h6>
//                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body">
//                         <form action="#">
//                             <div className="row g-3 align-items-center">
//                                 <div className="col-12">
//                                     <label for="userName" className="col-form-label">اسم المجموعة</label>
//                                     <input type="text" className="form-control" id="userName" 
//                                     value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} 
//                                     />
//                                 </div>
                               

                                    
//                             </div> 
//                             <div className="table-responsive">
//                               <table className="table  mt-3">
//                                 <thead>
//                                   <th className="text-start w-75">صلاحيات</th>
                                 
//                                   <th className="text-center">اضافة/تعديل</th>
//                                 </thead>
//                                 <tbody >
//                                     {permissionsList?.length > 0 && permissionsList?.map((permission, index) => (
//                                        <tr>
//                                        <td className="text-start">
//                                          {permission?.display_name}
//                                        </td>
                                      
//                                        <td>
//                                          <div className="form-check  d-flex justify-content-center">
//                                            <input className="form-check-input" type="checkbox" 
//                                              id={`group${permission.id}`} name={`group${permission.id}`}
//                                              value={permission.id}
//                                              checked={state.permissions?.includes(permission.id)}
//                                              onChange={(e)=>{
//                                                 debugger
//                                                 if(e.target.checked){
//                                                     setState({...state,permissions:[...state.permissions,permission.id]})
//                                                 }else{
//                                                     setState({...state,
//                                                     permissions:state.permissions?.filter(per=>per!==permission.id)})

//                                                 }
//                                                 console.log("e***",e);
//                                              }}
//                                              />
//                                          </div>
//                                        </td>
   
//                                      </tr>  
//                                     ))}
                                 
//                                 </tbody>
//                               </table>
//                             </div>
//                         </form>
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-survey w-100" onClick={()=>{
//                          updateGroupFn()
//                          handleCloseModal()
//                             }} >
//                             تعديل مجموعة
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }











// ****************************************new ****************************
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { veiwGroup } from "services/teamManagement";

export default function GroupEditModal({
  isOpen,
  toggleModal,
  group ,permissionsList,state,setState,updateGroupFn
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
  useEffect(() => {
         async function view(){
            const res= await veiwGroup(group.id);
<<<<<<< HEAD
             
            let perms=res?.data?.data?.permissions?.map(item=>item.id)
=======
             let perms=res?.data?.data?.permissions?.map(item=>item.id)
>>>>>>> 7d9c51290d7e97155c7882388733fa7a1a7d0cac
            setState({...res?.data?.data,permissions:[...perms]})
         }
         view();
        }, [group])
  return (
    <>
      <Modal className="mt-5 " isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader
          className="align-items-center font-weight-bold payment-title hd-title-model text-center"
          toggle={toggleModal}
        >
        تعديل مجموعة 
        </ModalHeader>
        <ModalBody>
        <form>
                            <div className="row g-3 align-items-center">
                                <div className="col-12">
                                    <label for="userName" className="col-form-label">اسم المجموعة</label>
                                    <input type="text" className="form-control" id="userName" 
                                    value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} 
                                    />
                                </div>
                               

                                    
                            </div> 
                            <div className="table-responsive">
                              <table className="table  mt-3">
                                <thead>
                                  <th className="text-start w-75">صلاحيات</th>
                                 
                                  <th className="text-center">اضافة/تعديل</th>
                                </thead>
                                <tbody >
                                    {permissionsList?.length > 0 && permissionsList?.map((permission, index) => (
                                       <tr>
                                       <td className="text-start">
                                         {permission?.display_name}
                                       </td>
                                      
                                       <td>
                                         <div className="form-check  d-flex justify-content-center">
                                           <input className="form-check-input" type="checkbox" 
                                             id={`group${permission.id}`} name={`group${permission.id}`}
                                             value={permission.id}
                                             checked={state.permissions?.includes(permission.id)}
                                             onChange={(e)=>{
                                                 
                                                if(e.target.checked){
                                                    setState({...state,permissions:[...state.permissions,permission.id]})
                                                }else{
                                                    setState({...state,
                                                    permissions:state.permissions?.filter(per=>per!==permission.id)})

                                                }
                                                console.log("e***",e);
                                             }}
                                             />
                                         </div>
                                       </td>
   
                                     </tr>  
                                    ))}
                                 
                                </tbody>
                              </table>
                            </div>
                        </form>
        </ModalBody>
        <ModalFooter>
        <button type="button" className="btn btn-survey w-100" onClick={()=>{
                         updateGroupFn()
                         toggleModal()
                            }} >
                            تعديل مجموعة
                        </button>
        </ModalFooter>
      </Modal>
    </>
  );
}


