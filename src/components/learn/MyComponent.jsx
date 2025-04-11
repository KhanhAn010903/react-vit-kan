import './style.css';

const MyComponent = () => {
  const profile = {
     name : "Khánh An",
     age  : 22
  }
  return (
    <>
      <div>{profile.name} đẹp trai</div>
      <div className="child">Hello Khánh An</div>
    </>
  );
};

export default MyComponent;
