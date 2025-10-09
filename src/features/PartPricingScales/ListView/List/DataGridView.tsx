import { AddPartPricingScaleForm } from "@features/PartPricingScales/ListView/Form/AddPartPricingScaleForm.tsx";
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
import { useCreatePartPricingScaleMutation } from "@src/hooks/PartPricingScales/useCreatePartPricingScaleMutation";
import { PricingScale } from "@src/graphql/generated/graphqlTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  partPricingScales: PricingScale[];
};

const DataGridView = ({ partPricingScales }: Props) => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const createMutation = useCreatePartPricingScaleMutation();

  const handleSuccess = () => {
    setIsSheetOpen(false);
  };
  // const handleEditPartPricingScale = (partPricingScaleId: string) => () => {
  //   console.log(partPricingScaleId);
  // };

  const columns: ColumnDef<PricingScale>[] = [
    {
      accessorKey: "pricingScaleId",
      header: t("partPricingScales.listColumns.pricingScaleId", "Id"),
    },
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
    //           ariaLabel={t("partPricingScales.edit", "Edit Parts Pricing Scale")}
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
              {t("partPricingScales.add", "Add Parts Pricing Scale")}
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
              {t("partPricingScales.add", "Add Parts Pricing Scale")}
            </FBSheetTitle>
          </FBSheetHeader>

          <AddPartPricingScaleForm
            createMutation={createMutation}
            onSuccess={handleSuccess}
          />
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
