import React, { HTMLAttributes, ReactNode } from "react";

const InputFieldComponent = ({
  labelTitle,
  wrapperProps,
  labelProps,
  props,
  children,
}: {
  labelTitle: string;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  props: React.InputHTMLAttributes<HTMLInputElement>;
  children?: ReactNode;
}) => {
  return (
    <div {...wrapperProps}>
      <label {...labelProps}>{labelTitle}</label>
      <input {...props} />
      {children}
    </div>
  );
};

export default InputFieldComponent;
