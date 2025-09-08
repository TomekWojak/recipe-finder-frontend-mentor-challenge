export const createRecipe = ({
	title,
	slug,
	overview,
	servings,
	prepMinutes,
	cookMinutes,
	image: { large, small },
}) => {
	// creating elements
	const recipe = createElement("div", ["recipes-section__recipe"]);
	const imgBox = createElement("div", ["recipes-section__recipe-img-box"]);
	const pictrue = createElement("pictrue");
	const source = createElement("source", [], {
		srcset: large,
		media: "(min-width: 768px)",
	});
	const img = createElement("img", ["recipes-section__img"], {
		width: 500,
		height: 500,
		src: small,
		alt: slug,
	});
	const recipeBody = createElement("div", ["recipes-section__recipe-body"]);
	const recipeTitle = createElement("p", ["recipes-section__recipe-title"]);
	const recipeText = createElement("p", ["recipes-section__recipe-text"]);
	const recipeInfo = createElement("div", ["recipes-section__recipe-info"]);
	const recipeServings = createElement("span", [
		"recipes-section__recipe-servings",
	]);
	const recipePrep = createElement("span", ["recipes-section__recipe-prep"]);
	const recipeCook = createElement("span", ["recipes-section__recipe-cook"]);
	const viewRecipeBtn = createElement("a", ["recipes-section__view-recipe"], {
		href: "/",
	});
	// end of creating elements

	// adding elements content
	recipeTitle.textContent = title;
	recipeText.textContent = overview;
	recipeServings.innerHTML = `<img src="/dist/img/icon-servings.svg" width="20"
    height="20" alt=""> Servings: ${servings}`;

	recipePrep.innerHTML = `<img width="21" height="20"
    src="./dist/img/icon-prep-time.svg" alt=""> Prep: ${prepMinutes} mins`;

	recipeCook.innerHTML = `<img src="./dist/img/icon-cook-time.svg" alt=""
    width="20" height="20"> Cook: ${cookMinutes} mins`;
	viewRecipeBtn.textContent = "View Recipe";
	// end of adding elements content

	pictrue.append(source, img);
	imgBox.append(pictrue);
	recipeInfo.append(recipeServings, recipePrep, recipeCook);
	recipeBody.append(recipeTitle, recipeText, recipeInfo, viewRecipeBtn);

	recipe.append(imgBox, recipeBody);

	return recipe;
};

const createElement = (element, classes = [], attributes = {}) => {
	const el = document.createElement(element);

	classes.forEach((className) => el.classList.add(className));

	Object.entries(attributes).forEach(([key, value]) => {
		el[key] = value;
	});

	return el;
};
