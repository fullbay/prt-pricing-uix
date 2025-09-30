import { useTranslation } from "react-i18next";

interface DisabledPageProps {
  message?: string;
}

export default function DisabledPage({ message }: DisabledPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          {t("page.disabled.title", "Page is disabled")}
        </h1>
        {message && <p className="text-gray-600 mb-4">{message}</p>}
        <p className="text-sm text-gray-500">
          {t(
            "page.disabled.description",
            "This page is currently not available for your account."
          )}
        </p>
      </div>
    </div>
  );
}
