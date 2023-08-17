import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [totalInput,setTotalInput] = useState(0);
    const apiKey = process.env.REACT_APP_NEWS_API;

     const updateNews = async () => {
        console.log("OUT "+page)
        const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page+1}&pageSize=${props.pageSize}`);
        setArticles(articles.concat(result.data.articles));
        setLoading(false);
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(()=>{
        const fetchArticle = async () => {
        try {
            // props.setProgress(10);
            const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`);
            //console.log(result.data.articles);
            // props.setProgress(30);
            setArticles(result.data.articles);
            setTotalInput(result.data.totalResults);
            setTotalPage(Math.ceil(totalInput/props.pageSize))
            // props.setProgress(50);
            console.log(totalInput+" "+totalPage+" "+articles.length);
            setLoading(false);
            document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
            // props.setProgress(100);
        } catch (error) {
            console.error("Error fetching article " ,error);
        }
      };

      fetchArticle();
    },[props.category])


    const fetchMoreData = async () => {
        console.log("IN "+page);
        setPage(page+1);
        console.log("IN "+page);
        updateNews();
    };

  return (
    <>
        <h1 className="text-center" style={{marginTop:"70px"}}>NewsMonkey {props.category === "general" ? "" :"- Top "+ capitalizeFirstLetter(props.category)+" Headlines"}</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalInput}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
                {articles.length===0 ? <p></p> : articles.map((element)=>{
                    return  (element.urlToImage !== null && element.title && element.description &&
                    <div className="col-md-4" key={element.url}>
                        <NewsItem
                        title={element.title.slice(0,45)}
                        description={element.description.slice(0,88)}
                        imgUrl={element.urlToImage} newsUrl={element.url}
                        author={element.author} date={element.publishedAt}
                        source={element.source.name}/>
                    </div>)
                })}
            </div>
           </div>
        </InfiniteScroll>
    </>
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