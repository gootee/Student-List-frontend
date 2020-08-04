import fetchStudents from "../api/fetchStudents"
import React, { useEffect, useState, useMemo } from 'react'
import Student from "./Student"

const StudentList = () => {
  const [students, setStudents] = useState([])
  const [nameFilterString, setNameFilterString] = useState("")
  const [tagFilterStrings, setTagFilterStrings] = useState([])
  const [filteredStudents, setFilteredStudent] = useState([])

  useEffect(() => {
    const getStudents = async () => {
      const studentList = await fetchStudents()
      setStudents(studentList)
    }

    getStudents()
  },[])

  useMemo(() => {
    setFilteredStudent(
      students.filter((student) => {

        let matchName = true
        let matchTags = true

        if (nameFilterString) {
          matchName = student.firstName.toLowerCase().includes(nameFilterString) || student.lastName.toLowerCase().includes(nameFilterString)
        }

        if (tagFilterStrings && tagFilterStrings.length > 0) {
          if (student.tags && student.tags.length > 0) {
            const studentTagsString = student.tags.toString().toLowerCase()
            matchTags = tagFilterStrings.every(searchTag => studentTagsString.includes(searchTag))            
          } else {
            matchTags = false
          }
        } 

        return matchName && matchTags
      })
    )
  }, [students, nameFilterString, tagFilterStrings])

  const onNameFilterChange = (event) => {
    debugger
    setNameFilterString(event.target.value.toLowerCase())
  }

  const onTagFilterChange = (event) => {
    if (event.target.value && event.target.value.length > 0) {
      let filterStringArray
      if (event.target.value.indexOf(",") > -1) {
        filterStringArray = event.target.value.split(",")
      } else {
        filterStringArray = event.target.value.split(" ")
      }

      setTagFilterStrings(
        filterStringArray.map(tagString => {
          return tagString.trim().toLowerCase()
        })
      )
    } else {
      setTagFilterStrings([])
    }
  }

  const addTagsToStudent = (newTags, studentID) => {
    const thisStudentIndex = students.findIndex((student) => student.id === studentID)
    if (thisStudentIndex > -1) {
      students[thisStudentIndex].tags = [...newTags] 
      setStudents(students)
    }
    return
  }

  return (
    <main id="main" className="container-fluid">
      <div className="row">
        <div id="student-list" className="col-6">
          <div className="student-search d-flex flex-column">
            <input 
              type="text"
              id="name-input"
              onChange={event => onNameFilterChange(event)} 
              placeholder="Search by name"  
            />               
 
            <input 
              type="text" 
              id="tag-input" 
              onChange={e => onTagFilterChange(e)} 
              placeholder="Search by tags"
            />                   
          </div>
          <div>
            {
              filteredStudents && filteredStudents.map(student => 
                <Student id={ student.id } student={ student } addTagsToStudent={ addTagsToStudent }/>
              )
            }            
          </div>
        </div>        
      </div>
    </main>
  )
}

export default StudentList
