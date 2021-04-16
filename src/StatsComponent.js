import React, {Component} from 'react'


export default class Appstats extends Component{
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
  const query = `
  query ($id: Int, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage){
      media(id: $id){
          title{
        english
        romaji
        }
        genres
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
              query: query,
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
    // console.log(anime)
    return anime
  }

  handleError(error) {
    alert('Error, check console');
    console.error(error);
  }
  MapTitles(){
    return this.state.animes.map(animeTitle => <h1>{animeTitle.title.english}</h1>)
    }

  render(){
    return(
      <div> 
        {this.MapTitles()}
      </div>)
    }
}