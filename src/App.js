import {useState, useEffect} from 'react';


function App() {

// var variables ={
// search: 'lelouch',
// };

const [variables, setVariables] = useState({
  search:'lelouch'
});

var query = `
query($search: String) {
Character(search: $search) {
  name {
    first
  }
  image {
    large
    medium
  }
  # description
  siteUrl
  }
}`;

var ani_list_url = 'https://graphql.anilist.co',
  options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: query,
          variables: variables
      })
  };

  
const anime_chan_url = 'https://animechan.vercel.app/api/random';

const [anime_chan_data, setAnime_chan_data] = useState({});
const [ani_list_info, setAni_list_info] = useState({});


const get_anime_chan_Data = async() =>{
  const response = await fetch(anime_chan_url);
  const anime_chan_data = await response.json();
  console.log(anime_chan_data);
  setAnime_chan_data(anime_chan_data);
};

useEffect(() => {
  get_anime_chan_Data();

  setVariables({
    search:anime_chan_data.character
  });


  fetch(ani_list_url, options).then(handleResponse)
                    .then(handleData)
                    .catch(handleError);

  function handleResponse(response) {
      return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
      });
  }

  function handleData(info) {
    console.log(info);
    setAni_list_info(info);
  }

  function handleError(error) {
      alert('Error, check console');
      console.error(error);
  }
}, []);

return(
  <>
    <div className="container">
      {/* character image fetch from ani-List graphQL API  */}
      <div className="img">
        <img className="img__char" src="" alt=""/>
      </div>
      {/* character quote anime fetch from anime-chan API */}
      <div className="vocals vocals--flex">
        <p className="vocals__char">
          <span className="vocals__char__space"></span>
          {anime_chan_data.quote}
        </p>
        <div className="vocals__origin">
          <p className="vocals__origin__charname">
            -- {anime_chan_data.character} <a href="www.google.com">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.19355 3.41095L5.00222 4.39247V0.379382L3.21851 7.0029L5.00222 6.1606V10.6958L7.19355 3.41095V3.41095ZM4.48048 0.0452473L4.43809 0.208834L3.94243 2.05005C2.62829 2.58954 1.69567 3.95044 1.69567 5.54106C1.69567 7.3614 2.81416 8.87892 4.41526 9.21306V11.0786C1.87502 10.7132 0 8.35684 0 5.54454C0 2.74269 1.95002 0.421148 4.48048 0.0452473V0.0452473ZM14.6349 15.6103C14.2697 16.0002 13.8817 16.0384 13.7023 15.9758C13.5262 15.9131 12.8186 15.2832 11.7327 14.4304C10.6468 13.5742 10.6371 13.1879 10.3305 12.4569C10.024 11.7295 9.33922 10.9742 8.45552 10.6331L8.13921 10.1215C7.33377 10.7097 6.41093 11.0578 5.4881 11.1204L5.55658 10.8907L6.07506 9.16781C7.59138 8.75362 8.71313 7.2883 8.71313 5.54106C8.71313 3.64415 7.46095 1.9874 5.58267 1.81337V0C8.29574 0.177509 10.4349 2.59302 10.4349 5.54454C10.4349 6.71401 10.0697 7.79647 9.48923 8.69097L9.96532 9.02511C10.2849 9.96834 10.9925 10.6958 11.674 11.023C12.3556 11.3501 12.724 11.3606 13.5262 12.5196C14.3284 13.6751 14.9186 14.4304 14.9773 14.6184C15.036 14.8063 15.0002 15.2205 14.6349 15.6103V15.6103ZM14.3121 14.9873C14.3121 14.8342 14.1947 14.7089 14.0512 14.7089C13.9077 14.7089 13.7904 14.8342 13.7904 14.9873C13.7904 15.1405 13.9077 15.2658 14.0512 15.2658C14.1947 15.2658 14.3121 15.1405 14.3121 14.9873Z" fill="black"/>
              </svg></a>
          </p>
          <p className="vocals__origin__anime">({anime_chan_data.anime})</p>
        </div>
        {/* button for new quote, about-section **not build** */}
        <div id="btn" className="vocals__btn">X</div>
      </div>
    </div>
  </>
  );
}

export default App;
