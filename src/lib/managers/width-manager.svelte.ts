export interface ColumnConfig {
	minWidth: number;
	fr: number;
}

interface DragState {
	startX: number;
	startLeftWidth: number;
	totalWidth: number;
}

export class WidthManager {
	readonly columns: [ColumnConfig, ColumnConfig];
	private drag: DragState | null = $state(null);

	measuredWidths: [number, number] = $state([0, 0]);
	ratio: number = $state(0.5);

	constructor(columns: [ColumnConfig, ColumnConfig]) {
		this.columns = columns;
		this.ratio = columns[0].fr / (columns[0].fr + columns[1].fr);
	}

	get isResizing() {
		return this.drag !== null;
	}

	get gridTemplateColumns() {
		const [left, right] = this.columns;
		return `minmax(${left.minWidth}px, ${this.ratio}fr) min-content minmax(${right.minWidth}px, ${1 - this.ratio}fr)`;
	}

	startResize(event: PointerEvent) {
		const [leftWidth, rightWidth] = this.measuredWidths;

		this.drag = {
			startX: event.clientX,
			startLeftWidth: leftWidth,
			totalWidth: leftWidth + rightWidth
		};
	}

	handleWidthResize(event: PointerEvent) {
		if (!this.drag) {
			return;
		}

		const { startX, startLeftWidth, totalWidth } = this.drag;
		if (totalWidth <= 0) {
			return;
		}

		const [left, right] = this.columns;
		const newLeftWidth = Math.min(
			Math.max(startLeftWidth + event.clientX - startX, left.minWidth),
			totalWidth - right.minWidth
		);

		this.ratio = newLeftWidth / totalWidth;
	}

	endResize() {
		this.drag = null;
	}
}
