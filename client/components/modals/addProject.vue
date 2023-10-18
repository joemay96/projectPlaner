<script setup lang="ts">
const { $createSuccessAlert, $createErrorAlert, $client } = useNuxtApp();
// const workEstimation = [
// "Small (few days)",
// "Medium (few weeks)",
// "Long (few months)",
// "Very long (many months to years)"
// ]
const workEstimationValues: String[] = ['Small', 'Medium', 'Long', 'Very long'];

type project = {
    userid: String;
    title: String;
    description: string | number | string[] | undefined;
    motivation: string | number | string[] | undefined;
    workEstimation: String;
    techStack: Array<String>;
    tags: [String];
};

const user = $client.getUserLS();

let newProject: project = {
    userid: user.id,
    title: '',
    description: '',
    motivation: '',
    workEstimation: workEstimationValues[0],
    techStack: [''],
    tags: [''],
};

function resetProject() {
    newProject = {
        userid: user.id,
        title: '',
        description: '',
        motivation: '',
        workEstimation: workEstimationValues[0],
        techStack: [''],
        tags: [''],
    };
}

function techDataChange(techData: [String]) {
    try {
        // newProject.techStack = techData;
        const d = JSON.parse(JSON.stringify(techData));
        let a: Array<any> = [];
        d.forEach((o: any) => {
            a.push(o.id);
        });
        newProject.techStack = a;
    } catch (error) {
        console.log(error);
    }
}

function tagDataChange(tagData: [String]) {
    try {
        // newProject.techStack = tagData;
        const d = JSON.parse(JSON.stringify(tagData));
        newProject.tags = d.toString();
    } catch (error) {
        console.log(error);
    }
}

async function saveProject() {
    if (!newProject || newProject.title == '') {
        // TODO: emit error to user
        console.error("Title of the project can't be empty");
        return;
    }
    if (newProject.description == '') {
        console.error('Description can not be empty');
        return;
    }

    console.log(newProject);

    try {
        const res = await $client.createProject(newProject);
        // @ts-ignore
        add_project_modal.close();
        // TODO: send a refetch event to /, wenn man sich auf / befindet, sonst egal?
        // ich könnte eigentlich den ganzen Spaß auch in einem Store im Frontend halten und syncen.
        console.log(res);
        $createSuccessAlert('Project created');
        resetProject();
    } catch (error) {
        //TODO: response to user that error happend
        $createErrorAlert('Project not created');
        console.error(error);
    }
}
</script>

<template>
    <dialog id="add_project_modal" class="modal">
        <div class="modal-box w-11/12 max-w-4xl">
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </form>
            <h3 class="font-bold text-xl">
                New Project
                <div
                    class="tooltip tooltip-bottom tooltip-primary"
                    data-tip="
		Here you can create a new Project. At least the title and the description are necessary for information.
		"
                >
                    <Icon name="fluent:info-48-regular" color="black" />
                </div>
            </h3>
            <p class="pt-4">Create a new project</p>
            <div class="modal-action">
                <!-- <form method="dialog" class="modal-backdrop"> -->
                <div class="w-full flex flex-col">
                    <div class="form-control w-full max-w-4xl">
                        <label class="label">
                            <span class="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            class="input input-bordered w-full max-w-4xl"
                            v-model="newProject.title"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Desription</span>
                        </label>
                        <textarea
                            class="textarea textarea-bordered h-24"
                            placeholder="A desription fo your project"
                            v-model="newProject.description"
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Motivation*</span>
                        </label>
                        <textarea
                            class="textarea textarea-bordered h-16"
                            placeholder="Say what motivates you for this project."
                            v-model="newProject.motivation"
                        ></textarea>
                    </div>
                    <div class="form-control w-full max-w-4xl">
                        <label class="label">
                            <span class="label-text">Work estimation*</span>
                        </label>
                        <select
                            class="select select-bordered"
                            v-model="newProject.workEstimation"
                        >
                            <option disabled selected>Pick one</option>
                            <template
                                v-for="(w, index) in workEstimationValues"
                                :key="index"
                            >
                                <option>{{ w }}</option>
                            </template>
                        </select>
                    </div>
                    <UtilsTechSelect @techSelectChange="techDataChange" />
                    <UtilsTagCreation @tagChange="tagDataChange" />
                    <!-- <div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" />
			</div>  -->
                    <button
                        class="btn btn-success max-w-4xl"
                        @click="saveProject()"
                    >
                        Save
                    </button>
                </div>
                <!-- </form> -->
            </div>
        </div>
    </dialog>
</template>
