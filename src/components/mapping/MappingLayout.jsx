import { useContext, useMemo } from "react";
import { useWizardContext } from "../../context.jsx";
import { Button, context } from "@svar-ui/react-core";
import { getPreviewRows } from "@svar-ui/excel-import-store";
import ColumnTable from "./ColumnTable.jsx";
import FieldsPanel from "./FieldsPanel.jsx";
import StatusBar from "./StatusBar.jsx";
import "./MappingLayout.css";

function MappingLayout() {
	const ctx = useWizardContext();
	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	const sheet = useMemo(() => ctx.currentSheet, [ctx.currentSheet]);
	const previewRowCount = useMemo(
		() => ctx.config.previewRowCount ?? 10,
		[ctx.config.previewRowCount]
	);
	const previewRows = useMemo(
		() => (sheet ? getPreviewRows(sheet, previewRowCount) : []),
		[sheet, previewRowCount]
	);
	const totalRows = useMemo(() => sheet?.totalRows ?? 0, [sheet]);
	const validation = useMemo(
		() => ctx.validationResult,
		[ctx.validationResult]
	);
	const showRightPanel = useMemo(
		() => ctx.config.selectors !== "top",
		[ctx.config.selectors]
	);

	function handleImport() {
		ctx.performImport();
	}

	return (
		<>
			{previewRows.length > 0 && <StatusBar />}
			<div className="wx-layout wx-aacTJ5Dp">
				<div className="wx-body wx-aacTJ5Dp">
					<div className="wx-table-area wx-aacTJ5Dp">
						<ColumnTable />
					</div>
					{previewRows.length > 0 && showRightPanel && <FieldsPanel />}
				</div>
				<div className="wx-footer wx-aacTJ5Dp">
					<span className="wx-footer-info wx-aacTJ5Dp">
						{_("Showing")} {previewRows.length} {_("of")} {totalRows}{" "}
						{_("rows")}
					</span>
					<Button
						type="primary"
						disabled={!validation.valid || previewRows.length === 0}
						onClick={handleImport}
					>
						{validation.valid
							? `${_("Import")} ${totalRows} ${_("rows")}`
							: _("Import")}
					</Button>
				</div>
			</div>
		</>
	);
}

export default MappingLayout;
