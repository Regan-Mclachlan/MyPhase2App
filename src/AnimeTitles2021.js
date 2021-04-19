import React, {Component} from 'react'
import AnimeCard from './AnimeCard'

export default class AnimeTitles2021 extends Component{
  state = {
    animes: []
  }
  componentDidMount(){
    this.fetchData().then(data => {
      console.log({animes: data[0]})
      this.setState({animes: data[0]})
    });
  }
  fetchData(){
  const queryCurrentAnimes = `
  query ($id: Int, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, status: RELEASING, type: ANIME, isAdult: false, 
        popularity_greater: 8, startDate_greater: 20210000, countryOfOrigin: "JP", sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
        episodes
        averageScore
        nextAiringEpisode {
          timeUntilAiring
          }
      }
    }
  }
  
`;
  const url = 'https://graphql.anilist.co',
      options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: queryCurrentAnimes,
          })
      };
    
      return fetch(url, options).then(this.handleResponse)
                              .then(this.handleData)
                              .catch(this.handleError);
  }

  handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }

  handleData(data) {
  const anime = []
  anime.push(data.data.Page.media)
    return anime
  }

  handleError(error) {
    alert('Error, check console');
    console.error(error);
  }
  
  pageNext(){
        this.page ++
  }
  pagePrev(){
        this.page --
  }
    
  RomajiTitles(){
    return this.state.animes.map(anime => <AnimeCard Anime={anime}/>)
  }
  countDownUntilAir(scds){
        let seconds = (scds);
        const days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        const hrs  = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        const mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        return <div>{days+" days, "+hrs+" Hrs, "+mnts+" Minutes"}</div>
        
  };

  render(){
    return(
      <div className="Titles"> 
        {this.RomajiTitles()}
      </div>)
    }
  }