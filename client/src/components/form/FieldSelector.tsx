import {
  InputField,
  TextAreaField,
  SpecialField,
  type FormFieldProps,
} from "./Fields";

export default function FieldSelector(props: Omit<FormFieldProps, "type">) {
  const { label, name, placeholder, validation, errors, register } = props;

  const formFieldConfig: {
    password: string[];
    email: string[];
    range: string[];
    search: string[];
    url: string[];
    time: string[];
    textarea: string[];
    checkbox: string[];
    tel: string[];
    select: string[];
    text: string[];
    radio: string[];
    number: string[];
  } = {
    url: ["url"],
    select: ["incoterm"],
    textarea: ["comments"],
    radio: ["weightUnit", "distanceUnit"],
    text: ["title", "hsCode", "materials", "colors", "sizes", "packaging"],
    number: [
      "price",
      "privateLabel",
      "samplePrice",
      "sampleQuantity",
      "sampleDelivery",
      "moq",
    ],
    password: [],
    email: [],
    range: [],
    search: [],
    time: [],
    checkbox: [],
    tel: [],
  };

  switch (true) {
    case formFieldConfig.email.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="email"
        />
      );

    case formFieldConfig.number.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="number"
        />
      );

    case formFieldConfig.password.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="password"
        />
      );

    case formFieldConfig.time.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="time"
        />
      );

    case formFieldConfig.url.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="url"
        />
      );

    case formFieldConfig.range.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="range"
        />
      );

    case formFieldConfig.search.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="search"
        />
      );

    case formFieldConfig.tel.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="tel"
        />
      );

    case formFieldConfig.text.includes(name):
      return (
        <InputField
          label={label}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          validation={validation}
          type="text"
        />
      );

    case formFieldConfig.checkbox.includes(name):
      return (
        <InputField
          name={name}
          register={register}
          label={label}
          placeholder={placeholder}
          errors={errors}
          validation={validation}
          type={"checkbox"}
        />
      );

    case formFieldConfig.radio.includes(name):
      return (
        <SpecialField
          errors={errors}
          type={"number"}
          validation={validation}
          name={name}
          register={register}
        />
      );

    case formFieldConfig.select.includes(name):
      return (
        <SpecialField
          errors={errors}
          type={"number"}
          validation={validation}
          name={name}
          register={register}
        />
      );

    case formFieldConfig.textarea.includes(name):
      return (
        <TextAreaField
          name={name}
          register={register}
          validation={validation}
        />
      );
  }
}
