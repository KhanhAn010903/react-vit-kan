import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
  handleUploadFile,
  updateUserAvatarAPI,
} from "../../services/api.service";

const UserDetail = (props) => {
  const {
    isModalUserDetailOpen,
    setModalUserDetailOpen,
    userDetail,
    setUserDetail,
    loadUser,
  } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateUserAvatar = async () => {
    //step 1 : upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdateAvatar = await updateUserAvatarAPI(
        userDetail._id,
        newAvatar,
        userDetail.fullName,
        userDetail.phone
      );
      if (resUpdateAvatar.data) {
        setModalUserDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();
        notification.success({
          message: "Upload file success",
          description: "Cập nhật avatar thành công",
        });
      }
    } else {
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message),
      });
      return;
    }
    //step 2 : update user
  };
  return (
    <>
      <Drawer
        width={"40vw"}
        title="Chi tiết người dùng"
        onClose={() => {
          setModalUserDetailOpen(false);
          setUserDetail(null);
        }}
        open={isModalUserDetailOpen}
      >
        {userDetail ? (
          <>
            <p>Id : {userDetail._id}</p>
            <p>Full name : {userDetail.fullName}</p>
            <p>Email : {userDetail.email}</p>
            <p>Phone : {userDetail.phone}</p>
            <div
              style={{
                marginTop: "10px",
                height: "100px",
                width: "150px",
                border: "1px solid #ccc",
              }}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                  userDetail.avatar
                }`}
                height={100}
                width={150}
              />
            </div>
            <div>
              <label
                htmlFor="btnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Upload Avatar
              </label>
              <input
                type="file"
                onChange={handleOnChangeFile}
                hidden
                id="btnUpload"
              />
            </div>
            {preview && (
              <>
                <div
                  style={{
                    marginTop: "10px",
                    height: "100px",
                    width: "150px",
                    border: "1px solid #ccc",
                  }}
                >
                  <img src={preview} height={100} width={150} />
                </div>
                <Button
                  type="primary"
                  onClick={() => {
                    handleUpdateUserAvatar();
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <p>Không có dữ liệu</p>
          </>
        )}
      </Drawer>
    </>
  );
};

export default UserDetail;
