import { useContext, useMemo } from "react";
import { useWizardContext } from "../../context.jsx";
import { getAutoDetectionSummaryItems } from "@svar-ui/excel-import-store";
import { context } from "@svar-ui/react-core";
import "./StatusBar.css";

function formatMessage(message, values) {
	return message.replace(/\{(\w+)\}/g, (match, key) =>
		String(values[key] ?? match)
	);
}

function StatusBar() {
	const ctx = useWizardContext();
	const _ = useContext(context.i18n).getGroup("excel-import");

	const autoDetectionItems = useMemo(
		() => getAutoDetectionSummaryItems(ctx.autoDetections, ctx.config.fields),
		[ctx.autoDetections, ctx.config.fields]
	);
	const hasAutoDetections = useMemo(
		() => autoDetectionItems.length > 0,
		[autoDetectionItems]
	);
	const hasErrors = useMemo(
		() => ctx.validationResult.errors.length > 0,
		[ctx.validationResult.errors]
	);

	const autoDetectionMessage = useMemo(() => {
		if (!hasAutoDetections) return "";

		const items = autoDetectionItems
			.map(item =>
				formatMessage(_("Auto-detected item"), {
					field: item.fieldLabel,
					column: item.columnId,
				})
			)
			.join(", ");

		return formatMessage(_("Auto-detected mappings"), { items });
	}, [hasAutoDetections, autoDetectionItems, _]);

	const errorMessage = useMemo(
		() =>
			hasErrors
				? ctx.validationResult.errors.map(e => e.message).join(". ")
				: "",
		[hasErrors, ctx.validationResult.errors]
	);

	function handleClearAll() {
		ctx.clearAllMappings();
	}

	if (!hasAutoDetections && !hasErrors) return null;

	const statusClass = [
		"wx-status",
		hasAutoDetections && !hasErrors ? "wx-info" : "",
		hasErrors ? "wx-warning" : "",
		"wx-aad20EKW",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={statusClass} role="alert">
			<div className="wx-status-content wx-aad20EKW">
				{hasErrors ? (
					<>
						<svg
							className="wx-status-icon wx-aad20EKW"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
						<span className="wx-status-message wx-aad20EKW">
							{errorMessage}
						</span>
					</>
				) : hasAutoDetections ? (
					<>
						<svg
							className="wx-status-icon wx-aad20EKW"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="16" x2="12" y2="12"></line>
							<line x1="12" y1="8" x2="12.01" y2="8"></line>
						</svg>
						<span className="wx-status-message wx-aad20EKW">
							{autoDetectionMessage}
						</span>
						<button
							type="button"
							className="wx-clear-link wx-aad20EKW"
							onClick={handleClearAll}
						>
							{_("Clear all")}
						</button>
					</>
				) : null}
			</div>
		</div>
	);
}

export default StatusBar;
