import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RawPropsType } from "../funct/product";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type {
  FormFieldPropsGeneratorType,
  NameFormFieldGeneratorType,
} from "../funct/formField";

export type FormFieldProps = Omit<FormFieldPropsGeneratorType, "id"> & {
  type: string;
  register: UseFormRegister<RawPropsType>;
  errors: FieldErrors<RawPropsType>;
};

export function InputField(props: FormFieldProps) {
  const { label, name, type, placeholder, register, errors, validation } =
    props;

  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
      )}
    </>
  );
}

export function TextAreaField(
  props: Pick<FormFieldProps, "name" | "validation" | "register">
) {
  const { name, validation, register } = props;
  return <textarea {...register(name, validation)} />;
}



export function ShippingField(
  props: Pick<FormFieldProps, "name" | "register">
) {
  const { name, register } = props;
  const [shipping, setShipping] = useState<string>("aereo");
  const [incotermsOpt, setIncotermsOpt] = useState<string[]>([]);
  const values = ["aereo", "maritimo"];

  useEffect(() => {
    const aereoInco = ["EXW", "FCA", "CPT", "CIP", "DAP", "DAT", "DDP"];
    const maritimoInco = [
      "EXW",
      "FOB",
      "CFR",
      "CIF",
      "FAS",
      "CPT",
      "CIP",
      "DAT",
      "DAP",
      "DDP",
    ];
    if (shipping === "maritimo") return setIncotermsOpt(maritimoInco);
    if (shipping === "aereo") return setIncotermsOpt(aereoInco);
  }, [shipping]);
  return (
    <div>
      {
        <RadioField
          name={name}
          register={register}
          values={values}
          setState={setShipping}
          state={shipping}
        />
      }
      {
        <SelectField
          incotermsOpt={incotermsOpt}
          name={name}
          register={register}
        />
      }
    </div>
  );
}

export function WeightField(props: Omit<FormFieldProps, "label" | "placeholder">) {
  const [weightUnit, setWeightUnit] = useState("gr");
  const { name, register, errors, validation } = props;
  const values = ["gr", "lb", "kg", "tn"];
  return (
    <div>
      <RadioField
        name={name}
        register={register}
        setState={setWeightUnit}
        state={weightUnit}
        values={values}
      />
      <InputField
        label={"weight"}
        name={"weight"}
        placeholder={"weight TEST"}
        register={register}
        errors={errors}
        validation={validation}
        type="number"
      />
    </div>
  );
}

export function DistanceField(props: Omit<FormFieldProps, "placeholder" | "label">) {
  const [distanceUnit, setDistanceUnit] = useState("gr");
  const { name, register, errors, validation } = props;
  const values = ["gr", "lb", "kg", "tn"];
  const names: Partial<NameFormFieldGeneratorType>[] = [
    "width",
    "height",
    "length",
  ];
  return (
    <div>
      <RadioField
        name={name}
        register={register}
        setState={setDistanceUnit}
        state={distanceUnit}
        values={values}
      />
      {names.map((name, index) => {
        return (
          <InputField
            key={index}
            label={name}
            name={name}
            placeholder={name}
            register={register}
            errors={errors}
            validation={validation}
            type="number"
          />
        );
      })}
    </div>
  );
}

export function RadioField(
  props: Pick<FormFieldProps, "name" | "register"> & {
    values: string[];
    setState: Dispatch<SetStateAction<string>>;
    state: string;
  }
) {
  const { name, register, values, state, setState } = props;
  return values.map((value, index) => (
    <div key={index}>
      <label>{value}</label>
      <input
        {...register(name)}
        type="radio"
        value={value}
        checked={value === state}
        onChange={(e) => e.target.value && setState(value)}
      />
    </div>
  ));
}

function SelectField(
  props: Pick<FormFieldProps, "name" | "register"> & { incotermsOpt: string[] }
) {
  const { name, incotermsOpt, register } = props;
  return (
    <select {...register(name)}>
      {" "}
      {incotermsOpt?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
