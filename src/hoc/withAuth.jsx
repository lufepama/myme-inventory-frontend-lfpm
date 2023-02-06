import { Redirect, } from 'wouter'
import Cookies from 'js-cookie'

const withAuthentication = (Component) => (props) => {

    const csrftoken = Cookies.get('csrftoken')

    if (csrftoken) {
        return <Component {...props} />;
    } else return <Redirect to='/login/' />

};

export default withAuthentication;