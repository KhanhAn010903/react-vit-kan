import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Table } from "antd";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import UserDetail from "./user.detail";
import { deleteUserById } from "../../services/api.service";

const UserTable = (props) => {
  const { dataUser, loadUser } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalUserDetailOpen, setModalUserDetailOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(null);

  const handleDeleteBtn = async (id) => {
    const res = await deleteUserById(id);
    if (res.statusCode === 200) {
      notification.success({
        message: "delete user",
        description: "Xóa người dùng thành công",
      });
      await loadUser();
    }else{
      notification.error({
        message: "error delete user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setUserDetail(record);
              setModalUserDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Full name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
          ></EditOutlined>
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              handleDeleteBtn(record._id);
            }}
          ></DeleteOutlined>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <UserDetail
        isModalUserDetailOpen={isModalUserDetailOpen}
        setModalUserDetailOpen={setModalUserDetailOpen}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />
    </>
  );
};

export default UserTable;
