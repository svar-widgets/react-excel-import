import { useEffect, useRef } from "react";
import { draggable } from "../../directives/drag.js";
import "./ModalOverlay.css";

const scope = "wx-aadoCGFM";

function ModalOverlay(props) {
	const {
		closeOnBackdrop = false,
		closeOnEscape = true,
		isDraggable = true,
		children,
		onClose,
	} = props;

	const dialogRef = useRef(null);
	const draggableRef = useRef(null);

	function handleClose() {
		onClose?.();
	}

	function handleBackdropClick(e) {
		if (closeOnBackdrop && e.target === dialogRef.current) {
			handleClose();
		}
	}

	function handleKeydown(e) {
		if (closeOnEscape && e.key === "Escape") {
			e.preventDefault();
			handleClose();
		}
	}

	useEffect(() => {
		const el = dialogRef.current;
		if (!el) return;

		el.showModal();
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	useEffect(() => {
		const el = draggableRef.current;
		if (!el || !isDraggable) return;

		const action = draggable(el, {
			handle: ".wx-header",
			bounds: true,
		});

		return () => {
			action.destroy();
		};
	}, [isDraggable]);

	return (
		<dialog
			ref={dialogRef}
			className={`wx-modal ${scope}`}
			onClick={handleBackdropClick}
			onKeyDown={handleKeydown}
			onCancel={e => {
				e.preventDefault();
				handleClose();
			}}
		>
			{isDraggable ? (
				<div
					ref={draggableRef}
					className={`wx-modal-content ${scope}`}
					role="dialog"
				>
					{children}
				</div>
			) : (
				<div className={`wx-modal-content ${scope}`} role="dialog">
					{children}
				</div>
			)}
		</dialog>
	);
}

export default ModalOverlay;
