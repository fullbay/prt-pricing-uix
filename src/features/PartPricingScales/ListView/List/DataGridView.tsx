import { AddPartPricingScaleSheet } from "@features/PartPricingScales/ListView/Form/AddPartPricingScaleSheet.tsx";
import { FBButton, FBDatagrid, FBIcon } from "@fullbay/forge";
import { PartPricingScale } from "@src/types/partPricingScales.ts";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  partPricingScales: PartPricingScale[];
  refreshData: () => void;
};

const DataGridView = ({ partPricingScales, refreshData }: Props) => {
  const { t } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");
  const [editPartPricingScaleId, setEditPartPricingScaleId] = useState<
    string | null
  >(null);

  const handleAddPartPricingScaleButtonClick = useCallback(() => {
    setSheetTitle(t("partPricingScales.add", "Add Part Pricing Scale"));
    setEditPartPricingScaleId(null);
    setIsSheetOpen(true);
  }, [t]);

  const handleEditPartPricingScaleButtonClick = useCallback(
    (partPricingScaleId: string) => {
      setSheetTitle(t("partPricingScales.edit", "Edit Part Pricing Scale"));
      setEditPartPricingScaleId(partPricingScaleId);
      setIsSheetOpen(true);
    },
    [t]
  );

  const handleSheetClose = useCallback((open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      // Clear state when sheet closes
      setEditPartPricingScaleId(null);
    }
  }, []);

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
    {
      accessorKey: "pricingScaleId",
      header: "",
      cell: (info) => {
        const pricingScaleId = info.getValue() as string;
        return (
          <div className="text-right">
            <FBButton
              dataFbTestId={`edit-part-pricing-scale-btn-${pricingScaleId}`}
              variant="default"
              onClick={() =>
                handleEditPartPricingScaleButtonClick(pricingScaleId)
              }
            >
              <FBIcon
                iconName="edit"
                ariaLabel={t(
                  "partPricingScales.edit",
                  "Edit Part Pricing Scale"
                )}
                dataFbTestId="edit-part-pricing-scale-icon"
              />
            </FBButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-end py-3">
        <FBButton
          dataFbTestId="add-part-pricing-scale-btn"
          variant="default"
          onClick={handleAddPartPricingScaleButtonClick}
        >
          <FBIcon
            iconName="add"
            ariaLabel={t("partPricingScales.add", "Add Part Pricing Scale")}
            dataFbTestId="add-part-pricing-scale-icon"
          />{" "}
          {t("partPricingScales.add", "Add Part Pricing Scale")}
        </FBButton>
      </div>

      <AddPartPricingScaleSheet
        onOpenChange={handleSheetClose}
        open={isSheetOpen}
        partPricingScaleId={editPartPricingScaleId}
        refreshData={refreshData}
        title={sheetTitle}
      />

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
