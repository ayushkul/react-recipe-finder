import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 2px;
  padding: 10px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>Ingredients</IngredientsText>
      {show &&
        ingredients.map((ingredient, index) => (
          <ul key={index} className="ingredient-list">
            <li className="ingredient-text">{ingredient.text}</li>
            <li className="ingredient-weight">Weight - {ingredient.weight}</li>
          </ul>
        ))}
      <SeeMoreText onClick={()=>window.open(url)}>See Complete Recipe</SeeMoreText>
    </RecipeContainer>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchInput = styled.input`
  color: black;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  border: none;
  width: 50%;
  outline: none;
  border-radius: 6px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);

  const fetchData = async () => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  return (
    <Container>
      <Header>
        Recipe Finder
        <SearchInput
          placeholder="Search Recipe"
          value={searchQuery}
          onChange={(e) => {
            updateSearchQuery(e.target.value);
            fetchData();
          }}
        />
      </Header>
      <RecipeListContainer>
        {recipeList.map((recipe, index) => (
          <RecipeComponent key={index} recipe={recipe.recipe} />
        ))}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
