import { useWizardContext } from "../../context.jsx";
import { formatCellValue } from "@svar-ui/excel-import-store";
import "./ColumnTableRow.css";

function ColumnTableRow(props) {
	const { row, columns } = props;

	const ctx = useWizardContext();

	return (
		<tr className="wx-row wx-aacNpmkb">
			{columns.map(column => {
				const value = row[column.index];
				const isHighlighted = ctx.mappedColumns.has(column.id);
				const isRightAligned =
					column.detectedType === "number" ||
					column.detectedType === "date";

				const cellClass = [
					"wx-cell",
					isHighlighted ? "wx-highlighted" : "",
					isRightAligned ? "wx-right-align" : "",
					"wx-aacNpmkb",
				]
					.filter(Boolean)
					.join(" ");

				return (
					<td key={column.id} className={cellClass}>
						<span
							className="wx-cell-value wx-aacNpmkb"
							title={String(value ?? "")}
						>
							{formatCellValue(value)}
						</span>
					</td>
				);
			})}
		</tr>
	);
}

export default ColumnTableRow;
