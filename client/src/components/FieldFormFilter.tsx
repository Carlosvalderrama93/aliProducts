import {
  ShippingField,
  type FormFieldProps,
  WeightField,
  DistanceField,
} from "./FormField";

export function FieldFormFilter(
  props: Omit<FormFieldProps, "label" | "placeholder">
) {
  const { name, register, errors, validation, type } = props;

  switch (name) {
    case "incoterm":
      return <ShippingField name={name} register={register} />;
    case "weightUnit":
      return (
        <WeightField
          name={name}
          errors={errors}
          register={register}
          validation={validation}
          type={type}
        />
      );
    case "distanceUnit":
      return (
        <DistanceField
          name={name}
          errors={errors}
          register={register}
          validation={validation}
          type={type}
        />
      );

    default:
      console.log("FieldFormFilter default case");
      break;
  }
}
