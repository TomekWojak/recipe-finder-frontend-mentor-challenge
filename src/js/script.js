document.addEventListener("DOMContentLoaded", function () {
	const headerToggler = document.querySelector(".header__toggler");
	const mobileNav = document.querySelector(".nav__links-mobile");
	const desktopLinks = document.querySelectorAll(".nav__links-desktop-li");

	const filterControls = document.querySelector(".recipes-section__controls");
	const allSelections = document.querySelectorAll(".recipes-section__select");
	const filterPrepTimeBtn = document.querySelector(".max-prep-time-btn");
	const filterCookTimeBtn = document.querySelector(".max-cook-time-btn");
	const btns = [filterCookTimeBtn, filterPrepTimeBtn];
	// mobile navigation
	const handleMobileNavigation = () => {
		const isExpanded = headerToggler.getAttribute("aria-expanded");

		if (isExpanded === "false") {
			headerToggler.setAttribute("aria-expanded", "true");
			headerToggler.setAttribute("aria-label", "Hide navigation");
			mobileNav.style.height = mobileNav.scrollHeight + "px";
		} else {
			closeNav();
		}
	};

	const closeNav = () => {
		headerToggler.setAttribute("aria-expanded", "false");
		headerToggler.setAttribute("aria-label", "Show navigation");
		mobileNav.style.height = 0;
	};

	mobileNav.addEventListener("click", (e) => {
		if (
			e.target.matches(".nav__links-mobile-li") ||
			e.target.matches(".nav__links-mobile-btn")
		) {
			closeNav();
		}
	});

	// end of mobile navigation

	const handleDesktopLinks = (link) => {
		desktopLinks.forEach((link) => link.classList.remove("active"));
		link.classList.add("active");
	};

	// handle pages

	const handlePages = (e) => {
		const element = e.target.closest("[data-page]");

		if (!element) return;
		const allPages = document.querySelectorAll(".page[data-section]");

		const btnData = element.dataset.page;
		const pageToShow = document.querySelector(
			`.page[data-section="${btnData}"]`
		);

		if (!pageToShow) return;

		allPages.forEach((page) => page.classList.remove("page-active"));
		pageToShow.classList.add("page-active");
	};

	// handle filters

	const handleFiltersSelections = (e) => {
		if (
			e.target.matches(".max-prep-time-btn") ||
			e.target.matches(".max-cook-time-btn")
		) {
			btns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
			const clickedBtn = e.target;
			const btnId = clickedBtn.getAttribute("aria-controls");
			clickedBtn.setAttribute("aria-expanded", "true");
			allSelections.forEach((selection) => {
				selection.classList.remove("active");

				if (selection.id !== btnId) return;

				showSelection(selection);
			});
		}
	};
	const showSelection = (selection) => {
		selection.classList.add("active");
	};
	const hideSelection = (selection) => {
		selection.classList.remove("active");
	};
	desktopLinks.forEach((link) =>
		link.addEventListener("click", () => {
			handleDesktopLinks(link);
		})
	);
	document.body.addEventListener("click", (e) => {
		handlePages(e);
	});
	window.addEventListener("click", (e) => {
		const isExpanded = btns.filter(
			(btn) => btn.getAttribute("aria-expanded") === "true"
		);

		if (
			isExpanded.length !== 0 &&
			e.target !== filterCookTimeBtn &&
			e.target !== filterPrepTimeBtn
		) {
			btns.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
			allSelections.forEach(hideSelection);
		}
	});
	window.addEventListener("click", (e) => {
		const isExpanded = headerToggler.getAttribute("aria-expanded");
		if (
			isExpanded === "true" &&
			e.target !== mobileNav &&
			e.target !== headerToggler
		) {
			closeNav();
		}
	});
	filterControls.addEventListener("click", handleFiltersSelections);
	headerToggler.addEventListener("click", handleMobileNavigation);
});
