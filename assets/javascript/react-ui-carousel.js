const Carousel = () => {
    return (
        <div className='row'>
            <div className='col-sm-9'>
                <div className='container'>
                    <div className='carouselContainer'>
                        <h2>Now in Theaters</h2>
                        <div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>
                            <ol className='carousel-indicators'>
                                <li data-target='carouselExampleIndicators' data-slide-to='0' className='active'></li>
                                <li data-target='carouselExampleIndicators' data-slide-to='1'></li>
                                <li data-target='carouselExampleIndicators' data-slide-to='2'></li>
                            </ol>
                            <div className='carousel-inner'>
                                <div className='carousel-item active'>
                                    <img className='d-block w-100' src='https://via.placeholder.com/150' alt='First slide'></img>
                                </div>
                                <div className='carousel-item'>
                                    <img className='d-block w-100' src='https://via.placeholder.com/150' alt='Second slide'></img>
                                </div>
                                <div className='carousel-item'>
                                    <img className='d-block w-100' src='https://via.placeholder.com/150' alt='Third slide'></img>
                                </div>
                            </div>
                            <a className='carousel-control-prev' href='#carouselExampleIndicators' role='button' data-slide='prev'>
                                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                                <span className='sr-only'>Previous</span>
                            </a>
                            <a className='carousel-control-next' href='#carouselExampleIndicators' role='button' data-slide='next'>
                                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                                <span className='sr-only'></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div id='movie-info' className='row'>
                    <div className='col-md-3'>
                        <div id='movie-poster'>
                            <img src='https://via.placeholder.com/150'></img>
                        </div>
                    </div>
                    <div className='col-md-9'>
                        <h3>Plot Synopsis</h3>
                        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium,
                                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
                                vitae
                                dicta
                                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
                                non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                                voluptatem.</p>
                    </div>
                </div>
                <div id='actor-actress' className='row'>
                    <div className='col-md-6'>
                        <p>This is where fellow actors will go</p>
                    </div>
                </div>
            </div>
            <div id='my-watch-list' className='col-sm-3'>
                <div className='list-group'>
                    <a href="#" className="list-group-item list-group-item-action active">
                        My Watch List
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">Seven</a>
                    <a href="#" className="list-group-item list-group-item-action">Forest Gump</a>
                    <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                    <a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Carousel />,
    document.getElementById('bottom-wrapper')
);