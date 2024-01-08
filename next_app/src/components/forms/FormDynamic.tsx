"use client";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Typography,
  InputNumber,
  Select,
  Tag,
} from "antd";
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
        const isFormset: boolean = formSection?.isFormset;

        return (
          <div key={index}>
            <h3>{formSection.name}</h3>
            {isFormset ? (
              <Form.Item label={formSection.name}>
                <Form.List name={formSection.name}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            rowGap: 16,
                            columnGap: 16,
                            flexDirection: formSection.flexDirection,
                          }}
                        >
                          <FormFieldsComponent
                            formFields={formSection.fields}
                            flexDir={formSection.flexDirection}
                            restField={restField}
                            name={name}
                          />
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            ) : (
              <FormFieldsComponent
                formFields={formSection.fields}
                flexDir={formSection.flexDirection}
                restField={{}}
              />
            )}
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const FormFieldsComponent = ({
  formFields,
  flexDir = "column",
  restField = {},
  name = "",
}: {
  formFields: Array<FormField>;
  flexDir: string|undefined;
  restField: object;
  name: string;
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
          <Form.Item
            {...restField}
            {...field}
            name={name !== "" ? [name, field.name] : field.name}
            label={field.label}
            key={index}
          >
            {field_component}
          </Form.Item>
        );
      })}
    </div>
  );
};

export default FormDynamic;
