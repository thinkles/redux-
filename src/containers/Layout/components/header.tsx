import { Avatar, Dropdown, Input, MenuProps } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const HeaderGroup = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>登录</span>
    }
  ];
  return (
    <>
      <h1 className="logoHeader">
        <a className="logoContainer" href="#">
          <i
            className="fas  fa-yin-yang fa-2x"
            style={{ marginRight: "10px", marginBottom: "1px" }}
          />
          <span className="logo">{`Na.Ture`}</span>
        </a>
      </h1>
      <div style={{ marginLeft: 50 }}>
        <span className="searchContainer">
          <Input
            className="search"
            bordered={false}
            placeholder="输入搜索内容"
            prefix={<SearchOutlined style={{ color: "#8a9099" }} />}
          />
        </span>
      </div>
      <div className="status">
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Avatar shape="square" size={32} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </>
  );
};

export default HeaderGroup;
