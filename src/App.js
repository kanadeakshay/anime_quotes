import { useState, useEffect } from "react";

// API urls
const anime_chan_url = "https://animechan.vercel.app/api/random";
const ani_list_url = "https://graphql.anilist.co";

// Query for fetching ani_list API
const query = /* GraphQL */ `
  query($search: String) {
    Character(search: $search) {
      name {
        first
      }
      image {
        large
        medium
      }
      siteUrl
    }
  }
`;

function App() {

  const[new_quote, setNew_quote] = useState(true);
  const [whole_info, setWhole_info] = useState({
    isLoading: true,
  });

  const get_anime_chan_Data = async () => {
    const response = await fetch(anime_chan_url);
    const anime_chan_data = await response.json();
    return anime_chan_data;
  };

  const get_ani_list_info = async (character_name) => {
    const response = await fetch(ani_list_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables: { search: character_name }
      })
    });

    if (response.ok) {
      const info = await response.json();
      console.log(info);
      return info;
    }
  }

  const refresh=()=>{
    if(new_quote === true){
      setNew_quote(false);
    } else{
      setNew_quote(true);
    }
  }

  useEffect(() => {

    (async () => {
      try {
        const animeChanData = await get_anime_chan_Data();
        const ani_list_info = await get_ani_list_info(animeChanData.character);

        setWhole_info({
          isLoading :false,
          info: ani_list_info,
          quote: animeChanData,
        });
        console.log(whole_info);
      } catch (error) {
        alert("Error, check console");
        console.error(error);
      }
    })();

    console.log(whole_info);
  },[new_quote]);

  return (
    <>
    <div className="container">
      {/* character image fetch from ani-List graphQL API  */}
      <div className="img">
        {
          whole_info.isLoading ? 
          <img className="img__char" src="" alt=""/> :
          <img className="img__char" src={whole_info.info.data.Character.image.large} alt=""/>
        }
      </div>
      {/* character quote anime fetch from anime-chan API */}
      <div className="vocals vocals--flex">
          {
            whole_info.isLoading ?
            <p className="vocals__char">
              <span className="vocals__char__space"></span>
              Loading...
            </p> :
            <p className="vocals__char">
            <span className="vocals__char__space"></span>
            {whole_info.quote.quote}
         </p>
          }
        <div className="vocals__origin">
          {
            whole_info.isLoading ?
            <p className="vocals__origin__charname">
            -- 🔍 <a href="www.google.com">
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.19355 3.41095L5.00222 4.39247V0.379382L3.21851 7.0029L5.00222 6.1606V10.6958L7.19355 3.41095V3.41095ZM4.48048 0.0452473L4.43809 0.208834L3.94243 2.05005C2.62829 2.58954 1.69567 3.95044 1.69567 5.54106C1.69567 7.3614 2.81416 8.87892 4.41526 9.21306V11.0786C1.87502 10.7132 0 8.35684 0 5.54454C0 2.74269 1.95002 0.421148 4.48048 0.0452473V0.0452473ZM14.6349 15.6103C14.2697 16.0002 13.8817 16.0384 13.7023 15.9758C13.5262 15.9131 12.8186 15.2832 11.7327 14.4304C10.6468 13.5742 10.6371 13.1879 10.3305 12.4569C10.024 11.7295 9.33922 10.9742 8.45552 10.6331L8.13921 10.1215C7.33377 10.7097 6.41093 11.0578 5.4881 11.1204L5.55658 10.8907L6.07506 9.16781C7.59138 8.75362 8.71313 7.2883 8.71313 5.54106C8.71313 3.64415 7.46095 1.9874 5.58267 1.81337V0C8.29574 0.177509 10.4349 2.59302 10.4349 5.54454C10.4349 6.71401 10.0697 7.79647 9.48923 8.69097L9.96532 9.02511C10.2849 9.96834 10.9925 10.6958 11.674 11.023C12.3556 11.3501 12.724 11.3606 13.5262 12.5196C14.3284 13.6751 14.9186 14.4304 14.9773 14.6184C15.036 14.8063 15.0002 15.2205 14.6349 15.6103V15.6103ZM14.3121 14.9873C14.3121 14.8342 14.1947 14.7089 14.0512 14.7089C13.9077 14.7089 13.7904 14.8342 13.7904 14.9873C13.7904 15.1405 13.9077 15.2658 14.0512 15.2658C14.1947 15.2658 14.3121 15.1405 14.3121 14.9873Z" fill="black"/>
              </svg></a>
            </p> :
            <p className="vocals__origin__charname">
            -- {whole_info.quote.character} <a href={whole_info.info.data.siteUrl}>
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.19355 3.41095L5.00222 4.39247V0.379382L3.21851 7.0029L5.00222 6.1606V10.6958L7.19355 3.41095V3.41095ZM4.48048 0.0452473L4.43809 0.208834L3.94243 2.05005C2.62829 2.58954 1.69567 3.95044 1.69567 5.54106C1.69567 7.3614 2.81416 8.87892 4.41526 9.21306V11.0786C1.87502 10.7132 0 8.35684 0 5.54454C0 2.74269 1.95002 0.421148 4.48048 0.0452473V0.0452473ZM14.6349 15.6103C14.2697 16.0002 13.8817 16.0384 13.7023 15.9758C13.5262 15.9131 12.8186 15.2832 11.7327 14.4304C10.6468 13.5742 10.6371 13.1879 10.3305 12.4569C10.024 11.7295 9.33922 10.9742 8.45552 10.6331L8.13921 10.1215C7.33377 10.7097 6.41093 11.0578 5.4881 11.1204L5.55658 10.8907L6.07506 9.16781C7.59138 8.75362 8.71313 7.2883 8.71313 5.54106C8.71313 3.64415 7.46095 1.9874 5.58267 1.81337V0C8.29574 0.177509 10.4349 2.59302 10.4349 5.54454C10.4349 6.71401 10.0697 7.79647 9.48923 8.69097L9.96532 9.02511C10.2849 9.96834 10.9925 10.6958 11.674 11.023C12.3556 11.3501 12.724 11.3606 13.5262 12.5196C14.3284 13.6751 14.9186 14.4304 14.9773 14.6184C15.036 14.8063 15.0002 15.2205 14.6349 15.6103V15.6103ZM14.3121 14.9873C14.3121 14.8342 14.1947 14.7089 14.0512 14.7089C13.9077 14.7089 13.7904 14.8342 13.7904 14.9873C13.7904 15.1405 13.9077 15.2658 14.0512 15.2658C14.1947 15.2658 14.3121 15.1405 14.3121 14.9873Z" fill="black"/>
              </svg>
              </a>
            </p>
          }
          
          {
            whole_info.isLoading ?
            <p className="vocals__origin__anime">🔍</p> :
            <p className="vocals__origin__anime">({whole_info.quote.anime})</p>
          }
        </div>
        {/* button for new quote */}
        <div id="btn" className="vocals__btn">
          <button  onClick={refresh} className="vocals__btn__new">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </>
  );
}


export default App