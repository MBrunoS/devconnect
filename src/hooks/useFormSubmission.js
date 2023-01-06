import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export const useFormSubmission = (apiUrl) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (data, successMsg) => {
    setIsSubmitting(true);
    try {
      const response = await api.post(apiUrl, data);
      toast.success(successMsg);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error(`Erro inesperado: ${error}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submit,
  };
};
