import { AddPartPricingScaleForm } from "@features/PartPricingScales/ListView/Form/AddPartPricingScaleForm.tsx";
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
import { PartPricingScale } from "@src/types/partPricingScales.ts";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  partPricingScales: PartPricingScale[];
  refreshData: () => void;
};

const DataGridView = ({ partPricingScales, refreshData }: Props) => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const addPartPricingScale = () => {
    refreshData();
    setIsSheetOpen(false);
  };

  const columns: ColumnDef<PartPricingScale>[] = [
    {
      accessorKey: "name",
      header: t("partPricingScales.listColumns.name", "Title"),
    },
    {
      accessorKey: "isDefault",
      header: t("partPricingScales.listColumns.isDefault", "Is Default"),
      cell: (info) =>
        info.getValue() ? t("common.yes", "Yes") : t("common.no", "No"),
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
    //           ariaLabel={t("partPricingScales.edit", "Edit Part Pricing Scale")}
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
                ariaLabel={t("partPricingScales.add", "Add Part Pricing Scale")}
                dataFbTestId="add-part-pricing-scale-icon"
              />{" "}
              {t("partPricingScales.add", "Add Part Pricing Scale")}
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
              {t("partPricingScales.add", "Add Part Pricing Scale")}
            </FBSheetTitle>
          </FBSheetHeader>

          <AddPartPricingScaleForm addPartPricingScale={addPartPricingScale} />
        </FBSheetContent>
      </FBSheet>

      {partPricingScales.length === 0 && (
        <div className="p-3 text-center">
          {t("partPricingScales.noItems", "No Part Pricing Scales to display.")}
        </div>
      )}

      {partPricingScales.length > 0 && (
        <FBDatagrid
          pageSize={10}
          data={partPricingScales}
          dataFbTestId="datagrid-part-pricing-scales"
          columns={columns}
        />
      )}
    </>
  );
};

export default DataGridView;
