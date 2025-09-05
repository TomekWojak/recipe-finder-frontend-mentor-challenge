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

	desktopLinks.forEach((link) =>
		link.addEventListener("click", () => {
			handleDesktopLinks(link);
		})
	);
	headerToggler.addEventListener("click", handleMobileNavigation);
});
