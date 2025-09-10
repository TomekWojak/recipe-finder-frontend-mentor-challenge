let restRecipes = [];
export const createRecipe = ({
	title,
	slug,
	overview,
	servings,
	prepMinutes,
	cookMinutes,
	id,
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
		href: `?recipeId=${slug}`,
	});

	viewRecipeBtn.dataset.recipeId = slug;
	viewRecipeBtn.dataset.pageName = "article";
	recipePrep.dataset.prepTime = prepMinutes;
	recipeCook.dataset.cookTime = cookMinutes;

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

export const createRecipeArticle = (
	{
		title,
		slug,
		overview,
		servings,
		prepMinutes,
		cookMinutes,
		ingredients,
		instructions,
		image: { small, large },
	},
	recipeToShow,
	parentBox,
	urlParam
) => {
	if (recipeToShow !== slug) return;
	parentBox.innerHTML = "";
	// creating elements
	const breadcrumbsBox = createElement("div", ["recipe-article__breadcrumbs"]);
	const breadcrumbsPath = createElement("p", [
		"recipe-article__breadcrumbs-path",
	]);
	const breadcrumbsPage = createElement(
		"a",
		["recipe-article__breadcrumbs-page"],
		{ href: "?recipes" }
	);
	const breadcrumbsName = createElement("span", [
		"recipe-article__breadcrumbs-recipe-name",
	]);
	const articleBox = createElement("div", ["recipe-article__box"]);
	const articleImgBox = createElement("div", ["recipe-article__img-box"]);
	const articlePictrue = createElement("pictrue");
	const articleSource = createElement("source", [], {
		srcset: large,
		media: "(min-width: 768px)",
	});
	const articleImg = createElement("img", ["recipe-article__img"], {
		src: small,
		width: 500,
		height: 500,
		loading: "lazy",
		alt: slug,
	});
	const articleTextBox = createElement("div", ["recipe-article__text-box"]);
	const articleTitle = createElement("h5", [
		"recipe-article__subtitle",
		"subtitle",
	]);
	const articleText = createElement("p", ["recipe-article__text", "text"]);

	const articleInfo = createElement("div", ["recipe-article__info"]);
	const articleServings = createElement("span", ["recipe-article__servings"]);
	const articlePrep = createElement("span", ["recipe-article__prep"]);
	const articleCook = createElement("span", ["recipe-article__cook"]);

	const articleIngredientsTitle = createElement("p", ["recipe-article__about"]);

	const articleIngredientsList = createElement("ul", ["recipe-article__list"]);

	ingredients.forEach((ingredient) => {
		const articleIngredient = createElement("li", ["recipe-article__item"]);
		articleIngredient.innerHTML = `<img src="./dist/img/icon-bullet-point.svg" width="32" height="32"
                    loading="lazy" alt="">${ingredient}`;
		articleIngredientsList.append(articleIngredient);
	});

	const articleInstructionsTitle = createElement("p", [
		"recipe-article__about",
	]);

	const articleInstructionsList = createElement("ul", ["recipe-article__list"]);

	instructions.forEach((instruction) => {
		const articleInstruction = createElement("li", ["recipe-article__item"]);
		articleInstruction.innerHTML = `<img src="./dist/img/icon-bullet-point.svg" width="32" height="32"
                    loading="lazy" alt="">${instruction}`;
		articleInstructionsList.append(articleInstruction);
	});
	const articleDivider = createElement("hr", ["recipe-article__divider"]);
	// end of creating elements

	// adding content to elements
	breadcrumbsName.textContent = `${title}`;
	breadcrumbsPage.textContent = "Recipes /";

	breadcrumbsPath.append(breadcrumbsPage, breadcrumbsName);

	articleTitle.textContent = title;
	articleText.textContent = overview;

	articleServings.innerHTML = `<img width="20" height="20" src="./dist/img/icon-servings.svg"
    alt=""> Servings: ${servings}`;
	articlePrep.innerHTML = `<img width="21" height="20" src="./dist/img/icon-prep-time.svg"
    alt=""> Prep: ${prepMinutes} mins`;
	articleCook.innerHTML = `<img src="./dist/img/icon-cook-time.svg" alt="" width="20"
    height="20">Cook: ${cookMinutes} mins`;

	articleIngredientsTitle.textContent = "Ingredients:";
	articleInstructionsTitle.textContent = "Instructions:";

	// end of adding content to elements

	// append
	breadcrumbsBox.append(breadcrumbsPath);
	articlePictrue.append(articleSource, articleImg);
	articleImgBox.append(articlePictrue);

	articleInfo.append(articleServings, articlePrep, articleCook);
	articleTextBox.append(
		articleTitle,
		articleText,
		articleInfo,
		articleIngredientsTitle,
		articleIngredientsList,
		articleInstructionsTitle,
		articleInstructionsList
	);

	articleBox.append(articleImgBox, articleTextBox);
	parentBox.append(breadcrumbsBox, articleBox, articleDivider);
	// end of append
};
export const createRestRecipes = (
	{
		title,
		slug,
		overview,
		servings,
		prepMinutes,
		cookMinutes,
		ingredients,
		instructions,
		image: { small, large },
	},
	recipeToShow
) => {
	if (slug !== recipeToShow) {
		const recipe = createRecipe({
			title,
			slug,
			overview,
			servings,
			prepMinutes,
			cookMinutes,
			ingredients,
			instructions,
			image: { small, large },
		});
		restRecipes.push(recipe);
	}
	return restRecipes;
};
// const handleRestRecipes = (recipesArr, urlParam, parentBox) => {
// 	const recipeId = urlParam.get('recipeId')

// 	recipeArr.forEach(recipe => {

// 	})


// };

export const createElement = (element, classes = [], attributes = {}) => {
	const el = document.createElement(element);

	classes.forEach((className) => el.classList.add(className));

	Object.entries(attributes).forEach(([key, value]) => {
		el[key] = value;
	});

	return el;
};

// stwórz tytuł
// stwórz boxa z resztą przepisów
// wykonaj funkcję filtrującą
// dodaj tytuł i box do parentBox
// dodaj 3 przepisy do boxa
