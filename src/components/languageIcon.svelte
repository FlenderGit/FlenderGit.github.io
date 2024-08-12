<script lang="ts">
    export let title: string;
    export let src: string;
    const size = 70;
</script>

<div class="p-3 bg-grey rounded-lg h-24 w-24 flex items-center justify-center cursor-pointer hover:bg-neutral-700 transition-colors duration-300">
    <img {src} {title} class="max-h-full"/>
</div>
