import { useForm } from "react-hook-form";
import { type RawPropsType, buildProps } from "../funct/product";
import doFetch from "../funct/fetchProducts";
import FormFieldSelector from "./FormFieldSelector";
import { formFieldPropsGenerator, type FormFieldPropsGeneratorType } from "../funct/formField";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RawPropsType>();

  async function onSubmit(data: RawPropsType) {
    doFetch(data, "post");
    reset(buildProps());
  }

  const formFieldProperties: FormFieldPropsGeneratorType[] =
    formFieldPropsGenerator();

  return (
    <div>
      <h1>Add a product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFieldProperties.map((props) => {
          return (
            <FormFieldSelector
              key={props.id}
              label={props.label}
              name={props.name}
              validation={props.validation}
              placeholder={props.placeholder}
              register={register}
              errors={errors}
            />
          );
        })}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}
