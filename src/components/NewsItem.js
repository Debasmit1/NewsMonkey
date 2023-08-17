import React from 'react'

function NewsItem(props) {
  return (
    <div className='container my-3'>
        <div  className="card">
          <div style = {{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-danger">
              {props.source}
             </span>
          </div>
            <img src={props.imgUrl}  className="card-img-top" alt="..." style={{height:"200px"}}/>
            <div  className="card-body">
                <h5  className="card-title">{props.title}...</h5>
                <p className='card-text' dangerouslySetInnerHTML={{__html: props.description}}/>
                <p className="card-text"><small className="text-body-secondary">By {props.author===null ? "unknown" : props.author} on {new Date(props.date).toGMTString()}</small></p>
                <a rel="noreferrer" href={`${props.newsUrl}`} target="_blank"  className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
    </div>
  )
}

export default NewsItem