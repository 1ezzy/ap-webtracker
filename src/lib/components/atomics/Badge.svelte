<script lang="ts">
	const { label, value, color } = $props();
</script>

<div
	class="flex flex-row items-center gap-4 rounded-full px-4 py-1"
	class:text-black={color === 'primary' || color === 'tertiary' || color === 'accent'}
	class:text-white={color === 'secondary'}
	class:bg-primary={color === 'primary'}
	class:bg-secondary={color === 'secondary'}
	class:bg-tertiary={color === 'tertiary'}
	class:bg-accent={color === 'accent'}
>
	<span class="text-fluid-sm">{label}</span>
	<span class="text-fluid-xs">{value}</span>
</div>
