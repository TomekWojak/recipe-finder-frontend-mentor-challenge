import { initNavbar } from "./navbar.min.js";
import { createRecipe, createRecipeArticle } from "./recipes.min.js";

document.addEventListener("DOMContentLoaded", function () {
	const desktopLinks = document.querySelectorAll(".nav__links-desktop-li");
	const headerToggler = document.querySelector(".header__toggler");
	const mobileNav = document.querySelector(".nav__links-mobile");

	const filterControls = document.querySelector(".recipes-section__controls");
	const allSelections = document.querySelectorAll(".recipes-section__select");
	const maxCookSelect = document.querySelector(".max-cook-time-select");
	const maxPrepSelect = document.querySelector(".max-prep-time-select");
	const filterPrepTimeBtn = document.querySelector(".max-prep-time-btn");
	const filterCookTimeBtn = document.querySelector(".max-cook-time-btn");
	const btns = [filterCookTimeBtn, filterPrepTimeBtn];
	const selectLabels = document.querySelectorAll(".recipes-section__label");
	const selectClearBtns = document.querySelectorAll(".clear");
	const recipesBox = document.querySelector(".recipes-section__recipes-box");
	const RECIPES_DATA = "/data.json";

	const searchEngine = document.querySelector(
		".recipes-section__search-engine"
	);

	const articleContent = document.querySelector(".recipe-article__content");

	initNavbar(desktopLinks, headerToggler, mobileNav);

	let isRendered;
	const handlePages = (e) => {
		const element = e.target.closest("[data-page]");

		if (!element) return;
		const allPages = document.querySelectorAll(".page[data-section]");

		const btnData = element.dataset.page;
		const pageToShow = document.querySelector(
			`.page[data-section="${btnData}"]`
		);

		if (btnData === "recipes") {
			renderRecipes();
		}

		if (!pageToShow) return;

		allPages.forEach((page) => page.classList.remove("page-active"));
		pageToShow.classList.add("page-active");
		checkIfRecipeBtn(e);
	};

	// render pages
	const renderRecipes = async () => {
		if (isRendered) return;

		try {
			const response = await fetch(RECIPES_DATA);

			if (!response.ok) {
				console.error("Error, downloanding resources failed");
			}
			const data = await response.json();
			data.forEach((recipe) => {
				recipesBox.append(createRecipe(recipe));
			});

			recipesBox.addEventListener("click", (e) => {
				if (e.target.matches(".recipes-section__view-recipe")) {
					const recipeToShow = showArticle(e);
					data.forEach((recipe) => {
						createRecipeArticle(recipe, recipeToShow, articleContent);
					});
				}
			});
		} catch (error) {
			console.error("Error:", error);
		}

		isRendered = true;
	};
	const showArticle = (e) => {
		const btnName = e.target.dataset.pageName;
		const btnId = e.target.dataset.recipeId;

		const allPages = document.querySelectorAll(".page[data-section]");
		const pageToShow = document.querySelector(
			`.page[data-section="${btnName}"]`
		);

		if (!pageToShow) return;

		allPages.forEach((page) => page.classList.remove("page-active"));
		pageToShow.classList.add("page-active");

		return parseInt(btnId);
	};
	// handle filters
	let selectedPrepValue;
	let selectedCookValue;
	const filterRecipes = () => {
		const allRecipes = document.querySelectorAll(".recipes-section__recipe");
		const textValue = searchEngine.value.trim().toLowerCase();
		allRecipes.forEach((recipe) => {
			const title = recipe
				.querySelector(".recipes-section__recipe-title")
				.textContent.toLowerCase();
			const description = recipe
				.querySelector(".recipes-section__recipe-text")
				.textContent.toLowerCase();
			const prepTxt = recipe.querySelector(".recipes-section__recipe-prep");
			const cookTxt = recipe.querySelector(".recipes-section__recipe-cook");
			const prepTime = prepTxt?.dataset?.prepTime;
			const cookTime = cookTxt?.dataset?.cookTime;

			const matchesText =
				title.includes(textValue) || description.includes(textValue);
			const matchesPrep =
				selectedPrepValue != null ? prepTime === selectedPrepValue : true;
			const matchesCook =
				selectedCookValue != null ? cookTime === selectedCookValue : true;
			if (matchesText && matchesPrep && matchesCook) {
				recipe.classList.remove("hidden");
			} else {
				recipe.classList.add("hidden");
			}
		});
		checkIfNotValidFilter();
	};
	const checkIfRecipeBtn = (e) => {
		if (e.target.matches(".nav-btn")) {
			const btnId = e.target.dataset.page;
			const desktopLinks = document.querySelectorAll(".nav__links-desktop-li");

			desktopLinks.forEach((link) => {
				link.classList.remove("active");
				const linkData = link.dataset.page;
				if (linkData !== btnId) return;

				link.classList.add("active");
			});
		}
	};
	const uncheckInputs = (e) => {
		const select = e.target.closest(".recipes-section__select");
		const labels = select.querySelectorAll(".recipes-section__label");
		labels.forEach((label) => {
			const radioInput = label.previousElementSibling;
			radioInput.checked = false;
		});
	};
	let errorTxt;
	const checkIfNotValidFilter = () => {
		const recipes = document.querySelectorAll(
			".recipes-section__recipe:not(.hidden)"
		);

		if (errorTxt) errorTxt.remove();

		if (recipes?.length === 0) {
			errorTxt = document.createElement("p");
			recipesBox.classList.add("error-visible");
			errorTxt.textContent = "No matching filters";
			recipesBox.append(errorTxt);
		} else {
			recipesBox.classList.remove("error-visible");

			if (!errorTxt) return;

			errorTxt.remove();
		}
	};

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

	const handleKeyNavigation = (e) => {
		if (e.key === "Enter") {
			const input = e.target.previousElementSibling;
			input.checked = true;
			if (e.target.matches(".max-prep-time-label")) {
				selectedPrepValue = e.target.previousElementSibling.dataset.prepTime;
			} else if (e.target.matches(".max-prep-time-option.clear")) {
				selectedPrepValue = null;
				uncheckInputs(e);
			} else if (e.target.matches(".max-cook-time-label")) {
				selectedCookValue = e.target.previousElementSibling.dataset.cookTime;
			} else if (e.target.matches(".max-cook-time-option.clear")) {
				selectedCookValue = null;
				uncheckInputs(e);
			}
			filterRecipes();
		}
	};

	allSelections.forEach((selection) =>
		selection.addEventListener("click", (e) => {
			if (e.target.matches(".max-prep-time-label")) {
				selectedPrepValue = e.target.previousElementSibling.dataset.prepTime;
				filterRecipes();
			} else if (e.target.matches(".max-prep-time-option.clear")) {
				selectedPrepValue = null;
				filterRecipes();
				uncheckInputs(e);
			} else if (e.target.matches(".max-cook-time-label")) {
				selectedCookValue = e.target.previousElementSibling.dataset.cookTime;
				filterRecipes();
			} else if (e.target.matches(".max-cook-time-option.clear")) {
				selectedCookValue = null;
				filterRecipes();
				uncheckInputs(e);
			}
		})
	);
	const hideAllSelect = (hideSelection) => {
		btns.forEach((btn) => {
			btn.setAttribute("aria-expanded", "false");
			btn.classList.remove("active");
		});
		allSelections.forEach(hideSelection);
	};

	selectLabels.forEach((label) =>
		label.addEventListener("keydown", handleKeyNavigation)
	);
	selectClearBtns.forEach((clear) =>
		clear.addEventListener("keydown", handleKeyNavigation)
	);
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
			hideAllSelect(hideSelection);
		}
	});
	document.body.addEventListener("click", (e) => {
		handlePages(e);
	});
	searchEngine.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			hideAllSelect(hideSelection);
		}
	});
	searchEngine.addEventListener("input", filterRecipes);
	filterControls.addEventListener("click", handleFiltersSelections);
});
