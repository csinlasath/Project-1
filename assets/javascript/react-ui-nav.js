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
            <MyWatchList />
        </header>
    );
}

const WatchButton = () => {
    return (
        <button id='watch-button' className='btn btn-outline-danger my-2 my-sm-0' type='submit' data-toggle='modal' data-target='#watch-modal'>My Watch List</button>
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
                                <label htmlFor='first-name-field'>First Name</label>
                                <input id='first-name-field' className='form-control' type='text' placeholder='John'></input>
                                <label htmlFor='last-name-field'>Last Name</label>
                                <input id='last-name-field' type='text' className='form-control' placeholder='Doe'></input>
                                <label htmlFor='sign-up-email-field'>Email Address</label>
                                <input id='sign-up-email-field' type='email' className='form-control' placeholder='johndoe@johndoe.com'></input>
                                <label htmlFor='sign-up-password-field'>Password</label>
                                <input id='sign-up-password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
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
                                <div className='list-group'>
                                    <a href="#" className="list-group-item list-group-item-action active">
                                        My Watch List</a>
                                    <a href="#" className="list-group-item list-group-item-action">Seven</a>
                                    <a href="#" className="list-group-item list-group-item-action">Forrest Gump</a>
                                    <a href="#" className="list-group-item list-group-item-action"> Whatever </a>
                                    <a href="#" className="list-group-item list-group-item-action"> Whatever#2</a>
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
                            <label htmlFor='login-password-field'>Password</label>
                            <input id='login-password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
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
                        <button type='button' className='close' data-dismiss='modal'></button>
                    </div>
                    <div id='media-modal-body' className='modal-body'>

                    </div>
                    <div className='modal-footer'>
                        <p><a data-toggle='modal' className='click' data-target='#' data-dismiss='modal'></a></p>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button type='button' className='btn btn-primary'>Add to Watch List</button>
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
            <a className='nav-link dropdown-toggle' href='#' id='loginDropdownMenuLink' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' aria-label='Toggle navigation'>{ props.accountName }</a>
            <div className='dropdown-menu' aria-labelledby='loginDropdownMenuLink'>
                <a id='login-button' className='dropdown-item' data-toggle='modal' data-target="#login-modal"> { props.listItemOne }</a>
                <a id='sign-up-button' className='dropdown-item' data-toggle='modal' data-target='#sign-up-modal'>{ props.listItemTwo }</a>
                <a id='account-details' className='dropdown-item' href='#'>{ props.listItemThree }</a>
                <a id='log-off-button'className='dropdown-item' href='#'>{ props.listItemFour }</a>
            </div>
        </li>
    );
}
//Creates object to switch between different types of searches
const SearchTypeSwitch = (props) => {
    return (
        <select id='search-type-selector' className='form-control form-inline'>
            <option>{ props.searchTypeOne }</option>
            <option>{ props.searchTypeTwo }</option>
            <option>{ props.searchTypeThree }</option>
            <option>{ props.searchTypeFour }</option>
        </select>
    );
}
//This object creates the search bar
const Searchbar = () => {
    return (
        <form className='form-inline'>
            <SearchTypeSwitch 
                searchTypeOne="Title"
                searchTypeTwo="Genre"
                searchTypeThree="Actor/Actress"
                searchTypeFour="Plot"
            />
            <input id='search-bar' className='form-control mr-md-6' type='search' placeholder='Type in Text' aria-label='Search'></input>
            <button id='submit-button' className='btn btn-outline-danger my-2 my-sm-0' type='submit'>Search</button>
        </form>
    );
}
//This creates the Navbar
const Navbar = (props) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <a id='home-button' className='navbar-brand' href='#'>{ props.siteName }</a>
            <Searchbar />
            <WatchButton />
            <LoginDropdown 
                accountName="John Doe" 
                listItemOne="Login" 
                listItemTwo="Sign-up" 
                listItemThree="Account Details" 
                listItemFour="Log off"
            />
        </nav>
    );
}

//This renders the objects to the page
ReactDOM.render(
    <Navigation />,
    document.getElementById('root')
);





