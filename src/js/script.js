document.addEventListener("DOMContentLoaded", function () {
	const headerToggler = document.querySelector(".header__toggler");
	const mobileNav = document.querySelector(".nav__links-mobile");
	const desktopLinks = document.querySelectorAll(".nav__links-desktop-li");

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

	desktopLinks.forEach((link) =>
		link.addEventListener("click", () => {
			handleDesktopLinks(link);
		})
	);
	document.body.addEventListener("click", (e) => {
		handlePages(e);
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
	headerToggler.addEventListener("click", handleMobileNavigation);
});
