import { Redirect, } from 'wouter'
import Cookies from 'js-cookie'

//This Higher Order Component (HOC) manages the privacy of the routes

const withAuthentication = (Component) => (props) => {

    const csrftoken = Cookies.get('csrftoken')

    if (csrftoken) {
        return <Component {...props} />;
    } else return <Redirect to='/login/' />

};

export default withAuthentication;