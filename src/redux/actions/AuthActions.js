import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestCode = createAsyncThunk(
  "auth/sendCode",
  async (phone, { rejectwithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/clients/sendCode",
        {
          phone,
        }
      );

      return data.msg;
    } catch (error) {
      return rejectwithValue(error.response.data.msg);
    }
  }
);
