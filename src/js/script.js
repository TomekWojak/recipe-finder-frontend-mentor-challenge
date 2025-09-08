import { initNavbar } from "./navbar.min.js";
import { createRecipe } from "./recipes.min.js";

document.addEventListener("DOMContentLoaded", function () {
	const filterControls = document.querySelector(".recipes-section__controls");
	const allSelections = document.querySelectorAll(".recipes-section__select");
	const maxCookSelect = document.querySelector(".max-cook-time-select");
	const maxPrepSelect = document.querySelector(".max-prep-time-select");
	const filterPrepTimeBtn = document.querySelector(".max-prep-time-btn");
	const filterCookTimeBtn = document.querySelector(".max-cook-time-btn");
	const btns = [filterCookTimeBtn, filterPrepTimeBtn];

	const recipesBox = document.querySelector(".recipes-section__recipes-box");
	const RECIPES_DATA = "/data.json";

	initNavbar();

	let isRendered;
	const handlePages = (e) => {
		const element = e.target.closest("[data-page]");

		if (!element) return;
		const allPages = document.querySelectorAll(".page[data-section]");

		const btnData = element.dataset.page;
		const pageToShow = document.querySelector(
			`.page[data-section="${btnData}"]`
		);
		
		if(btnData === 'recipes') {
			renderRecipes()
		}

		if (!pageToShow) return;

		allPages.forEach((page) => page.classList.remove("page-active"));
		pageToShow.classList.add("page-active");
	};

	// render pages
	const renderRecipes = () => {
		if (isRendered) return;

		fetch(RECIPES_DATA)
			.then((res) => res.json())
			.then((data) => {
				if (!data) return;

				data.forEach((recipe) => {
					recipesBox.append(createRecipe(recipe));
				});
			});
		isRendered = true;
	};
	// handle filters

	const handleFiltersSelections = (e) => {
		if (
			e.target.matches(".max-prep-time-btn") ||
			e.target.matches(".max-cook-time-btn")
		) {
			btns.forEach((btn) => {
				btn.setAttribute("aria-expanded", "false");
				btn.classList.remove("active");
			});
			const clickedBtn = e.target;
			const selection = clickedBtn.nextElementSibling;
			const btnId = clickedBtn.getAttribute("aria-controls");

			clickedBtn.setAttribute("aria-expanded", "true");
			clickedBtn.classList.add("active");

			allSelections.forEach((selection) => {
				const selectionId = selection.id;
				if (selectionId === btnId) return;

				selection.classList.remove("active");
			});

			showSelection(selection);
		}
	};
	const showSelection = (selection) => {
		selection.classList.toggle("active");
	};
	const hideSelection = (selection) => {
		selection.classList.remove("active");
	};

	window.addEventListener("click", (e) => {
		const isExpanded = btns.filter(
			(btn) => btn.getAttribute("aria-expanded") === "true"
		);

		if (
			isExpanded.length !== 0 &&
			e.target !== filterCookTimeBtn &&
			e.target !== filterPrepTimeBtn &&
			!maxCookSelect.contains(e.target) &&
			!maxPrepSelect.contains(e.target)
		) {
			btns.forEach((btn) => {
				btn.setAttribute("aria-expanded", "false");
				btn.classList.remove("active");
			});
			allSelections.forEach(hideSelection);
		}
	});
	document.body.addEventListener("click", (e) => {
		handlePages(e);
	});

	filterControls.addEventListener("click", handleFiltersSelections);
});
