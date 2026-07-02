import { useMemo } from 'react';
import './ProgressIndicator.css';

function ProgressIndicator(props) {
	const { progress, message = 'Processing...' } = props;

	const clampedProgress = useMemo(
		() => Math.min(100, Math.max(0, progress)),
		[progress]
	);

	return (
		<div className="wx-progress wx-aacXKSYp">
			<div className="wx-progress-message wx-aacXKSYp">{message}</div>
			<div className="wx-progress-bar wx-aacXKSYp">
				<div
					className="wx-progress-fill wx-aacXKSYp"
					style={{ width: `${clampedProgress}%` }}
				></div>
			</div>
			<div className="wx-progress-percent wx-aacXKSYp">
				{Math.round(clampedProgress)}%
			</div>
		</div>
	);
}

export default ProgressIndicator;
