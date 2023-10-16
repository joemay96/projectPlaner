<script setup lang="ts">
import client from '~/plugins/auth/client';
const { $createSuccessAlert, $createErrorAlert } = useNuxtApp();
// const workEstimation = [
// "Small (few days)",
// "Medium (few weeks)",
// "Long (few months)",
// "Very long (many months to years)"
// ]

const props = defineProps({
    id: String,
    userid: String,
    title: String,
    description: String,
    motivation: String,
    workEstimation: String,
    techStack: Array<String>,
    tags: Array<String>,
    // tags: String,
});

const {
    id,
    userid,
    title,
    description,
    motivation,
    workEstimation,
    techStack,
    tags,
} = props;

const updateProject = {
    id,
    userid,
    title,
    description,
    motivation,
    workEstimation,
    techStack: techStack,
    tags,
};

const workEstimationValues: String[] = ['Small', 'Medium', 'Long', 'Very long'];

function techDataChange(techData: [String]) {
    try {
        // newProject.techStack = techData;
        const d = JSON.parse(JSON.stringify(techData));
        let a: string[] = [];
        d.forEach((o: any) => {
            a.push(o.id);
        });
        updateProject.techStack = a;
    } catch (error) {
        console.log(error);
    }
}

function tagDataChange(tagData: [String]) {
    try {
        const d = JSON.parse(JSON.stringify(tagData));
        updateProject.tags = d.toString();
    } catch (error) {
        console.log(error);
    }
}

async function editProject() {
    if (!updateProject || updateProject.title == '') {
        // TODO: emit error to user
        console.error("Title of the project can't be empty");
        return;
    }
    if (updateProject.description == '') {
        console.error('Description can not be empty');
        return;
    }

    console.log(updateProject);

    try {
        const res = await client.updateProjectById(
            updateProject,
            updateProject.id,
        );
        // @ts-ignore
        edit_project_modal.close();
        // TODO: send a refetch event to /, wenn man sich auf / befindet, sonst egal?
        // ich könnte eigentlich den ganzen Spaß auch in einem Store im Frontend halten und syncen.
        console.log(res);
        $createSuccessAlert('Project updated');
    } catch (error) {
        //TODO: response to user that error happend
        $createErrorAlert('Project not updated');
        console.error(error);
    }
}
</script>

<template>
    <dialog id="edit_project_modal" class="modal">
        <div class="modal-box w-11/12 max-w-4xl">
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </form>
            <h3 class="font-bold text-xl">Edit Project {{ title }}</h3>
            <p class="pt-4">Update an existing project</p>
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
                            v-model="updateProject.title"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Desription</span>
                        </label>
                        <textarea
                            class="textarea textarea-bordered h-24"
                            placeholder="A desription fo your project"
                            v-model="updateProject.description"
                        ></textarea>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Motivation*</span>
                        </label>
                        <textarea
                            class="textarea textarea-bordered h-16"
                            placeholder="Say what motivates you for this project."
                            v-model="updateProject.motivation"
                        ></textarea>
                    </div>
                    <div class="form-control w-full max-w-4xl">
                        <label class="label">
                            <span class="label-text">Work estimation*</span>
                        </label>
                        <select
                            class="select select-bordered"
                            v-model="updateProject.workEstimation"
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
                    <!-- TODO: they need the values given to them from before -->
                    <UtilsTechSelect @techSelectChange="techDataChange" />
                    <UtilsTagCreation @tagChange="tagDataChange" :tags="tags" />
                    <!-- <div class="form-control">
				<label class="label pb-0">
					<span class="label-text">Photo</span>
				</label>
				<input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs my-4" />
			</div>  -->
                    <button
                        class="btn btn-success max-w-4xl"
                        @click="editProject()"
                    >
                        Save
                    </button>
                </div>
                <!-- </form> -->
            </div>
        </div>
    </dialog>
</template>
