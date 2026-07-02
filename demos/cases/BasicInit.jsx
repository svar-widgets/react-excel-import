import { useState } from "react";
import { Button } from "@svar-ui/react-core";
import { ExcelImport } from "../../src/index.js";

export default function BasicExcelImport() {
	const [isVisible, setIsVisible] = useState(false);

	const config = {
		fields: [
			{ id: "name", label: "Name" },
			{ id: "email", label: "Email" },
		],
		onImport: (data, result) => console.log("Imported:", data, result),
		onClose: () => setIsVisible(false),
		autoClose: true,
	};

	return (
		<div className="demo-box">
			<Button
				type="primary"
				onClick={() => setIsVisible((v) => !v)}
			>
				Click me to open
			</Button>
			{isVisible && <ExcelImport {...config} />}
		</div>
	);
}
