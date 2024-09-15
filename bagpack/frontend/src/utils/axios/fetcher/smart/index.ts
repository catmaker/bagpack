import axios from "axios";

const baseURL = "https://timeink.onrender.com";

interface ClassifyItem {
  text: string;
}

export const classify = async (items: ClassifyItem[]) => {
  try {
    const res = await axios.post(`${baseURL}/classify`, items);

    if (res.status < 200 || res.status >= 300) {
      throw new Error("classify return 데이터가 비어있습니다.");
    }

    const { data } = res;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const feedback = async (title: string, category: string) => {
  try {
    const response = await axios.post(`${baseURL}/feedback`, {
      text: title,
      category,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending feedback:", error);
    throw error;
  }
};
