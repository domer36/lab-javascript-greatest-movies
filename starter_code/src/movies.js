/* eslint no-restricted-globals: 'off' */

// Iteration 1: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = movies => {
  return movies.map(movie=>movie).sort((a,b)=> (a.year === b.year) ? 1 : a.year-b.year)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct
const howManyMovies = movies => {
  const moviesBySteven = movies.filter( movie=> movie.director.includes('Steven Spielberg'))
  let dramaMovies = 0
  moviesBySteven.map( movie=> {
    movie.genre.forEach( genre=> dramaMovies += genre === "Drama" ? 1 : 0)
  })

  return (movies.length > 0) ? dramaMovies : 0
}
// Iteration 3: Alphabetic Order - Order by title and print the first 20 titles
const orderAlphabetically = movies=>{
    const order = movies.map(movie => movie.title)
    order.sort()
    order.splice(20, order.length)
    return order
}

// Iteration 4: All rates average - Get the average of all rates with 2 decimals
const ratesAverage = (movies) => {
    if(movies.length === 0) return 0
    const rates = movies.map( movie => (movie.rate > 0 ) ? movie.rate : 0)
    const total = rates.reduce( (acc, rate) => acc + rate )
    const promedio = total / movies.length

    
    return 1*(promedio.toFixed(2))
}

// Iteration 5: Drama movies - Get the average of Drama Movies
const dramaMoviesRate = (movies) => {
    if(movies.length === 0) return 0

    const dramas = movies.filter(movie => {
        const count = movie.genre.filter(genre=>genre==="Drama")

        return (count.length > 0)
    })
        
    return ratesAverage(dramas)
}

// Iteration 6: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = (movies)=>{
    return movies.map( movie=>{
      const newDuration = movie.duration.split(' ')
      let minutos = 0
      if(newDuration.length === 1 ){
        minutos = (newDuration[0].includes('h')) ? parseInt(newDuration) *60 : parseInt(newDuration)
      }else{
        minutos = parseInt(newDuration[0]) *60 + parseInt(newDuration[1])
      }
      
      return {...movie, duration: minutos}
    })
  }
// BONUS Iteration: Best yearly rate average - Best yearly rate average
const bestYearAvg = movies => {
  const moviesByYear = {}
  const years = movies.map( movie => movie.year)
  let bestYear = {average: 0}

  years.sort()
  years.forEach( year => {
    movies.forEach( movie => {
      if( !moviesByYear['_'+movie.year] ){
      moviesByYear['_'+movie.year] = {
        year: movie.year,
        total_rate: movie.rate,
        total_movies: 1,
        average: movie.rate
      }}else{
        moviesByYear['_'+movie.year]['total_rate'] += movie.rate
        moviesByYear['_'+movie.year]['total_movies'] += 1
        moviesByYear['_'+movie.year]['average'] = moviesByYear['_'+movie.year]['total_rate'] /moviesByYear['_'+movie.year]['total_movies']
        moviesByYear['_'+movie.year]['average'] = (moviesByYear['_'+movie.year]['average']).toFixed(2)
      }
    })
  })

  years.forEach( year=> {

    bestYear = ( moviesByYear['_'+year]['average'] > bestYear.average )
      ? moviesByYear['_'+year]
      : bestYear
  })

  return (movies.length > 0)
  ? (`The best year was ${parseFloat(bestYear.year)} with an average rate of ${parseFloat(bestYear.average)}`)
  : null
}