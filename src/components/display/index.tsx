import { Card } from "antd";
import { ReactNode } from "react";
import "./style.css";
interface DisplayProps {
  children?: ReactNode | undefined;

  describe: string;
  demoTitle: string;
}

const Display =    (props: DisplayProps) => {
  const { children, describe, demoTitle } = props;

  return (
    <Card className="card">
      <p className="describe">{describe}</p>
      <div className="demo">
        <p>
          demo 简述： <p className="demoTitle">{demoTitle}</p>
        </p>
        {children}
      </div>
    </Card>
  );
};

export default Display;
