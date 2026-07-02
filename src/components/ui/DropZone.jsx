import { useState, useRef, useContext } from "react";
import { context } from "@svar-ui/react-core";

import "./DropZone.css";

function DropZone(props) {
	const {
		accept = ".xlsx,.csv,.tsv",
		disabled = false,
		onFile,
	} = props;

	const locale = useContext(context.i18n);
	const _ = locale.getGroup("excel-import");

	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef(null);
	const dragCounterRef = useRef(0);

	function handleDragEnter(e) {
		e.preventDefault();
		if (!disabled) {
			dragCounterRef.current++;
			setIsDragging(true);
		}
	}

	function handleDragLeave(e) {
		e.preventDefault();
		dragCounterRef.current--;
		if (dragCounterRef.current <= 0) {
			dragCounterRef.current = 0;
			setIsDragging(false);
		}
	}

	function handleDragOver(e) {
		e.preventDefault();
	}

	function handleDrop(e) {
		e.preventDefault();
		dragCounterRef.current = 0;
		setIsDragging(false);

		if (disabled) return;

		const file = e.dataTransfer?.files[0];
		if (file && isValidFile(file)) {
			onFile?.(file);
		}
	}

	function handleFileSelect(e) {
		const target = e.target;
		const file = target.files?.[0];
		if (file) {
			onFile?.(file);
		}
		target.value = "";
	}

	function handleClick() {
		if (!disabled) {
			fileInputRef.current?.click();
		}
	}

	function handleKeydown(e) {
		if ((e.key === "Enter" || e.key === " ") && !disabled) {
			e.preventDefault();
			fileInputRef.current?.click();
		}
	}

	function isValidFile(file) {
		if (!accept) return true;
		const extensions = accept
			.split(",")
			.map(ext => ext.trim().toLowerCase());
		const fileName = file.name.toLowerCase();
		return extensions.some(ext => fileName.endsWith(ext));
	}

	const className = [
		"wx-dropzone",
		isDragging ? "wx-dragging" : "",
		disabled ? "wx-disabled" : "",
		"wx-aacs4HKU",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			className={className}
			role="button"
			tabIndex={disabled ? -1 : 0}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleClick}
			onKeyDown={handleKeydown}
		>
			<input
				ref={fileInputRef}
				type="file"
				accept={accept}
				disabled={disabled}
				onChange={handleFileSelect}
				className="wx-file-input wx-aacs4HKU"
			/>

			<div className="wx-dropzone-icon-wrap wx-aacs4HKU">
				<svg
					className="wx-dropzone-icon wx-aacs4HKU"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="17 8 12 3 7 8" />
					<line x1="12" y1="3" x2="12" y2="15" />
				</svg>
			</div>

			<div className="wx-dropzone-text wx-aacs4HKU">
				<p className="wx-dropzone-line wx-aacs4HKU">
					<span className="wx-dropzone-link wx-aacs4HKU">{_("Click to upload")}</span>
					<span className="wx-dropzone-rest wx-aacs4HKU">{_("or drag and drop your file")}</span>
				</p>
				<p className="wx-dropzone-hint wx-aacs4HKU">
					{_("Excel files (.xlsx) or CSV")}
				</p>
			</div>
		</div>
	);
}

export default DropZone;
