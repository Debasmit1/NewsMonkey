import React from 'react'

function NewsItem(props) {
  return (
    <div className='container my-3'>
        <div  className="card">
           <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
            {props.source}
          </span>
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