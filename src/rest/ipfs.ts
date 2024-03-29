import axios from "axios";
import { IPFSUrlPrefix } from "../../env";
import { TicketEvent } from "../entities/event";

export const getIPFSEventData = async (url: string) => {
  let returnData: TicketEvent = {
    creatorName: "",
    description: "",
    endDate: "",
    imageUrl: "",
    location: "",
    price: 0,
    startDate: "",
    title: "",
  };
  try {
    const response = await axios.get(`${IPFSUrlPrefix}${url}`);
    const data = response.data;
    if (data) {
      returnData = data;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios request failed", err.response?.data, err.toJSON());
    } else {
      console.error(err);
    }
  }
  return returnData;
};

export const getFileFromPinata = async (IpfsHash: string) => {
  if (!IpfsHash) {
    return "";
  }
  const response = await fetch(`${IPFSUrlPrefix}ipfs/${IpfsHash}`);
  const data = await response.json();
  const file = `data:image;base64,${data.file}`;
  return file;
};
