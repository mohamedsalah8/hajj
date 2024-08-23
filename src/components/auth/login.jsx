import React, { useEffect, useState } from 'react'
import imgLogin from '../../assets/images/logoLogin.svg'
import imgLoginCover from '../../assets/images/login.svg'
import axios from 'axios';
import { useSBSDispatch, useSBSState } from '../../context/global';
import { EyeIcon, HideEyeIcon } from 'components/icons/SharedIcons';
export default function Login() {
  const dispatch = useSBSDispatch();
  const { token } = useSBSState();
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email === "" && input.password === "") {
      input.email.disabled = true;
      input.password.disabled = true;

    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const login = async () => {
    let loginData = {
      email: input.email,
      password: input.password,
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/login`, loginData)
      .then(function (response) {
        dispatch({
          type: "login",
          isAuth: true,
          token: response.data.data.token,
          userInfo: response.data.data.user,
        });
        window.location.href = ("/")

      })
      .catch(function (error) {
        // console.log(error);
      });
  }


  // async function setCSRFToken() {
  //   await axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`)
  //     .then(function (response) { })
  // }

  useEffect(function () {
    // setCSRFToken()
    if (token) {
      window.location.href = ("/")
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-sec">
      <div className="row m-0 g-0 align-items-center">
        <div className="col-lg-6">
          <div className="card border-0">
            <div className="card-body">
              <div className="img-log text-center">
                <img src={imgLogin} alt="login" />
              </div>
              <form onSubmit={handleSubmitEvent}>
                <div className="form-group mb-4">
                  <label htmlFor="Username">الاسم</label>
                  <input type="email"
                    className="form-control" id="email" name="email"
                    onChange={handleInput}
                    placeholder="إسم المستخدم" />
                </div>
                <div className="form-group mb-4 password-group">
                  <label htmlFor="password">كلمة المرور </label>
                  <input 
                  type={showPassword ? 'text' : 'password'}
 
                  className="form-control" 
                  id="password"
                    name="password"
                    onChange={handleInput}

                    placeholder="كلمة السر " />
                     <button className='btn' type="button" onClick={toggleShowPassword}>
                      {showPassword ? <HideEyeIcon /> : <EyeIcon /> }
                    </button>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">تذكرني</label>
                  </div>
                  <div className="forget">
                    {/* <a href="#">نسيت كلمة المرور</a> */}
                  </div>
                </div>
                <div className="form-group ">
                  <button className="btn  btn-survey w-100 mt-3" onClick={() => login()} disabled={!input.email || !input.password}>دخول مستخدم</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="img-login ">
            {/* <img className='object-fit-cover' src={imgLoginCover} alt="" /> */}
          </div>
        </div> 

      </div> 
    </div>

  )
}