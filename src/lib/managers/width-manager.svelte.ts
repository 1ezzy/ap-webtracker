export interface ColumnConfig {
	fr: number;
	minRem: number;
	maxShare: number;
}

interface DragState {
	startX: number;
	startLeftWidth: number;
	totalWidth: number;
	minLeftWidth: number;
	minRightWidth: number;
}

export class WidthManager {
	readonly columns: [ColumnConfig, ColumnConfig];
	private drag: DragState | null = $state(null);

	containerWidth: number = $state(0);
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
		return `${this.columnTrack(left, this.ratio)} min-content ${this.columnTrack(right, 1 - this.ratio)}`;
	}

	private columnTrack(column: ColumnConfig, fr: number) {
		return `minmax(min(${column.minRem}rem, ${column.maxShare * 100}%), ${fr}fr)`;
	}

	private minWidthPx(column: ColumnConfig, rootFontSize: number) {
		return Math.min(column.minRem * rootFontSize, column.maxShare * this.containerWidth);
	}

	startResize(event: PointerEvent) {
		const [left, right] = this.columns;
		const [leftWidth, rightWidth] = this.measuredWidths;
		const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

		this.drag = {
			startX: event.clientX,
			startLeftWidth: leftWidth,
			totalWidth: leftWidth + rightWidth,
			minLeftWidth: this.minWidthPx(left, rootFontSize),
			minRightWidth: this.minWidthPx(right, rootFontSize)
		};
	}

	handleWidthResize(event: PointerEvent) {
		if (!this.drag) {
			return;
		}

		const { startX, startLeftWidth, totalWidth, minLeftWidth, minRightWidth } = this.drag;
		if (totalWidth <= 0) {
			return;
		}

		const newLeftWidth = Math.min(
			Math.max(startLeftWidth + event.clientX - startX, minLeftWidth),
			totalWidth - minRightWidth
		);

		this.ratio = newLeftWidth / totalWidth;
	}

	endResize() {
		this.drag = null;
	}
}
