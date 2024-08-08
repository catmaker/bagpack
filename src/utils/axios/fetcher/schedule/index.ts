import axios from "axios";

export const getPosts = async (email: string | undefined) => {
  try {
    const response = await axios.post(
      "/api/user/getPost",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};
