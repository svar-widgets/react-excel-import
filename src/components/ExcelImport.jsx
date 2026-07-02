import { Locale } from "@svar-ui/react-core";
import { en } from "@svar-ui/excel-import-locales";
import { WizardProvider } from "../context.jsx";
import ModalOverlay from "./ui/ModalOverlay.jsx";
import Layout from "./Layout.jsx";

function ExcelImportWizard(props) {
	return (
		<Locale words={en} optional={true}>
			<WizardProvider config={props}>
				<ModalOverlay onClose={props.onClose}>
					<Layout />
				</ModalOverlay>
			</WizardProvider>
		</Locale>
	);
}

export default ExcelImportWizard;
