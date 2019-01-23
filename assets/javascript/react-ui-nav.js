//This creates the header
const Navigation = () => {
    return (
        <header id='masthead'>
            <Navbar
                siteName="Project 1"
            />
            <SignUp />
            <Login />
            <MediaInfo />
            <MediaInfoTV />
            <MediaInfoPerson />
            <MyWatchList />
            <AccountInfo />
        </header>
    );
}

const WatchButton = () => {
    return (
        <button style={{ height: '51px' }} id='watch-button' className='btn' type='submit' data-toggle='modal'>My Watch List</button>
    );
}

//User Signup Component
const SignUp = () => {
    return (
        <div id='sign-up-modal' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='sign-up-modal-title' className='modal-title'>Sign Up</h5>
                        <button type='button' className='close' data-dismiss='modal'></button>
                    </div>
                    <div className='modal-body'>
                        <form>
                            <div className='form-group'>
                                <label htmlFor='sign-up-email-field'>Email Address</label>
                                <input id='sign-up-email-field' type='email' className='form-control' placeholder='johndoe@johndoe.com'></input>
                                <small id='signup-email-error' className='form-text'>Your Email is not in the right format</small>
                                <label htmlFor='sign-up-password-field'>Password</label>
                                <input id='sign-up-password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
                                <small id='signup-password-error' className='form-text'>Your Password is incorrect or missing</small>
                            </div>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <p>Have an account? <a data-toggle='modal' className='click' data-target='#login-modal' data-dismiss='modal'>Click Here</a></p>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button id="info-user-signup" type='button' className='btn btn-primary'>Sign-Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MyWatchList = () => {
    return (
        <div id='watch-modal' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='watch-modal-title' className='modal-title'>My Watch List</h5>
                        <button type='button' className='close' data-dismiss='modal'></button>
                    </div>
                    <div className='modal-body'>
                        <div id='my-watch-list' className='col-sm-3'>
                            <div id='list-group-watch-div' className='list-group'>
                                <div id='empty-watch-list'>You don't have anything on your list!  Try searching for some.</div>
                                <ul id='watch-list-group' className='list-group'></ul>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//User Login Component
const Login = () => {
    return (
        <div id='login-modal' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='login-modal-title' className='modal-title'>Log in</h5>
                        <button type='button' className='close' data-dismiss='modal'></button>
                    </div>
                    <div className='modal-body'>
                        <form>
                            <div className='form-group'>
                                <label htmlFor='login-email-field'>Email Address</label>
                                <input id='login-email-field' type='email' className='form-control' placeholder='johndoe@johndoe.com'></input>
                                <small id='login-email-error' className='form-text'>Your Email is not in the right format</small>
                                <label htmlFor='login-password-field'>Password</label>
                                <input id='login-password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
                                <small id='login-password-error' className='form-text'>Your Password is incorrect or missing</small>
                            </div>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <p>Don't have an account? <a data-toggle='modal' data-target='#sign-up-modal' className='click' data-dismiss='modal'>Click Here</a></p>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button id="user-info-login" type="button" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Media Info Modal
const MediaInfo = () => {
    return (
        <div id='media-info-modal' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='media-info-modal-title' className='modal-title'></h5>
                        <button type='button' className='close' data-dismiss='modal' style={{ color: '#1e90ff' }}>&#x2718;</button>
                    </div>
                    <div id='media-modal-body' className='modal-body'>
                        <div id='media-modal-trailer'></div>
                        <div id="media-modal-overview"></div>
                        <div id="media-modal-year"></div>
                        <div id="media-modal-rating"></div>
                        <div id="media-modal-actors"></div>
                        <div id="media-modal-director"></div>
                        <div id="media-modal-genre"></div>
                        <div id="media-modal-imdb" style={{ display: 'none' }}></div>
                    </div>

                    <div id='media-modal-footer' className='modal-footer'>
                        <p><a data-toggle='modal' className='click' data-target='#' data-dismiss='modal'></a></p>
                        <button id='add-to-watch-list-button' type='button' className='btn btn-primary add-watch-list'>Add to Watch List</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MediaInfoTV = () => {
    return (
        <div id='media-info-modal-tv' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='media-info-modal-title-tv' className='modal-title'></h5>
                        <button type='button' className='close trailerClose' data-dismiss='modal' style={{ color: '#1e90ff' }}>&#x2718;</button>
                    </div>
                    <div id='media-modal-body-tv' className='modal-body'>
                        <div id='media-modal-tv-trailer'></div>
                        <div id="media-modal-overview-tv"></div>
                        <div id="media-modal-creators-tv"></div>
                        <div id="media-modal-first-air-tv"></div>
                        <div id="media-modal-network-tv"></div>
                        <div id="media-modal-genre-tv"></div>
                        <div id="media-modal-imdb-tv" style={{ display: 'none' }}></div>
                        <div id="media-modal-episodes" className='row'>
                            <div id="media-modal-previousEpisode" className='col-md-6'></div>
                            <div id="media-modal-nextEpisode" className='col-md-6'></div>
                        </div>
                    </div>

                    <div id='media-modal-tv-footer' className='modal-footer'>
                        <p><a data-toggle='modal' className='click' data-target='#' data-dismiss='modal'></a></p>
                        <button id='add-to-watch-list-button-tv' type='button' className='btn btn-primary add-watch-list'>Add to Watch List</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MediaInfoPerson = () => {
    return (
        <div id='media-info-modal-person' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='media-info-modal-title-person' className='modal-title'></h5>
                        <button type='button' className='close trailerClose' data-dismiss='modal' style={{ color: '#1e90ff' }}>&#x2718;</button>
                    </div>
                    <div id='media-modal-body-person' className='modal-body'>
                        <div id="media-modal-pic-person"></div>
                        <div id="media-modal-bio-person"></div>
                        <div id="media-modal-place-born-person"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AccountInfo = () => {
    return (
        <div id='account-info-modal' className='modal fade' tabIndex='-1' role='dialog'>
            <div className='modal-dialog modal-dialog-centered modal-lg' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 id='account-info-modal-title' className='modal-title'>My Account</h5>
                        <button type='button' className='close' data-dismiss='modal'></button>
                    </div>
                    <div id='account-modal-body' className='modal-body'></div>
                    <div className='modal-footer'>
                        <p><a data-toggle='modal' className='click' data-target='#' data-dismiss='modal'></a></p>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button id='save-account-settings' type='button' className='btn btn-primary'>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Login Menu Component
const LoginDropdown = (props) => {
    return (
        <li id='login-menu' className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='#' id='loginDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' aria-label='Toggle navigation'>Menu</a>
            <div className='dropdown-menu' aria-labelledby='loginDropdownMenuLink'>
                <a id='login-button' className='dropdown-item' data-toggle='modal' data-target="#login-modal"> {props.listItemOne}</a>
                <a id='sign-up-button' className='dropdown-item' data-toggle='modal' data-target='#sign-up-modal'>{props.listItemTwo}</a>
                <a id='account-details' className='dropdown-item' data-toggle='modal'>{props.listItemThree}</a>
                <a id='log-off-button' className='dropdown-item' href='#'>{props.listItemFour}</a>
            </div>
        </li>
    );
}

//This object creates the search bar
const Searchbar = () => {
    return (
        <form className='form-inline'>
            <SearchTypeSwitch />
            <input style={{ height: '51px', width: '205.5px' }} id='search-bar' className='form-control mr-md-6' type='search' placeholder='Type in Text' aria-label='Search'></input>
            <button style={{ height: '51px' }} id='submit-button' className='btn' type='submit'>Search</button>
        </form>
    );
}
//This creates the Navbar
const Navbar = (props) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
            <a id='home-button' className='navbar-brand' href='#'>{props.siteName}</a>
            <Searchbar />
            <WatchButton />
            <div className="navbar-nav ml-auto">
                <LoginDropdown
                    listItemOne="Login"
                    listItemTwo="Sign-up"
                    listItemThree="Account Details"
                    listItemFour="Log off"
                />
            </div>
        </nav>
    );
}
class SearchTypeSwitch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedView: 'Movie'
        }
    }

    render() {

        const { selectedView } = this.state
        const VIEWS = [
            {
                name: 'Movie',
                minor: ['Title'],
                genreCode: ['1'],
            }, {
                name: 'Movie Genre',
                minor: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 'TV Movie', 'Thriller', 'War', 'Western'],
                genreCode: ['28', '12', '16', '35', '80', '99', '18', '10751', '14', '36', '27', '10402', '9648', '10749', '878', '10770', '53', '10752', '37']
            }, {
                name: 'TV Show',
                minor: ['Title'],
                genreCode: ['1']
            }, {
                name: 'TV Genre',
                minor: ['Action & Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Kids', 'Mystery', 'News', 'Reality', 'Sci-Fi & Fantasy', 'Soap', 'Talk', 'War & Politics', 'Western'],
                genreCode: ['10759', '16', '35', '80', '99', '18', '10751', '10762', '9648', '10763', '10764', '10765', '10766', '10767', '10768', '37']
            }, {
                name: 'Actor/Actress',
                minor: ['Name'],
                genreCode: ['1']
            }

        ]

        const getMajorMethod = () => {
            const view = VIEWS.filter(({ name }) => name === selectedView)[0]
            return (
                <div className='dropdownSub'>
                    <select id='subSearch' style={{ width: '164.5px' }}>
                        {view.minor.map(m => <option value={view.genreCode[view.minor.indexOf(m)]}>{m}</option>)}
                    </select>
                </div>
            )
        }
        return (
            <div className='dropdownMain'>
                <select id='mainSearch' style={{ width: '164.5px' }} onChange={(e) => this.setState({ selectedView: e.target.value })}>
                    {VIEWS.map(({ name }) => <option value={name}>{name}</option>)}
                </select>

                {getMajorMethod()}
            </div>
        )
    }
}

//This renders the objects to the page
ReactDOM.render(
    <Navigation />,
    document.getElementById('root')
);

$("#account-details").hide();
$("#log-off-button").hide();
$("#watch-button").hide();
$("#add-to-watch-list-button").hide();
$("#add-to-watch-list-button-tv").hide();
$("#signup-email-error").css("color", "red");
$("#signup-password-error").css("color", "red");
$("#login-email-error").css("color", "red");
$("#login-password-error").css("color", "red");
$("#signup-email-error").hide();
$("#signup-password-error").hide();
$("#login-email-error").hide();
$("#login-password-error").hide();





