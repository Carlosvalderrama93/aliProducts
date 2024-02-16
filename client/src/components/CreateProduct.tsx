import { useForm } from "react-hook-form";
import { type RawPropsType, buildProps } from "../funct/product";
import doFetch from "../funct/fetchProducts";

export default function CreateProduct() {
  const { register, handleSubmit, reset } = useForm<RawPropsType>();

  async function onSubmit(data: RawPropsType) {
    doFetch(data, "post");
    reset(buildProps());
  }

  return (
    <div>
      <h1>Add a product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("title", {
            required: {
              value: true,
              message: "Is required",
            },
          })}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("price")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          HS Code:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("hsCode")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Packaging:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("packaging")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Volume:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("volume")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Private Label:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("privateLabel")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          URL Product:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("url")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Materials:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("materials")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sample Price:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("samplePrice")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sample Quantity:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("sampleQuantity")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sample Delivery:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("sampleDelivery")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Colors:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("colors")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sizes:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("sizes")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Unit Price:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("unitPrice")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Incoterm:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("incoterm")}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Minimun Order Quantity:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("moq")}
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}
