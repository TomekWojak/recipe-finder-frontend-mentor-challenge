import { initNavbar } from "./navbar.min.js";
import { servePages } from "./pages.min.js";

document.addEventListener("DOMContentLoaded", function () {
	const filterControls = document.querySelector(".recipes-section__controls");
	const allSelections = document.querySelectorAll(".recipes-section__select");
	const maxCookSelect = document.querySelector(".max-cook-time-select");
	const maxPrepSelect = document.querySelector(".max-prep-time-select");
	const filterPrepTimeBtn = document.querySelector(".max-prep-time-btn");
	const filterCookTimeBtn = document.querySelector(".max-cook-time-btn");
	const btns = [filterCookTimeBtn, filterPrepTimeBtn];

	initNavbar();
	servePages();

	

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
	filterControls.addEventListener("click", handleFiltersSelections);
});
