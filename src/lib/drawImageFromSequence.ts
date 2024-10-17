"use server";

import Replicate from "replicate";
import { imagekit } from "./image-kit";
import { images } from "@/api/constants";
import { FluxApiRoute } from "@/api/flux/route";
import { fluxParams } from "@/api/flux/params";

export async function generateImageAction(sequence: string) {
  "use server";

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const output = await replicate.run(
    FluxApiRoute,
    fluxParams(sequence)
  );

  const imageUploadResult = await imagekit.upload({
    file: String(output)!,
    fileName: String(output)!,
    tags: ["public-image", "url-upload"],
  });

  return {
  success: true,
  res: imageUploadResult.url,
  };

  // new Promise((resolve) => setTimeout(resolve, 3000));
  // const randomIndex = Math.floor(Math.random() * images.length);

  // return {
  //   success: true,
  //   res: images[randomIndex],
  // };
}
