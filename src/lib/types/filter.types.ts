export interface FilterItem {
	label: string | undefined;
	value: string | undefined;
	disabled?: boolean;
}

export type SelectedFilterItem = FilterItem | null;
