"use client";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Radio,
  InputNumber,
  Select,
  Tag,
} from "antd";
import { throws } from "assert";
type LayoutType = Parameters<typeof Form>[0]["layout"];

const customizeRequiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </>
);

const FormDynamic = ({
  formSectionsData,
  formLayout = "horizontal",
}: {
  formSectionsData: Array<FormSection>;
  formLayout: LayoutType;
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout={formLayout}
      form={form}
      style={{ maxWidth: formLayout === "inline" ? "none" : "100%" }}
      requiredMark={customizeRequiredMark}
    >
      {formSectionsData.map((formSection, index) => {
        return (
          <div key={index}>
            <h3>{formSection.name}</h3>
            <FormFieldsComponent
              formFields={formSection.fields}
              flexDir={formSection.flexDirection}
            />
          </div>
        );
      })}
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

const FormFieldsComponent = ({
  formFields,
  flexDir = "column",
}: {
  formFields: Array<FormField>,
  flexDir: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        rowGap: 16,
        columnGap: 16,
        flexDirection: flexDir,
      }}
    >
      {formFields.map((field, index) => {
        var field_component = null;
        if (field.type === "string") {
          field_component = <Input {...field} />;
        } else if (field.type === "number") {
          field_component = <InputNumber {...field} />;
        } else if (field.type === "select") {
          field_component = <Select {...field} />;
        } else {
          throw new Error("form field type is not valid");
        }
        return (
          <Form.Item {...field} key={index}>
            {field_component}
          </Form.Item>
        );
      })}
    </div>
  );
};

export default FormDynamic;
