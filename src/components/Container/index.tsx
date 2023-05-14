import { ReactNode } from "react";
import { Card } from "antd";

interface ContainerType {
  title: string;
  describe?: string;
  children: ReactNode;
}

export const Container = (props: ContainerType) => {
  const { children, title } = props;

  return (
    <>
      <div className="container">
        <Card title={title}>{children}</Card>
      </div>
    </>
  );
};

export default Container;
