import React, {Component, Fragment} from 'react'
import AnimeCard from './AnimeCard'


export default class AnimeTitles2021 extends Component{
  // constructor(){
  //   super()
  //   this.state = {
  //       animes: [],
  //       page: 1
  //   }
  //   this.pageNext = () =>{
  //     console.log('state', this)
  //         this.setState({
  //             ...this.state, 
  //             page: this.state.page + 1
  //         })
  //         this.fetchData.then(data => {
  //           this.setState({animes: data[0]})
  //         })
  //   }
  // }
  pageRef = React.createRef(null)
  state = {
    animes: [],
    page: 1
  }
  componentDidMount(){
    this.pageRef.current = 1
    this.fetchData().then(data => {
      console.log({animes: data[0]})
      this.setState({animes: data[0]})
    });
  }
  componentDidUpdate(PreviousProps, PreviousState){
    console.log('previousstate', PreviousState)
    console.log('currentState', this.state)
  }
  fetchData = () =>{
  const queryCurrentAnimes = `
  query ($id: Int, $page: Int = ${this.pageRef.current}, $perPage: Int) {
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

  handleResponse = (response) => {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
  }

  handleData = (data) => {
  const anime = []
  anime.push(data.data.Page.media)
    return anime
  }

  handleError = (error) => {
    alert('Error, check console');
    console.error(error);
  }
  
  pageNext = () => {
        this.setState({
            ...this.state, 
            page: this.state.page + 1
        })
        console.log('currentRef', this.pageRef.current)
        this.pageRef.current = this.pageRef.current + 1
        this.fetchData().then(data => {
          this.setState({animes: data[0]})
          console.log(data)
        })
        console.log(this.pageRef.current)
  }
  pagePrev = () => {
    console.log('state prev', this.state.page)
        this.setState({
          ...this.state,
          page: this.state.page - 1
        })
  }
    
  RomajiTitles = () => {
    return this.state.animes.map(anime => <AnimeCard Anime={anime}/>)
  }

  render(){
    return(
      <>
        <div className="Titles"> 
          {this.RomajiTitles()}
        </div>
        <div>
          <button onClick={this.pagePrev}>Previous Page</button> 
          <button onClick={this.pageNext}>Next Page</button>
        </div>
      </>)
    }
  }