<script lang="ts">
	import LanguageIcon from "../components/languageIcon.svelte";

    const languages = [
        "c", "csharp", "elm", "java", "js", "php", "python", "rust", "ts", "react", "svelte", "c++", "mysql", "docker", "mongodb", "golang"
    ]
</script>

<div class="flex items-center justify-center gap-12">
    <div data-aos="fade-right" data-aos-duration="1000">
        <p class="font-extrabold text-3xl">Languages</p>
        <p class="max-w-96 max-w-96 font-bold text-neutral-300">I'm a very curious guy. Dusty or modern languages, I'm keen on new things.</p>
    </div>

    <div class="grid grid-cols-4 gap-5 icons" data-aos="fade-left" data-aos-duration="1000">
        {#each languages as language}
            <LanguageIcon src={`languages/${language}.png`} title={language.toLocaleUpperCase()}/>
        {/each}
    </div>
</div>