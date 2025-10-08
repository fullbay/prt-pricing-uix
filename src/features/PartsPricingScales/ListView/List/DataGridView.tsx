import { AddPartPricingScaleForm } from "@features/PartsPricingScales/ListView/Form/AddPartPricingScaleForm.tsx";
// import { categoryOptions, conditionOptions, statusOptions } from "@features/Inventory/ListView/Form/AddPartFormData.ts";
import {
  FBButton,
  FBDatagrid,
  FBIcon,
  FBSheet,
  FBSheetContent,
  FBSheetHeader,
  FBSheetTitle,
  FBSheetTrigger,
} from "@fullbay/forge";
import { PartsPricingScale } from "@src/types/partsPricingScales.ts";
import { useState } from "react";
// import { Part } from "@src/graphql/generated/graphqlTypes";
import { useTranslation } from "react-i18next";

// import { useAddPart } from "../../../../hooks/AddPart/useAddPart";
// import { AddPartForm } from "../Form/AddPartForm";

// Use Pick to only require the fields we actually display
// type DisplayPart = Pick<
//   Part,
//   | "partNumber"
//   | "manufacturer"
//   | "description"
//   | "category"
//   | "condition"
//   | "quantity"
//   | "status"
// >;
type Props = {
  partPricingScales: PartsPricingScale[];
  refreshData: () => void;
};

const DataGridView = ({ partPricingScales, refreshData }: Props) => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // const { addPart } = useAddPart();

  const addPartPricingScale = () => {
    refreshData();
    setIsSheetOpen(false);
  };
  // const handleEditPartPricingScale = (partPricingScaleId: string) => () => {
  //   console.log(partPricingScaleId);
  // };

  const columns = [
    {
      accessorKey: "pricingScaleId",
      header: t("partsPricingScales.listColumns.pricingScaleId", "Id"),
    },
    {
      accessorKey: "name",
      header: t("partsPricingScales.listColumns.name", "Title"),
    },
    {
      accessorKey: "isDefault",
      header: t("partsPricingScales.listColumns.isDefault", "Is Default"),
      cell: info => info.getValue() ? t("common.yes", "Yes") : t("common.no", "No"),
    },
    // {
    //   accessorKey: "pricingScaleId",
    //   header: "",
    //   cell: info => (
    //     <div className="text-right">
    //       <FBButton dataFbTestId="add-part-pricing-scale-btn"
    //                 variant="default"
    //                 onClick={handleEditPartPricingScale(info.getValue())}
    //       >
    //         <FBIcon
    //           iconName="edit"
    //           ariaLabel={t("partsPricingScales.edit", "Edit Parts Pricing Scale")}
    //           dataFbTestId="edit-part-pricing-scale-icon"
    //         />
    //       </FBButton>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <FBSheet
        dataFbTestId="add-part-pricing-scale-slideout"
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <FBSheetTrigger asChild dataFbTestId="add-part-pricing-scale-trigger">
          <div className="flex justify-end py-3">
            <FBButton
              dataFbTestId="add-part-pricing-scale-btn"
              variant="default"
            >
              <FBIcon
                iconName="add"
                ariaLabel={t(
                  "partsPricingScales.add",
                  "Add Parts Pricing Scale"
                )}
                dataFbTestId="add-part-pricing-scale-icon"
              />{" "}
              {t("partsPricingScales.add", "Add Parts Pricing Scale")}
            </FBButton>
          </div>
        </FBSheetTrigger>
        <FBSheetContent
          dataFbTestId="add-part-pricing-scale-sheet-content"
          side="right"
          className="flex flex-col gap-0"
        >
          <FBSheetHeader
            dataFbTestId="add-part-pricing-scale-sheet-header"
            className="p-4"
          >
            <FBSheetTitle dataFbTestId="add-part-pricing-scale-sheet-title">
              {t("partsPricingScales.add", "Add Parts Pricing Scale")}
            </FBSheetTitle>
          </FBSheetHeader>

          <AddPartPricingScaleForm addPartPricingScale={addPartPricingScale} />
        </FBSheetContent>
      </FBSheet>

      {partPricingScales.length === 0 && (
        <div className="p-3 text-center">
          {t(
            "partsPricingScales.noItems",
            "No Parts Pricing Scales to display."
          )}
        </div>
      )}

      {partPricingScales.length > 0 && (
        <FBDatagrid
          pageSize={10}
          data={partPricingScales}
          dataFbTestId="datagrid-parts-pricing-scales"
          columns={columns}
        />
      )}
    </>
  );
};

export default DataGridView;
