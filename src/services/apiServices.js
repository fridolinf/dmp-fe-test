import API_BASE_URL from "api/baseUrl";
import ENDPOINT from "api/endpoints/job";
import { Header, HeaderAuth } from "helpers/headerHelper";
import * as services from "helpers/axiosHelper";

export const getJobList = async () => {
  try {
    const request = await services.GET(
      `${API_BASE_URL}${ENDPOINT.getJobList}?page=1`,
      Header()
    );
    if (request.status === 200) {
      const { data } = request;
      return data;
    }
  } catch (error) {
    // setLoading(false);
    console.log(error, "err");
  }
};

export const getDetailJob = async (id) => {
  try {
    const request = await services.GET(
      `${API_BASE_URL}${ENDPOINT.getDetailJob}/${id}`,
      Header()
    );
    if (request.status === 200) {
      const { data } = request;
      return data;
    }
  } catch (error) {
    // setLoading(false);
    console.log(error, "err");
  }
};
