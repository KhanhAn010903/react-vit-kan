import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Result
        status="403"
        title="Oops!"
        subTitle={error.subTitle || error.message}
        extra={
          <Button type="primary" key="console">
            <Link to="/">
              <span>Back to home page </span>
            </Link>
          </Button>
        }
      />
    </div>
  );
}
