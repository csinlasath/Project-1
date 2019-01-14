//This creates the header
const Navigation = () => {
    return (
        <header id='masthead'>
            <Navbar 
                siteName="Project 1"
            />
            <SignUp />
            <Login />
        </header>
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
                                <label htmlFor='email-field'>Email Address</label>
                                <input id='email-field' type='email' className='form-control' placeholder='johndoe@johndoe.com'></input>
                                <label htmlFor='password-field'>Password</label>
                                <input id='password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
                            </div>
                        </form>
                    </div>
                    <div className='modal-footer'>
                        <p>Have an account? <a data-toggle='modal' data-target='#login-modal' data-dismiss='modal'>Click Here</a></p>
                        <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                        <button type='button' className='btn btn-primary'>Sign-Up</button>
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
                            <label htmlFor='email-field'>Email Address</label>
                            <input id='email-field' type='email' className='form-control' placeholder='johndoe@johndoe.com'></input>
                            <label htmlFor='password-field'>Password</label>
                            <input id='password-field' type='password' className='form-control' placeholder='Minimum of 6 Characters'></input>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <p>Don't have an account? <a data-toggle='modal' data-target='#sign-up-modal' data-dismiss='modal'>Click Here</a></p>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Sign-Up</button>
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





