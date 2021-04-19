import React, {Component, useEffect, useRef, useState} from 'react'
import LikeButton from './LikeButton.js'

export default function AnimeCard({Anime}){
    // constructor(props){
    //     super()
    //     this.state={
    //         anime: props.Anime
    //     }
    //     this.ref = React.createRef(0)
    //     this.timeref = React.createRef("current time")
    //     this.intervalref = React.createRef(null)
    //     this.decrementref = React.createRef(null)
    // }
    const [anime, setAnime] = useState(Anime)
    // const [timeUntilAir, setTimeUntilAir] = useState(Anime.nextAiringEpisode.timeUntilAir)
    const [countDownString, setCountDownString] = useState('current time') 
    // const ref = useRef(0)
    // const timeref = useRef('current time')
    // const intervalref = useRef(null)
    // const decrementref = useRef(null) 

    useEffect(() => {

        countDownUntilAir()
    }, [anime.nextAiringEpisode.timeUntilAiring, countDownString])
    useEffect(()=>{
        const decrementref = setInterval(()=>{
            const value = anime.nextAiringEpisode.timeUntilAiring - 1
            setAnime({
                ...anime, 
                nextAiringEpisode: {
                    timeUntilAiring: value
                }
            })
        }, 1000)
        return () => clearInterval(decrementref)
    }, )
    // useEffect(()=> {
    //     const intervalref = setInterval(countDownUntilAir,1000)
    //     return clearInterval(intervalref)
    // }, [])
    // componentDidMount(){
    //     this.ref.current = this.state.anime.nextAiringEpisode.timeUntilAiring
    //     // this.decrementTime(this.state.anime.nextAiringEpisode.timeUntilAiring)
    //     this.decrementref.current = setInterval(this.decrementTime,1000)
    //     // this.intervalref.current = setInterval(this.countDownUntilAir,1000)
    // }
    // componentWillUnmount(){
    //     clearInterval(this.intervalref.current)
    // }
    function countDownUntilAir(){
        const scds = anime.nextAiringEpisode.timeUntilAiring
        let seconds = (scds);
        const days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        const hrs  = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        const mnts = Math.floor(seconds / 60);
        seconds  -= mnts*60;
        setCountDownString(`${days} days,${hrs} Hrs,${mnts} Minutes,${seconds} Seconds`)
    
    }
    function decrementTime(){
        // ref.current = ref.current - 1
        // console.log(ref.current)
        const value = anime.nextAiringEpisode.timeUntilAiring - 1
        setAnime({
            ...anime, 
            nextAiringEpisode: {
                timeUntilAiring: value
            }
        })

    }
        

        return (
            <div id='gridTitles'>
                {anime.title.romaji}
                <div id='Card'>
                <img className='titleImages' src={anime.coverImage.medium}></img> 
                <br></br>
                {anime.averageScore}/100
                <LikeButton/>
                <div id='timers' style={{color: 'white'}}> 
                    {countDownString}
                </div>
                </div>
            </div>
        )
}
