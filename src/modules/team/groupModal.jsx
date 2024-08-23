// import React, { useEffect, useState } from 'react'

// export default function GroupModal({permissionsList,state,setState,addGroup}) {
//     console.log("state*********",state);
//     function handleCloseModal(){            
//         document.getElementById("group-modal").classList.remove("show", "d-block");
//         document.querySelectorAll(".modal-backdrop")
//                 .forEach(el => el.classList.remove("modal-backdrop"));
//     }
//     return (

//         <div className="modal fade" id="group-modal"
//             data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
//             aria-labelledby="team-modalLabel" aria-hidden="true">
//             <div className="modal-dialog  modal-dialog-centered ">
//                 <div className="modal-content">
//                     <div className="modal-header border-0">
//                         <h6 className="modal-title fs-5" id="team-modalLabel">
//                             اضف مجموعة جديد
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
//                          addGroup()
//                             handleCloseModal()
//                             }} >
//                             أضف مجموعة
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }















// ****************************************new ****************************
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function GroupModal({
  isOpen,
  toggleModal,
  permissionsList,state,setState,addGroup
}) {
  
  return (
    <>
      <Modal className="mt-5 " isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader
          className="align-items-center font-weight-bold payment-title hd-title-model text-center"
          toggle={toggleModal}
        >
                            اضف مجموعة جديد
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
                         addGroup()
                         toggleModal()
                            }} >
                            أضف مجموعة
                        </button>
        </ModalFooter>
      </Modal>
    </>
  );
}


