import { Drawer } from "antd";

const UserDetail = (props) => {
  const {
    isModalUserDetailOpen,
    setModalUserDetailOpen,
    userDetail,
    setUserDetail,
  } = props;
  return (
    <>
      <Drawer
        title="Chi tiết người dùng"
        onClose={() => {
          setModalUserDetailOpen(false);
          setUserDetail(null);
        }}
        open={isModalUserDetailOpen}
      >
        {userDetail ? (
          <>
            <p>{userDetail._id}</p>
            <p>{userDetail.fullName}</p>
            <p>{userDetail.phone}</p>
          </>
        ) : (
          <>
            <p>Lỗi</p>
          </>
        )}
      </Drawer>
    </>
  );
};

export default UserDetail;
