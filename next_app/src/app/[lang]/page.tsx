import { Button, Flex, Table } from "antd";
import Image from "next/image";
import { getDictionary } from "./dictionaries";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return (
    <div>
      <div>
        <h1>
          {dict.main.home} ({lang})
        </h1>
      </div>
      <Flex gap="small" wrap="wrap">
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </div>
  );
}
