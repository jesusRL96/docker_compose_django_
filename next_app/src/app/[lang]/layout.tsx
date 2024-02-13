import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ComponentLayout from '@/components/layout/Layout';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
				<ComponentLayout>
				{children}
				</ComponentLayout>
			</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;

