import axios from 'axios'

const studentsURL = "https://www.hatchways.io/api/assessment/students"

const fetchStudents = async () => {
  const { data } = await axios.get(studentsURL)
  const { students } = data

  return students
}

export default fetchStudents