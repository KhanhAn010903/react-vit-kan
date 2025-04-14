import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    loadUser,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    const res = await updateUserAPI(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "update user",
        description: "Cập nhật người dùng thành công",
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "error update user",
        description: JSON.stringify(res.message),
      });
    }
  };
  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };
  return (
    <Modal
      title="Update User"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>Full name</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Phone number</span>
          <Input
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
