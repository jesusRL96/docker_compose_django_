import React from "react";
import { Flex, Table } from "antd";
import { getDictionary, dictionaries } from "../dictionaries";

const Internationalization = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);

  function append_values_recursive(
    locale_key: string,
    key: string,
    value: any,
    lng_info: { [key: string]: any; },
  ) {
    if (typeof value === "object") {
      for (let [key_i, value_i] of Object.entries(value)) {
        key_i = key == "" ? key_i : `${key}>${key_i}`;
        lng_info = append_values_recursive(
          locale_key,
          key_i,
          value_i,
          lng_info,
        );
      }
    } else {
      const locale = `locale_${locale_key}`;
      lng_info[key] = { ...lng_info[key], key: key, [locale]: value };
    }
    return lng_info;
  }

  let langs_info = {};
  for (let [key, _value] of Object.entries(dictionaries)) {
    const dict_language = await getDictionary(key);
    langs_info = append_values_recursive(key, "", dict_language, langs_info);
  }

  const dataSource = Object.values(langs_info);

  const columns = [
    {
      title: "Access key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "ES",
      dataIndex: "locale_es",
      key: "locale_es",
    },
    {
      title: "EN",
      dataIndex: "locale_en",
      key: "locale_en",
    },
  ];

  return (
    <>
      <h1>{dict.main.languages}</h1>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Internationalization;
