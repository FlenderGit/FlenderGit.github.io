<script lang="ts">
	export let text: string;
	export let inverted: boolean = false;

    const bg = inverted ? "bg-white" : "bg-purple";
    const text_color = inverted ? "text-purple" : "text-white";

</script>

<button
	class="font-bold
        py-2
        px-4
        rounded-lg
        transition-colors
        duration-300
        hover:bg-opacity-80
        hover:text-opacity-80
        rounded-full
        {bg}
        {text_color}
        "

>
	{text}
</button>
