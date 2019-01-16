const WatchList = () => {
    return (
        <div id='my-watch-list' className='col-sm-3'>
            <div className='list-group'>
                <a href="#" className="list-group-item list-group-item-action active">
                    My Watch List
                </a>
                <a href="#" className="list-group-item list-group-item-action">Seven</a>
                <a href="#" className="list-group-item list-group-item-action">Forrest Gump</a>
                <a href="#" className="list-group-item list-group-item-action"> Whatever </a>
                <a href="#" className="list-group-item list-group-item-action"> Whatever#2</a>
            </div>
        </div>
    );
};

ReactDOM.render (
    <WatchList />,
    document.getElementById('watch-list')
);