import { LoadingSpinner } from "@components/auth/LoadingSpinner.tsx";

type AuthMessageScreenProps = {
  message: string;
  showSpinner?: boolean;
  maxWidth?: "md";
}

export const AuthMessageScreen = ({ message, showSpinner, maxWidth }: AuthMessageScreenProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center${
          maxWidth ? ` max-w-${maxWidth}` : ""
        }`}
      >
        {showSpinner && <LoadingSpinner size="lg" className="mb-4" />}
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
