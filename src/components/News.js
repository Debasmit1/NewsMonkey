import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

function News(props) {
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);

    useEffect(()=>{
        const fetchArticle = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e41c75ef63954305b5556935131eb6af&page=${page}&pageSize=${props.pageSize}`);
            console.log(result.data.articles);
            setArticles(result.data.articles);
            setTotalPage(Math.ceil(result.data.totalResults/100))
            setLoading(false);
        } catch (error) {
            console.error("Error fetching article " ,error);
        }
      };

      fetchArticle();
    },[props.category])

    const handlePrevClick = async () => {
        setPage(page-1);
        setLoading(true);
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e41c75ef63954305b5556935131eb6af&page=${page-1}&pageSize=${props.pageSize}`);
        setArticles(result.data.articles);
        setLoading(false);
    }

    const handleNextClick = async () => {
        setLoading(true);
        if(totalPage/props.pageSize>page+2){
        setPage(page+1);
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e41c75ef63954305b5556935131eb6af&page=${page+1}&pageSize=${props.pageSize}`);
        setArticles(result.data.articles);
        setLoading(false);
        }
    }

  return (
    <div className='container my-3'>
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {loading && <Spinner />}
        <div className="row">
           {articles.length===0 ? <p></p> : articles.map((element)=>{
            return  (element.urlToImage !== null && element.title && element.description && <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title.slice(0,45)} description={element.description.slice(0,88)} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>)
           })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button"  className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled={totalPage/props.pageSize<page+2} type="button"  className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
    </div>
  )
}

News.defaultProps = {
    name: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News