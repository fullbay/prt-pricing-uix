import { FBIcon } from "@fullbay/forge";

type Props = {
  message: string;
};

const Loading = ({ message }: Props) => {
  return (
    <div className="d-flex justify-content-center">
      <h4>
        {message}
        <FBIcon
          iconName="wrench"
          dataFbTestId="loading"
          ariaLabel={message}
          className="loading-spinny"
        />{" "}
      </h4>
    </div>
  );
};

export default Loading;
