import { useContext } from "react";
import { useWizardContext } from "../../context.jsx";
import DropZone from "../ui/DropZone.jsx";
import { parseExcelFile } from "@svar-ui/excel-import-store";
import { context } from "@svar-ui/react-core";

import "./StageUpload.css";

function StageUpload() {
	const ctx = useWizardContext();
	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	async function handleFile(file) {
		ctx.setFile(file);
		ctx.setStage("processing");
		ctx.setError(null);

		try {
			const data = await parseExcelFile(
				file,
				progress => {
					ctx.setProcessingProgress(progress);
				},
				ctx.config.headerRow === false
			);

			ctx.loadData(data);
			ctx.setStage("mapping");
		} catch (e) {
			ctx.setError(
				e instanceof Error ? e.message : _("Failed to parse file")
			);
			ctx.setStage("upload");
		}
	}

	return (
		<div className="wx-upload wx-aadU39Rv">
			<DropZone
				accept={ctx.config.accept ?? ".xlsx,.csv,.tsv"}
				onFile={handleFile}
			/>

			{ctx.error && (
				<div className="wx-error wx-aadU39Rv">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
					<span>{ctx.error}</span>
				</div>
			)}
		</div>
	);
}

export default StageUpload;
