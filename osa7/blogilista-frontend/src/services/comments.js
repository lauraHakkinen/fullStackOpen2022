import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (id, comment) => {
  console.log(comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const commentsService = { create }
export default commentsService
