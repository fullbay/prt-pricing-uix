import { FBInput } from "@fullbay/forge";
import React from "react";

type FBInputWithStartIconProps = {
  icon: React.ReactElement;
} & React.ComponentProps<typeof FBInput>;

const FBInputWithStartIcon = ({
  icon,
  className = "",
  ...rest
}: FBInputWithStartIconProps) => {
  // Remove any existing `ps-6` classes since we'll be adding our own here
  const classNameList = className.split(" ").filter((c) => c !== "ps-6");
  classNameList.push("ps-6");

  return (
    <div className="relative">
      <div className="w-5 absolute h-full flex items-center justify-end">
        {icon}
      </div>
      <FBInput className={classNameList.join(" ")} {...rest} />
    </div>
  );
};

export default FBInputWithStartIcon;
