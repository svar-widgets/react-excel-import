import { useMemo } from "react";
import { useWizardContext } from "../../context.jsx";
import { Tabs } from "@svar-ui/react-core";
import "./SheetTabs.css";

function SheetTabs() {
	const ctx = useWizardContext();

	const sheets = useMemo(
		() =>
			(ctx.parsedData?.sheets ?? []).map(sheet => ({
				label: sheet.name,
				id: sheet.name,
			})),
		[ctx.parsedData]
	);

	const activeSheet = useMemo(
		() => ctx.activeSheet || sheets[0]?.id,
		[ctx.activeSheet, sheets]
	);

	function handleTabClick(ev) {
		ctx.selectSheet(ev.value);
	}

	if (sheets.length <= 1) return null;

	return (
		<div className="wx-tabs wx-aaeJ4V8w" role="tablist">
			<Tabs
				options={sheets}
				value={activeSheet}
				onChange={handleTabClick}
				type="top"
			/>
		</div>
	);
}

export default SheetTabs;
