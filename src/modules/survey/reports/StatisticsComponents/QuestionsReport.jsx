import React from 'react'

export default function QuestionsReport({ questionsList }) {
  return (
    <>
      <div className="content-header">
        <h3 className='title'>
          إحصائيات الإجابات
        </h3>
      </div>
      {questionsList?.map(question => {
        const totalAnswersCount = question?.answers?.reduce((totalAnswers, answer) => totalAnswers + answer?.count, 0);
        return (
          <div className="card border-0 mt-3" key={question?.id}>
            <div className="row answer">
              <div className="card-header">
                <h3 className='title'>
                  {question?.question}
                </h3>
              </div>
              {question?.answers?.map((answer, index) => {
                const answerPercentage = ((100 * answer?.count) / totalAnswersCount).toFixed(2);
                return (
                  <div className="card-body" key={`answer-${index}`}>

                    <div className='allProgress m-0 row align-items-center'>
                      <div className="col-lg-4">
                        <h4 className='title'>{answer?.name}</h4>
                      </div>

                      <div className="col-lg-7">
                        <div className="progress" role="progressbar" aria-label="Basic example"
                          aria-valuenow="76" aria-valuemin="0" aria-valuemax="100">
                          <div className="progress-bar" style={{ width: `${answerPercentage}%` }}></div>
                        </div>
                      </div>
                      <h5 className='title col-lg-1 text-end'>{answerPercentage}%</h5>
                    </div>
                  </div>
                )
              })}


            </div>

          </div>
        )
      })}


    </>
  )
}
