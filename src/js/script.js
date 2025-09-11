import { initNavbar } from "./navbar.min.js";
import {
	createRecipe,
	createRecipeArticle,
	createRestRecipes,
	createElement,
} from "./recipes.min.js";
document.addEventListener("DOMContentLoaded", function () {
	const desktopLinks = document.querySelectorAll(".nav__links-desktop-li");
	const headerToggler = document.querySelector(".header__toggler");
	const mobileNav = document.querySelector(".nav__links-mobile");
	const footer = document.querySelector(".footer");

	const filterControls = document.querySelector(".recipes-section__controls");
	const allSelections = document.querySelectorAll(".recipes-section__select");
	const maxCookSelect = document.querySelector(".max-cook-time-select");
	const maxPrepSelect = document.querySelector(".max-prep-time-select");
	const filterPrepTimeBtn = document.querySelector(".max-prep-time-btn");
	const filterCookTimeBtn = document.querySelector(".max-cook-time-btn");
	const btns = [filterCookTimeBtn, filterPrepTimeBtn];
	const selectLabels = document.querySelectorAll(".recipes-section__label");
	const selectClearBtns = document.querySelectorAll(".clear");
	const allPages = document.querySelectorAll(".page[data-section]");
	const recipesBox = document.querySelector(".recipes-section__recipes-box");
	const navLinksDesktop = document.querySelector(".nav__links-desktop");

	const recipesLoadingBox = recipesBox.querySelector(".loading-box");

	const recipeArtcle = document.querySelector(".recipe-article");
	const articleLoadingBox = recipeArtcle.querySelector(".loading-box");

	const restRecipesAmount = 3;

	const RECIPES_DATA = "/data.json";

	const searchEngine = document.querySelector(
		".recipes-section__search-engine"
	);

	const articleContent = document.querySelector(".recipe-article__content");

	initNavbar(desktopLinks, headerToggler, mobileNav);

	const params = new URLSearchParams(window.location.search);

	const handlePagesAndLinks = (urlParam) => {
		const pageToShow = document.querySelector(
			`.page[data-section="${urlParam}"]`
		);
		allPages.forEach((page) => page.classList.remove("page-active"));
		pageToShow.classList.add("page-active");

		handleDesktopLinks(urlParam);
	};

	// render pages
	const renderRecipes = async () => {
		showLoader(recipesLoadingBox);
		try {
			const response = await fetch(RECIPES_DATA);

			if (!response.ok) {
				console.error("Error, downloanding resources failed");
			}
			const data = await response.json();
			data.forEach((recipe) => {
				recipesBox.append(createRecipe(recipe));
			});
		} catch (error) {
			console.error("Error:", error);
		} finally {
			hideLoader(recipesLoadingBox);
		}
	};
	const hideLoader = (loader) => {
		loader.classList.add("hidden");
	};
	const showLoader = (loader) => {
		loader.classList.remove("hidden");
	};
	const handleDesktopLinks = (urlParam) => {
		desktopLinks.forEach((link) => link.classList.remove("active"));
		const activeLink = navLinksDesktop.querySelector(
			`[data-page='${urlParam}']`
		);
		activeLink.classList.add("active");
	};
	const loadPage = async () => {
		const pageName = window.location.search.startsWith("?")
			? window.location.search.slice(1)
			: null;

		if (window.location.search.includes("recipeId=")) {
			showLoader(articleLoadingBox);
			const recipeId = new URLSearchParams(params).get("recipeId");

			articleContent.parentElement.classList.add("page-active");
			allPages.forEach((page) => page.classList.remove("page-active"));
			desktopLinks.forEach((link) => link.classList.remove("active"));

			try {
				const response = await fetch(RECIPES_DATA);

				if (!response.ok) {
					console.error("Error, downloading resources failed");
				}

				const data = await response.json();
				let restRecipes;

				data.forEach((recipe) => {
					createRecipeArticle(recipe, recipeId, articleContent);
					restRecipes = createRestRecipes(recipe, recipeId);
				});

				articleContent.append(createRestRecipesBox(restRecipes));
				footer.style.borderTop = "1px solid rgb(208, 220, 217)";
			} catch (error) {
				console.error("Error:", error);
			} finally {
				hideLoader(articleLoadingBox);
			}
		} else if (pageName) {
			handlePagesAndLinks(pageName);
			footer.style.border = "none";

			if (pageName === "recipes") {
				renderRecipes();
				footer.style.borderTop = "1px solid rgb(208, 220, 217)";
			}
		} else {
			navLinksDesktop
				.querySelector("[data-page='home']")
				.classList.add("active");
			handlePagesAndLinks("home");
			footer.style.border = "none";
		}

		footer.classList.add("page-active");
	};
	loadPage();

	const showRestRecipes = (restRecipesArr, parentBox) => {
		const usedIndexes = new Set();

		for (let i = 0; i < restRecipesAmount; i++) {
			let index;
			do {
				index = Math.floor(Math.random() * restRecipesArr.length);
			} while (usedIndexes.has(index));

			usedIndexes.add(index);

			let arrElement = restRecipesArr[index];
			parentBox.append(arrElement);
		}
	};
	const createRestRecipesBox = (restRecipesArr) => {
		const moreRecipesTitle = createElement("h5", [
			"recipe-article-more__title",
		]);
		const recipesBox = createElement("div", [
			"recipe-article-more__recipes-box",
		]);
		const moreRecipesBox = createElement("div", ["recipe-article-more__box"]);

		moreRecipesTitle.textContent = "More recipes";

		recipesBox.append(moreRecipesTitle, moreRecipesBox);

		showRestRecipes(restRecipesArr, moreRecipesBox);

		return recipesBox;
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
	// document.body.addEventListener("click", (e) => {
	// 	handlePages(e);
	// });
	searchEngine.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			hideAllSelect(hideSelection);
		}
	});
	searchEngine.addEventListener("input", filterRecipes);
	filterControls.addEventListener("click", handleFiltersSelections);
});
