<script>
	import Button from "../components/Button.svelte";

</script>
<div class="flex flex-row justify-center">

    <div class="flex flex-col gap-4 justify-center">
        <p class="text-purple text-3xl" data-aos="fade-left" data-aos-duration="800">Hello</p>
        <p class="font-extrabold text-7xl max-w-xl">I'm a <span class="text-purple">Fullstack developper</span> based at Reims</p>
        <div class="flex flex-row gap-4" data-aos="fade-right" data-aos-duration="700">
            <Button text="Contact me" />
            <Button text="Resume" inverted/>
        </div>
    </div>
    <img src="file.png" height="h-screen" />
</div>