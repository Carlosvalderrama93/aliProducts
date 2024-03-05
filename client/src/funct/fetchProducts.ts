import { buildProduct, type ProductType, type RawPropsType } from "./product";

export default async function doFetch(data: ProductType, key: string) {
  switch (key) {
    case "post":
      return await post(data);

    default:
      console.log("Default case");
      break;
  }
}

async function post(product: RawPropsType) {
  try {
    const requestOpt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    const res = await fetch("http://localhost:3000/api/product", requestOpt);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}
