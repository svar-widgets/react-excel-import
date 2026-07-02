import { useContext, useMemo } from "react";
import { useWizardContext } from "../../context.jsx";
import { context } from "@svar-ui/react-core";
import Dropdown from "../ui/Dropdown.jsx";
import ColumnIcon from "./ColumnIcon.jsx";
import "./ColumnTableHeader.css";

function ColumnTableHeader(props) {
	const { column } = props;

	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	const ctx = useWizardContext();

	// Find which field is mapped to this column
	const mappedFieldId = useMemo(() => {
		for (const [fieldId, columnId] of Object.entries(
			ctx.currentMappings
		)) {
			if (columnId === column.id) {
				return fieldId;
			}
		}
		return null;
	}, [ctx.currentMappings, column.id]);

	const isRightAligned = useMemo(
		() =>
			column.detectedType === "number" ||
			column.detectedType === "date",
		[column.detectedType]
	);

	const showDropdown = useMemo(
		() => ctx.config.selectors !== "right",
		[ctx.config.selectors]
	);

	// Build dropdown options from fields
	const dropdownOptions = useMemo(
		() => [
			{ id: "__skip__", label: _("Skip"), default: true },
			...ctx.config.fields.map(field => {
				const mappedTo = ctx.currentMappings[field.id];
				const isUsed =
					mappedTo !== null && mappedTo !== column.id;
				return {
					id: field.id,
					label: field.label,
					used: isUsed,
				};
			}),
		],
		[ctx.config.fields, ctx.currentMappings, column.id, _]
	);

	function handleChange({ value }) {
		const fieldId = typeof value === "string" ? value : String(value);
		// First, clear any existing mapping to this column
		if (mappedFieldId) {
			ctx.setFieldMapping(mappedFieldId, null);
		}

		// Then set the new mapping (this will also clear the field's previous column mapping)
		if (fieldId && fieldId !== "__skip__") {
			ctx.setFieldMapping(fieldId, column.id);
		}
	}

	const thClass = [
		"wx-col-header",
		mappedFieldId ? "wx-highlighted" : "",
		mappedFieldId !== null ? "wx-mapped" : "",
		isRightAligned ? "wx-right-align" : "",
		"wx-aaeNQ7jS",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<th className={thClass}>
			{showDropdown && (
				<div className="wx-col-dropdown wx-aaeNQ7jS">
					<Dropdown
						options={dropdownOptions}
						value={mappedFieldId ?? "__skip__"}
						onChange={handleChange}
					/>
				</div>
			)}

			<div className="wx-col-info wx-aaeNQ7jS">
				{column.detectedType !== "text" && (
					<span className="wx-col-type wx-aaeNQ7jS" title={column.detectedType}>
						<ColumnIcon type={column.detectedType} />
					</span>
				)}
				<span className="wx-col-name wx-aaeNQ7jS" title={column.header}>
					{column.header || `Column ${column.id}`}
				</span>
			</div>
		</th>
	);
}

export default ColumnTableHeader;
