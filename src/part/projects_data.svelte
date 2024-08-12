<script>
	import Button from "../components/Button.svelte";
import DataItem from "../components/DataItem.svelte";
import ImageCentered from "../components/ImageCentered.svelte";

</script>
<div class="relative mt-16">

    <div class="absolute flex flex-row w-screen justify-center gap-6 top-[-2rem]">
        <DataItem title="24" subtitle="projects" />
        <DataItem title="10+" subtitle="Years of experiences" /> 
    </div>

    <ImageCentered>
        <p class="font-bold text-4xl" >I'm searching for a <span class="text-purple">intership</span>
        <p class="px-2 text-second mb-2">I'm looking for a intership to continue my studies</p>
        <Button text="Get my resume" />
    </ImageCentered>

</div>