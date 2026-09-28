<script>
	import HeroSection from '$sections/HeroSection.svelte';
	import WorkExperienceSection from '$sections/WorkExperienceSection.svelte';
	import ProjectsSection from '$sections/ProjectsSection.svelte';
	import PlaygroundSection from '$sections/PlaygroundSection.svelte';
	import AlsoMeSection from '$sections/AlsoMeSection.svelte';
</script>

<div class="home-page">
	<HeroSection />
	<ProjectsSection />
	<WorkExperienceSection />
	<PlaygroundSection />
	<AlsoMeSection />
</div>

<style>
	.home-page {
		--pad-x: clamp(1.25rem, 3vw, 2.5rem);
		--pad-y: 40px;
	}
</style>
