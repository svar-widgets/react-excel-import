import { useContext } from "react";
import { context } from "@svar-ui/react-core";
import { useWizardContext } from "../context.jsx";
import "./ImportHeader.css";

function ImportHeader(props) {
	const { title = null } = props;

	const ctx = useWizardContext();
	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	function handleClose() {
		ctx.close();
	}

	return (
		<header className="wx-header wx-aaaZE7Ok">
			<h2 className="wx-title wx-aaaZE7Ok">{title || _("Import from Excel")}</h2>
			<button
				type="button"
				className="wx-close wx-aaaZE7Ok"
				aria-label={_("Close wizard")}
				onClick={handleClose}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</header>
	);
}

export default ImportHeader;
