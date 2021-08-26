import React,{useEffect,useState} from 'react'
import './App.css';
import Recipe from './Recipe'

const App = () =>{

  const APP_ID = '70e181e1'
  const APP_KEY = 'cbc30447f046b183120aa344d35429fa'

  

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState();
  const [query,setQuery] = useState('chicken');

  useEffect(() =>{
    document.title = 'Recipe App';
    getRecipes();
  },[query])

  const getRecipes = async () => {
      const responses = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await responses.json();
      setRecipes(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories.toFixed(2)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))};
      </div>
      
    </div>
  )
}
export default App;
