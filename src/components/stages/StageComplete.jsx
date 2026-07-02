import { useContext, useMemo } from "react";
import { useWizardContext } from "../../context.jsx";
import { Button, context } from "@svar-ui/react-core";
import "./StageComplete.css";

function StageComplete() {
	const ctx = useWizardContext();
	const _ = useContext(context.i18n).getGroup("excel-import");

	const result = useMemo(() => ctx.importResult, [ctx.importResult]);

	function handleClose() {
		ctx.close();
	}

	return (
		<div className="wx-complete wx-aacGdy31">
			<div className="wx-card wx-aacGdy31">
				<div className="wx-success wx-aacGdy31">
					<div className="wx-success-icon wx-aacGdy31">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</div>

					<div className="wx-text wx-aacGdy31">
						<p className="wx-title wx-aacGdy31">{_("Success!")}</p>

						{result && (
							<div className="wx-paragraph wx-aacGdy31">
								<p className="wx-subtitle wx-aacGdy31">{_("Successfully imported")}</p>
								<p className="wx-count wx-aacGdy31">
									{result.imported.toLocaleString()}{" "}
									{_("rows")}
								</p>
							</div>
						)}

						{result && result.skipped > 0 && (
							<p className="wx-skipped wx-aacGdy31">
								{result.skipped}{" "}
								{_("rows skipped")}
							</p>
						)}
					</div>
				</div>

				{result && result.errors.length > 0 && (
					<details className="wx-error-details wx-aacGdy31">
						<summary>{_("View skipped rows")}</summary>
						<ul className="wx-error-list wx-aacGdy31">
							{result.errors.slice(0, 10).map((error, i) => (
								<li key={i}>
									{_("Row")} {error.row}: {error.reason}
								</li>
							))}
							{result.errors.length > 10 && (
								<li className="wx-more wx-aacGdy31">
									...{_("and")}{" "}
									{result.errors.length - 10}{" "}
									{_("more")}
								</li>
							)}
						</ul>
					</details>
				)}

				<Button type="primary" onClick={handleClose}>
					{_("View imported data")}
				</Button>
			</div>
		</div>
	);
}

export default StageComplete;
