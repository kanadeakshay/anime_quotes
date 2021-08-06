import { useState, useEffect } from "react";
import {
  CharacterImage,
  LoadingImage,
  ImageNotAvailable,
} from './Image'
import {Vocals, LoadingVocals} from './Vocals'
import Error from './Error';


// Functions that checks obj is empty or not 
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// API urls
const anime_chan_url = "https://animechan.vercel.app/api/random";
// const anime_chan_url = "";
const ani_list_url = "https://graphql.anilist.co";
// const ani_list_url = "";

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

function Home() {

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
    } else{
      return response
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
        console.error(error);
        // alert("Error, check console");
      }
    })();
  },[new_quote]);

  return (
    <div className="container">
      {
        whole_info.isLoading ?
        <LoadingImage/> :
        isEmpty(whole_info.info) ?
        <ImageNotAvailable/> :
        whole_info.info !== null ?
        <CharacterImage 
        img = {whole_info.info.data.Character.image.large}
        /> :
        <Error/>
      }
      {
        whole_info.isLoading ?
        <LoadingVocals /> :
        <Vocals 
          on_refresh={refresh}
          char_quote={whole_info.quote.quote}
          char_name={whole_info.quote.character}
          char_anime={whole_info.quote.anime}
          // char_url={whole_info.info.data.siteUrl}
        />
      }
    </div>
  );
}

export default Home;