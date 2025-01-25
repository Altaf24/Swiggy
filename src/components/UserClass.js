import React  from "react"

class UserClass extends React.Component {
   constructor(props){
    super(props);
    this.state = {
        userInfo : {
            name: "Tony StarK",
            location: "New York",
           
        },

    };
    // console.log("Child Constructor");

   }
   async componentDidMount(){
   
    //API CALL this method is called
    const data = await fetch("https://api.github.com/users/Altaf24");
    const json = await data.json();

    this.setState({
        userInfo: json,
    });

    console.log(json);


   }

   

    render() {
        const {name, location,avatar_url} = this.state.userInfo;
      


        return (
            <div className='user-card'>
                <img src={avatar_url} alt={name} />
                <h2>Name :{name}</h2>
                <h3>Frontend Developer</h3>
                <h3>{location}</h3>
                <h4>Contact : 123456789</h4>
                
              
            </div>
          );
    }
}

export default UserClass;