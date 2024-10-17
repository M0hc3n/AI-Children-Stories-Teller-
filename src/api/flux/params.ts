export const fluxParams = (sequence: string) => ({
  input: {
    model: "dev",
    prompt: `TOK, draw a story scene given this description:  ${sequence}`,
    lora_scale: 1,
    num_outputs: 1,
    height: 350,
    width: 350,
    aspect_ratio: "custom",
    output_format: "webp",
    guidance_scale: 3.5,
    output_quality: 80,
    prompt_strength: 0.8,
    extra_lora_scale: 1,
    num_inference_steps: 28,
  },
});
