export const servePages = () => {
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

	document.body.addEventListener("click", (e) => {
		handlePages(e);
	});
};
