import React, { useEffect, useState } from 'react';
import { ArrowIcon, FiletIcon, ListIcon2, PlusIcon } from 'components/icons/SharedIcons';
import { createSurveyManagement, lookupParticipantFields, surveyManagementView, updateSurveyManagement } from 'services/surveyManagement';
import { Link, useParams } from 'react-router-dom';
import imgEmpty from "../../assets/images/empty.svg";
import SurveyQuestion from './SurveyQuestion';
import { uuidv4Generator } from 'helpers/generateUUID';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const surveyInitialObj = {
  title: "",
  questions: [],
  status: null, 
  fields: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required('مطلوب'),
  questions: Yup.array().of(
    Yup.object({
      title: Yup.string().required('مطلوب'),
      answers: Yup.array().of(
        Yup.object({
          title: Yup.string().required('مطلوب')
        })
      )
    })
  ).min(1, 'يجب أن يحتوي الاستطلاع على سؤال واحد على الأقل'),
});

export default function SurveyDetails() {
  const { id } = useParams();
  const [surveyDetailsData, setSurveyDetailsData] = useState(surveyInitialObj);

  async function getSurveyDetails() {
    const res = await surveyManagementView(id);
    if (res?.status === 200) {
      setSurveyDetailsData(res?.data?.data);
    }
  }

  async function createUpdateSurvey(values) {
    const surveyDataClone = { ...values };
    let questionsClone = surveyDataClone.questions;
    questionsClone = questionsClone.map(question => {
      return {
        ...question,
        id: typeof (question?.id) === "number" ? question?.id : null,
        answers: question.type === "choice" ? question?.answers?.map(answer => {
          return {
            ...answer,
            id: typeof (answer?.id) === "number" ? answer?.id : null
          }
        }) : null
      }
    });
    surveyDataClone.questions = questionsClone;
    let data = {
      ...surveyDataClone,
      fields: surveyDataClone.fields.filter((field) => field?.is_required).map(field => {
        return {
          ...field,
          code: field?.value || field?.code
        }
      })
    };
    const res = id ? await updateSurveyManagement(id, data) : await createSurveyManagement(data);
    if (res?.status === 200) {
      let message = id ? "تم تحديث الاستطلاع" : "تم انشاء الاستطلاع";
      toast.success(message);
    }
  }

  async function getLookupFields() {
    const res = await lookupParticipantFields();
    setSurveyDetailsData({ ...surveyDetailsData, fields: res?.data?.data });
  }

  useEffect(() => {
    if (id) {
      getSurveyDetails();
    } else {
      getLookupFields();
    }
  }, [id]);

  function addNewQuestion(setFieldValue, questions) {
    const newQuestion = {
      title: "",
      is_required: false,
      type: "choice",
      answers: [],
      isOpend: true,
      sort: 1
    };
    setFieldValue('questions', [...questions, newQuestion]);
  }

  function cloneQuestion(setFieldValue, questions, questionIndex) {
    let copiedQuestion = {
      ...questions[questionIndex],
      id: uuidv4Generator(),
      answers: questions[questionIndex]?.answers?.map(answer => {
        return {
          ...answer,
          id: uuidv4Generator()
        }
      })
    };
    setFieldValue('questions', [...questions, copiedQuestion]);
  }

  function removeQuestion(setFieldValue, questions, questionIndex) {
    let questionsClone = [...questions];
    questionsClone.splice(questionIndex, 1);
    setFieldValue('questions', questionsClone);
  }

  function handleQuestionInputs(setFieldValue, questions, questionIndex, key, value) {
    let questionsClone = [...questions];
    questionsClone[questionIndex][key] = value;
    if (key === "to") {
      questionsClone[questionIndex][key] = +value;
      questionsClone[questionIndex]["from"] = 1;
    }
    if (key === "type" && value !== "choice") {
      questionsClone[questionIndex].answers = null;
    }
    setFieldValue('questions', questionsClone);
  }

  function addNewAnswer(setFieldValue, questions, questionIndex) {
    let questionsClone = [...questions];
    questionsClone[questionIndex].answers.push({ id: uuidv4Generator(), title: "", sort: 1 });
    setFieldValue('questions', questionsClone);
  }

  function deleteQuestionAnswer(setFieldValue, questions, questionIndex, answerIndex) {
    let questionsClone = [...questions];
    questionsClone[questionIndex].answers.splice(answerIndex, 1);
    setFieldValue('questions', questionsClone);
  }

  function handleAnswerInput(setFieldValue, questions, questionIndex, answerIndex, value) {
    let questionsClone = [...questions];
    questionsClone[questionIndex].answers[answerIndex] = { ...questionsClone[questionIndex].answers[answerIndex], title: value };
    setFieldValue('questions', questionsClone);
  }

  function participantFields(setFieldValue, fields, index) {
    let fieldsClone = [...fields];
    fieldsClone[index] = { ...fieldsClone[index], is_required: !fieldsClone[index].is_required };
    setFieldValue('fields', fieldsClone);
  }

  return (
    <>
      <div className="content-header">
        <h1 className="title">
          الاستطلاعات
        </h1>
        <ul className="breadcrumb">
          <li className="breadcrumbItem">
            <Link to="/" className="disabled">الرئيسية </Link>
            <span>
              <ArrowIcon />
            </span>
          </li>

          <li className="breadcrumbItem">
            <Link to="/survey" className="disable"> قائمة الاستطلاعات
            </Link>
            <span>
              <ArrowIcon />
            </span>
          </li>
          <li className="breadcrumbItem">
            <Link to="/survey/details" className="disable">
              الاستطلاعات </Link>
          </li>
        </ul>
      </div>

      <div className="content-body">
        <div className="row">
          <Formik
            initialValues={surveyDetailsData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={createUpdateSurvey}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form className="w-100">
                <div className="card border-0">
                  <div className="card-body">
                    <Field type="text"
                      placeholder='عنوان الإستطلاع'
                      name="title"
                      id="survey-title"
                      className="form-control"
                    />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="tabs-survey">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                        type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        <span>
                          <ListIcon2 />
                        </span>
                        الاسئلة
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                        <span>
                          <FiletIcon />
                        </span>
                        نموذج التواصل
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                      aria-labelledby="pills-home-tab" tabIndex="0">
                      <div className="card border-0">
                        <div className="card-body">
                          <div className="title-header">
                            <h3>الأسئلة المتاحة
                              <span>
                                {values.questions.length}
                              </span>
                            </h3>
                          </div>

                          {values.questions.length > 0 ? values.questions.map((question, index) => (
                            <SurveyQuestion
                              key={index}
                              index={index}
                              questionData={question}
                              addNewAnswer={() => addNewAnswer(setFieldValue, values.questions, index)}
                              deleteQuestionAnswer={({ answerIndex }) => deleteQuestionAnswer(setFieldValue, values.questions, index, answerIndex)}
                              handleAnswerInput={(e) => handleAnswerInput(setFieldValue, values.questions, index, parseInt(e.target.name.replace('answer_', '')), e.target.value)}
                              handleQuestionInputs={({ key, value }) => handleQuestionInputs(setFieldValue, values.questions, index, key, value)}
                              removeQuestion={() => removeQuestion(setFieldValue, values.questions, index)}
                              cloneQuestion={() => cloneQuestion(setFieldValue, values.questions, index)}
                            />
                          ))
                            :
                            <div className="imgEmpty  text-center">
                              <img src={imgEmpty} className="img-fluid my-5" alt="" style={{ width: "120px" }} />
                            </div>
                          }

                          <div className="border-0 d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-survey col-lg-3 col-md-6" onClick={() => addNewQuestion(setFieldValue, values.questions)}>
                              <PlusIcon />
                              <span>
                                اضف سؤال
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade contact-form" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                      <div className="card border-0">
                        <div className="card-body">
                          <div className="contact-form-header">
                            <h4>نموذج التواصل</h4>
                            <p>اختر البيانات المطلوب الحصول عليها في هذا الاستبيان من عملائك المشاركين</p>
                          </div>
                          <div className="contact-form-body mt-4">
                            <div className="row">
                              {values.fields.map((item, index) => (
                                <div key={item.value} className="col-lg-3">
                                  <div className="form-check">
                                    <Field className="form-check-input"
                                      type="checkbox"
                                      checked={item?.is_required || false}
                                      name={`fields[${index}].is_required`}
                                      id={`field_${index}`}
                                      onChange={() => participantFields(setFieldValue, values.fields, index)}
                                    />
                                    <label className="form-check-label" htmlFor={`field_${index}`}>
                                      {item.title}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="save d-flex justify-content-end mt-5">
                  <button type="submit" className="btn btn-save">حفظ ونشر</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
