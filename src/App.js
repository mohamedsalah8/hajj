import React, { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import Home from './modules/home/Home';
import Layout from './components/layout/Layout';
import Survey from './modules/survey';
import Participant from './modules/participant';
import Team from './modules/team';
import ParticipantDetails from './modules/participant/participantDetails';
import SurveyDetails from './modules/survey/surveyDetails';
import Reports from './modules/survey/reports';
import SurveyResult from './modules/survey/reports/surveyResult';
import Login from './components/auth/login';
import AxiosConfiguration from './helpers/axiosConfiguration';
import { useSBSState } from 'context/global';
import Loader from 'components/Loader';
import ErrorModal from 'components/ErrorModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  AxiosConfiguration();
  const { loading } = useSBSState();
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      element: <Layout />, children: [
        { path: "/", element: <Home /> },
        { path: "survey", element: <Survey /> },
        { path: "/survey/details", element: <SurveyDetails /> },
        { path: "/survey/details/:id", element: <SurveyDetails /> },
        { path: "/survey/reports/:id", element: <Reports /> },
        { path: "/survey/reports/surveyResult", element: <SurveyResult /> },
        { path: "participant", element: <Participant /> },
        { path: "participant/details/:id", element: <ParticipantDetails /> },
        { path: "/team", element: <Team /> },
      ]
    },])

  return (
    <Suspense fallback={<div>Loading</div>}>
      <main className="App">
        {loading && <Loader />}
        <ErrorModal />
        <RouterProvider router={router}>
        </RouterProvider>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          rtl={true}
          draggable={false}
        />
      </main>
    </Suspense>
  );
}
