"use server";

import { storyExample, promptTemplate } from "@/api/constants";
import { llamaConfig } from "@/api/llama/config";
import { llamaHeaders } from "@/api/llama/headers";
import { llamaApiRoute } from "@/api/llama/route";
import axios from "axios";

export async function getStoryFromPrompt(prevState: any, formData: FormData) {
  "use server";

  try {
    // First request to create a prediction
    const predictionResponse = await axios.post(
      llamaApiRoute,
      llamaConfig(formData.get("quote-info") as string),
      llamaHeaders
    );

    // new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      success: true,
        res: predictionResponse.data.output.join(" "),
      // res: storyExample,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
