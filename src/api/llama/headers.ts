export const llamaHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
    Prefer: "wait",
  },
};
