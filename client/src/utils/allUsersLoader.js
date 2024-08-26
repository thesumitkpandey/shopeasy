import axios from "axios";
async function allUsersLoader() {
  try {
    const users = await axios.get("/api/admin/users");
    if (users) {
      return users.data;
    } else {
      throw new Error("Failed to load orders");
    }
  } catch (err) {
    return err.message;
  }
}
export default allUsersLoader;