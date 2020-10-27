
import axios from "axios";

const URL="http://localhost:3000/api/";
const ApiService =  {
  
  getAllPost() {
    return axios
      .get(URL + "post/getAll", {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  getAllComment() {
    return axios
      .get(URL + "comment/getAll", {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  getAllUsers() {
    return axios
      .get(URL + "auth/users", {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  createPost(titre, content) {
    return axios 
    .post(URL + "post/create",{ 
      user_id: localStorage.getItem('userId'),
      titre: titre,
      content: content,
    },
    {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
    })
  },

  removePost(post) {
    console.log(post)

    return axios 
    .delete(URL + `post/${post.post_id}`,
    {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
    })
  }

}

export default ApiService


