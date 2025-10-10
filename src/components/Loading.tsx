import { FBIcon, FBSpinner } from "@fullbay/forge";
import { useTranslation } from "react-i18next";

type Props = {
  message: string;
};

const Loading = ({ message }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center gap-2">
      <h4>{message}</h4>
      <FBSpinner
        dataFbTestId="auth-spinner"
        icon={
          <FBIcon
            iconName="wrench"
            dataFbTestId="loading"
            ariaLabel={t("common.loading", "Loading...")}
            iconSize={24}
          />
        }
      />
    </div>
  );
};

export default Loading;
