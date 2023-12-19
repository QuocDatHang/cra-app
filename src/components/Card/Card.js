
function Card({item}) {   
    return (
        < div className="card mb-3" style={{ maxWidth: '540px' }} >
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.avatar} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Age: <span className='fw-bolder'>{item.age}</span></li>
                            <li className="list-group-item">Gender: <span className='fw-bolder'>{item.gender}</span></li>
                            <li className="list-group-item">Email: <span className='fw-bolder'>{item.email}</span></li>
                            <li className="list-group-item">Mobile: <span className='fw-bolder'>{item.mobile}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card;