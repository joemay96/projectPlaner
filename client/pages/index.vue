<script setup lang="ts">
const projects = [
	{
		id: '1',
		title: 'Project Planer',
		description: 'This is the long description of the project. Sit amet anim minim pariatur labore non nulla minim. Quis do laboris id irure reprehenderit aute cupidatat adipisicing occaecat ut aliqua pariatur laboris aute. Laborum aliqua veniam qui pariatur aliqua cillum quis fugiat do duis cupidatat. Sint adipisicing cillum duis eiusmod reprehenderit id laboris est magna id nulla eu incididunt. Pariatur aute dolore officia ea dolor ipsum consectetur anim est velit.',
		motivation: 'I just want to code a small project for fun and want to use my newly developed skills',
		workEstimation: "medium (a few weeks)",
		techStack: ['Nuxt', "Golang", "Turso", "DaisyUi"],
		tags: ["webdev", "try new tech", "small project"]
	},
	{
		id: '2',
		title: 'Chess Engine',
		description: 'The chess engine should be super simple but effective. Their is the possibility to change playstiles. The engine shoudl be able to develop a playstyle and change them throughout the game to be able to abapt to different playstyles. The first approach is to create a brute force engine but with a bigger NN. It can be not as fast as current engines but the NN NN eval should be better than from current engines.',
		motivation: 'Bring my skills to the next level and also using my algorithm engeneering skill. Having the motivation to learn C++ to use in this engine.',
		workEstimation: "very long (could take years)",
		techStack: ['C++', "Python", "Tensorflow"],
		tags: ["If i have a lot of time", "Learn new skills", "Big project"]
	},
	{
		id: '3',
		title: 'Neat Network',
		description: 'The creation of a python library for evolutionary algorithms. The implementation should be in C++ and also i want to have parallelization on the graphics card on board. At the begining the simple algos like genetic algorithms should be implemented. Later on the other algorithms can also be implemented.',
		motivation: 'I want to implement the learned evo alg algorithms and i want to use my GPU programming "skills"',
		workEstimation: 'long (should take months to finish)',
		techStack: ['Python', "C++", "Visualization"],
		tags: ["C++", "Python", "Machine Learning", "Evolutionary Algorithms"]
	},
]
</script>

<template>
	<div class="flex justify-center">
		<h1 class="text-4xl text-secondary font-extrabold pb-8">Dashboard</h1>
	</div>
	<div class="grid grid-rows-2 grid-flow-col gap-4 px-20 flex-1 justify-around">
		<template v-for="p in projects" key="p.id">
			<!-- @ts-ignore -->
			<ProjectCard :id="p.id" :title="p.title" :description="p.description" :motivation="p.motivation" :workEstimation="p.workEstimation" :techStack="p.techStack" :tags="p.tags" />
		</template>
	</div>
	<div class="mb-20"></div>
</template>