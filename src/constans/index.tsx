import { Link } from "react-router-dom";
import { UserOutlined,VideoCameraOutlined ,UploadOutlined} from "@ant-design/icons";
export const menuItem = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/test/index">Axios</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/test/index">test</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: <Link to="/doc/index">doc </Link>,
  },
];
