import { useContext } from "react";
import { useWizardContext } from "../../context.jsx";
import { context } from "@svar-ui/react-core";
import ProgressIndicator from "../ui/ProgressIndicator.jsx";
import "./StageProcessing.css";

function StageProcessing() {
	const ctx = useWizardContext();
	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	return (
		<div className="wx-processing wx-aaaHAhSp">
			<ProgressIndicator
				progress={ctx.processingProgress}
				message={_("Parsing Excel file...")}
			/>

			{ctx.file && <p className="wx-filename wx-aaaHAhSp">{ctx.file.name}</p>}
		</div>
	);
}

export default StageProcessing;
