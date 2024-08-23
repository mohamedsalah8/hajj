import React, { useEffect, useState } from 'react'

export default function TeamModal({state,setState,addUser}) {
    console.log("state11",state);
    const [dangerClass, setDangerClass] = useState(false);

    useEffect(() => {
     if(state.password!== state.password_confirmation){
        setDangerClass(true)
     }else{
        setDangerClass(false)

     }
    }, [state.password_confirmation])
    function handleCloseModal(){            
        document.getElementById("team-modal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
                .forEach(el => el.classList.remove("modal-backdrop"));
    }

    
    return (

        <div className="modal fade" id="team-modal"
            data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="team-modalLabel" aria-hidden="true" style={{    display: 'none !important'}}>
            <div className="modal-dialog  modal-dialog-centered ">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <h6 className="modal-title fs-5" id="team-modalLabel">
                            اضف مستخدم جديد
                        </h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="#">
                            <div className="row g-3 align-items-center">
                                <div className="col-6">
                                    <label for="userName" className="col-form-label">اسم المستخدم</label>
                                    <input type="text" className="form-control" id="userName" 
                                    value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} 
                                    />
                                </div>
                                <div className="col-6">
                                    <label for="permissions" className="col-form-label"> الصلاحيات  </label>
                                    <select name="permissions" id="permissions"
                                        className='form-select' 
                                        value={state.role} onChange={(e)=>setState({...state,role:e.target.value})} 

                                        >
                                        <option value="">اختر الصلاحيات</option>
                                        <option value="1">مدير</option>
                                        <option value="2">مستخدم</option>  
                                    </select>
                                </div>

                                <div className="col-6">
                                    <label for="tel" className="col-form-label"> رقم التليفون  </label>
                                    <input type="tel" className="form-control" id="tel" 
                                    value={state.phone} onChange={(e)=>setState({...state,phone:e.target.value})}  
                                    />
                                </div>
                                
                                <div className="col-6">
                                    <label for="email" className="col-form-label"> البريد الإلكتروني  </label>
                                    <input type="email" className="form-control" id="email"
                                     value={state.email} onChange={(e)=>setState({...state,email:e.target.value})} 

                                    />
                                    </div>
                                     
                                    <div className="col-6">
                                    <label for="password" className="col-form-label"> كلمة المرور  </label>
                                    <input type="password" className="form-control" id="password"
                                                                        value={state.password} onChange={(e)=>setState({...state,password:e.target.value})} 

                                    />
                                    </div>
                                    
                                    <div className="col-6">
                                    <label for="password" className="col-form-label"> تأكيد كلمة المرور  </label>
                                    <input type="password"className={`form-control ${dangerClass ? "border-danger" : ""}`} id="password"
                                    value={state.password_confirmation} onChange={(e)=>setState({...state,password_confirmation:e.target.value})} 

                                    />
                                    </div> 
                            </div> 
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-survey w-100" onClick={()=>{
                            addUser();
                            handleCloseModal()
                            }} disabled={dangerClass}>
                            أضف مستخدم
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
