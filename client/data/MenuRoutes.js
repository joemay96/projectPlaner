export const menuLinks = [
	{
		name: "Create new project",
		type: "modal",
		onclick: "add_project_modal.showModal()"
	},
	{
		name: "Dashboard",
		type: "link",
		url: "/",
	},
	{
		name: "Techstack",
		type: "link",
		url: "/tech",
	},
	{
		name: "Add Tech",
		type: "modal",
		onclick: "add_tech_modal.showModal()"
	},
	{
		name: "Settings",
		type: "link",
		url: "/settings"
	}
]