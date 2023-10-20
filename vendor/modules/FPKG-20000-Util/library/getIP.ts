import axios from "axios";

export default async function() {
  try {
    const IP = await axios.get("https://api.ipify.org");
    return IP.data;
  } catch (error) {
    console.error(error);
  }
}
