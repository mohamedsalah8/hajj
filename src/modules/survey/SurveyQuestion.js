import React from 'react';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { CopyIcon, CrossDeleteIcon, DeleteIcon, EditIcon, HelpIcon } from 'components/icons/SharedIcons';

const SurveyQuestion = ({
  questionData,
  addNewAnswer,
  deleteQuestionAnswer,
  handleAnswerInput,
  handleQuestionInputs,
  removeQuestion,
  cloneQuestion,
  index
}) => {
  const { title, answers, type, is_required, to } = questionData;

  return (
    <div className="question card mb-3">
      <div className="question-header">
        <div className='d-flex align-items-center'>
          <HelpIcon />
          <span className="mx-2 fw-bold">عنوان السؤال</span>
        </div>
        <div className="actions d-flex align-items-center gap-3">
          <button className="btn"
            data-bs-toggle="collapse"
            href={`#SurveyQuestionChoice-${index}`}
            aria-expanded="false"
            aria-controls={`#SurveyQuestionChoice-${index}`}
          >
            <EditIcon />
          </button>
          <button className="btn" onClick={() => cloneQuestion(index)}>
            <CopyIcon />
          </button>
          <button className="btn" onClick={() => removeQuestion(index)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <hr />
      <div className="question-body">
        <div className={`collapse ${questionData.isOpend ? "show" : ""} d-flex gap-3`} id={`SurveyQuestionChoice-${index}`}>
          <div className="col-lg-9">
            <div className="answer-question">
              <Field
                type='text'
                placeholder="عنوان السؤال"
                className="form-control"
                name={`questions.${index}.title`}
              />
              <ErrorMessage name={`questions.${index}.title`} component="div" className="text-danger" />

              {(type === "choice" || type === "rate_range") &&
                <div className="answer-selected">
                  {type === "choice" &&
                    <FieldArray name={`questions.${index}.answers`}>
                      {({ remove, push }) => (
                        <>
                          {answers?.map((answer, answerIndex) => (
                            <div key={answerIndex} className="w-100 d-flex align-items-center justify-content-center gap-2 mb-4">
                              <span className="d-inline-block">
                                <HelpIcon />
                              </span>
                              <span className="w-100">
                                <Field
                                  type="text"
                                  placeholder="ادخل جواب السؤال"
                                  className="form-control"
                                  name={`questions.${index}.answers.${answerIndex}.title`}
                                />
                                <ErrorMessage name={`questions.${index}.answers.${answerIndex}.title`} component="div" className="text-danger" />
                              </span>
                              <button type="button" className="btn d-inline-block" onClick={() => remove(answerIndex)}>
                                <CrossDeleteIcon />
                              </button>
                            </div>
                          ))}
                          <div className="add-answer d-flex justify-content-center">
                            <button type="button" className="btn" onClick={() => push({ title: '' })}>
                              أضف اجابة أخرى
                            </button>
                          </div>
                        </>
                      )}
                    </FieldArray>
                  }
                  {type === "rate_range" &&
                    <div className="row g-3 align-items-center">
                      <div className="col-3">حدد نسبة القيم</div>
                      <div className="col-4">
                        <label htmlFor='rate-to' className="mb-2">إلى</label>
                        <Field as="select" className="form-select" aria-label="إلى" id="rate-to"
                          name={`questions.${index}.to`}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Field>
                        <ErrorMessage name={`questions.${index}.to`} component="div" className="text-danger" />
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
          <div className="col-lg-3">
            <div className="answer-question">
              <div className="answer-selected">
                <label htmlFor="questionType">نوع السؤال</label>
                <Field as="select" name={`questions.${index}.type`} id="questionType" className="form-control form-select mt-2">
                  <option value="choice">اختيارات</option>
                  <option value="rate_range"> تقييم مدي رضائك</option>
                  <option value="rate">تقييم</option>
                  <option value="textarea"> النص</option>
                </Field>
                <ErrorMessage name={`questions.${index}.type`} component="div" className="text-danger" />

                <div className="form-check mt-3">
                  <Field
                    className="form-check-input"
                    type='checkbox'
                    name={`questions.${index}.is_required`}
                  />
                  <label className="form-check-label" htmlFor={`questions.${index}.is_required`}>
                    سؤال إجباري
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestion;