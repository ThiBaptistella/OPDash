import { TrialBalanceReport, ParsedTrialBalance } from "../types/TrialBalance";

export function parseTrialBalanceData(
  data: TrialBalanceReport
): ParsedTrialBalance {
  const categories: string[] = [];
  const seriesData: number[] = [];

  data.reports[0].rows.forEach((row) => {
    if (row.rowType === "Section" && row.title) {
      categories.push(row.title);
      const rowData = row.rows?.map((innerRow) => {
        return (
          innerRow.cells?.reduce((acc, cell) => {
            const value = parseFloat(cell.value.replace(/,/g, ""));
            return isNaN(value) ? acc : acc + value;
          }, 0) ?? 0
        );
      }) ?? [0];
      seriesData.push(rowData.reduce((acc, value) => acc + value, 0));
    }
  });

  return {
    categories,
    series: [
      {
        name: "Values",
        data: seriesData,
      },
    ],
  };
}
