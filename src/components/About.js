import React from 'react';
import User from './User';
import UserClass from './UserClass';
import { Component } from 'react';
import UserContext from '../utils/UserContext';

class About extends React.Component {
    constructor(props) {
        super(props);

        // console.log("Parent Constructor");
    }
    componentDidMount() {
        // console.log("Parent Component Did Mount");
    }
    render() {
        // console.log("Parent Render");
        return (
            <div>
                <h1>This is About Page</h1>
                <div>
                    Logged In User
                    <UserContext.Consumer>
                        {({loggedInUser}) => <h1 className='text-lg font-bold'>{loggedInUser}</h1>}

                    </UserContext.Consumer>
                </div>
                <UserClass/>
                {/* <UserClass name="Altaf Tamboli(Class)" location="Pune(Class)"/> */}
                
            </div>
        );
    }
};

export default About;