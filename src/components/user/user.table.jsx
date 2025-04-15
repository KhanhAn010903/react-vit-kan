import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Table } from "antd";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import UserDetail from "./user.detail";
import { deleteUserById } from "../../services/api.service";

const UserTable = (props) => {
  const {
    dataUser,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;
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
    } else {
      notification.error({
        message: "error delete user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
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

  const onChange = (pagination, filters, sorter, extra) => {
    //setCurrent, setPageSize
    //Nếu thay đổi trang : current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current); //"5" => 5
      }
    }
    //Nếu thay đổi tổng số phần tử : pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize); //"5" => 5
      }
    }
  };

  return (
    <>
      <Table
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
        columns={columns}
        dataSource={dataUser}
        rowKey={"_id"}
      />
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
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
