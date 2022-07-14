import axios from "axios";
axios.defaults.baseURL = "https://user-details-restapi.herokuapp.com/";

export async function getAllUsers() {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function sendMail(html) {
  try {
    const data = { html };
    const response = await axios.post("/users/send", data);
    return response;
  } catch (error) {
    return error;
  }
}

export async function postUser(user) {
  try {
    const { name, email, phone, hobbies } = user;
    const others = { name, email, phone, hobbies };
    const response = await axios.post("/users", others);
    return response;
  } catch (error) {
    return error;
  }
}

export async function updateUser(user) {
  try {
    const { name, email, phone, hobbies } = user;
    const others = { name, email, phone, hobbies };
    const response = await axios.patch(`/user/${user._id}`, others);
    return response;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(_id) {
  try {
    const response = await axios.delete(`/user/${_id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
