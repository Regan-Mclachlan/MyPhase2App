import React, {Component} from 'react'


export default class AnimeTitles2021 extends Component{
  state = {
    animes: []
  }
  componentDidMount(){
    this.fetchData().then(data => {
      console.log({animes: data[0]})
      this.setState({animes: data[0]})
    })
  }
  //[...this.state.animes,...data]
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
        popularity_greater: 8, startDate_greater: 20210000) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
        episodes
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
    console.log(anime)
    return anime
  }

  handleError(error) {
    alert('Error, check console');
    console.error(error);
  }
  RomajiTitles(){
    return this.state.animes.map(animeTitle => <div id={animeTitle.id} src={animeTitle.coverImage.medium} >{animeTitle.title.romaji}</div>)
  }
  // AnimeId(){
  //   return this.state.animes.map(animeTitle => {animeTitle.id}
  // }
  render(){
    return(
      <div> 
        {this.RomajiTitles()}
      </div>)
    }
  }