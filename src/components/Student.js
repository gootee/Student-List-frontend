import React, { useState, useEffect } from 'react'

const Student = (props) => {
  const { student, addTagsToStudent } = props
  const { grades } = student
  const studentIDString = "student-" + student.id + "-collapse"
  const [tags, setTags] = useState([])
  const [newTag, setnewTag] = useState("")

  useEffect(() => {
    if (tags && student.tags && student.tags !== tags) {
      setTags(student.tags)
    }    
  }, [tags, student.tags])

  const getGradeAverage = (grades) => {
    const numberGrades = grades.map((grade) => {
      return parseInt(grade, 10)
    })

    const totalGrades = numberGrades.reduce((a, b) => a + b)

    return Math.round(totalGrades/grades.length * 1000)/1000
  }

  const onTagChange = (event) => {
    setnewTag(event.target.value)
  }

  const onTagKeyDown = (event) => {
    if (event.target.value && event.key === "Enter") {
      const value = event.target.value
      const newTagName = value.toLowerCase()
      let newStudentTags = []

      if (newTagName.length > 0) {
        setnewTag("")
        if (tags.find((tag) => tag.toLowerCase() === newTagName)) {
          return
        } else {
          newStudentTags = [...tags, newTagName]
          addTagsToStudent(newStudentTags, student.id)
        }
      }
      setTags(newStudentTags)
    }
  }

  return (
    <div id="student" className="container d-flex justify-content-between">
      <div className="student-left d-flex">
        <div className="student-icon d-flex justify-content-center align-items-center">
          <img src={student.pic} alt="Student Icon"/>
        </div>
        <div className="student-text">
          <div>
            <div className="student-name">{ student.firstName } { student.lastName }</div>
          </div>
          <div className="student-details">
            <div>
              <p>{ student.email }</p>
            </div>
            <div>
              <p>{ student.company }</p>
            </div>
            <div>
              <p>{ student.skill }</p>
            </div>
            <div>
              <p>{ getGradeAverage(grades) }%</p>
            </div> 
            <div id={ studentIDString } className="collapse student-grade-list">
              <ul>
                {
                  grades && grades.map((grade, gradeIndex) => (
                    <li key={gradeIndex}>
                      <div className="d-flex flex-row justify-content-start">
                        <div>
                          <p>Test {gradeIndex + 1}</p>
                        </div>
                        <div className="grade">
                          <p>{ grade }%</p>
                        </div>                        
                      </div>
                    </li>
                  ))
                }
              </ul>
              <ul className="student-tag-list">
                {
                  tags.map((tag, tagIndex) => (
                    <div className="btn btn-primary tag-container"><li key={tagIndex} className="tag">{tag}</li></div>
                  ))
                }
              </ul>
              <div className="tag-input">
                <input 
                  type="text" 
                  className="add-tag-input"
                  onChange={event => onTagChange(event)} 
                  onKeyDown={event => onTagKeyDown(event)} 
                  placeholder="add a tag" 
                  value={ newTag }
                />
              </div>
            </div>         
          </div>
        </div>        
      </div>

      <div className="student-right"> 
        <a id={ studentIDString }  className="collapse show" data-toggle="collapse" href={ `#${studentIDString}` }  aria-expanded="false" aria-controls="student-collapse">
          <i className="fas fa-plus"></i>
        </a>
        <a id={ studentIDString }  className="collapse" data-toggle="collapse" href={ `#${studentIDString}` }  aria-expanded="false" aria-controls="student-collapse">
        <i className="fas fa-minus"></i>
        </a>
      </div>  
    </div>
  )
}

export default Student