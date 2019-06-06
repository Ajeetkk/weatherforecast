import React from 'react';
import axios from 'axios';
import './home.css';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            wfd2: []
        }
    }

componentDidMount(){

    axios.get('http://api.openweathermap.org/data/2.5/forecast?zip=94040&appid=cabd7b07e0a83ca8fffb66ca5bbece57')
    .then(res => {

        let dd = "response data";
        this.setState({
            wfd2:res.data
            
        }, () => {
            console.log(this.state.wfd2);
        })
        
    });
    
}


  render(){
    
    let dateFormate = (data) => {
        let showToday = "";
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ];
        let systemDate = new Date();
        let getSystemDayNumber = systemDate.getDate();
        
         data = new Date(data);
        let dayNumber = data.getDate();
        let dayName = days[data.getDay()];
        let monthNane =  monthNames[data.getMonth()];
        let month = data.getMonth();
       let year = data.getFullYear();
       
       if(getSystemDayNumber == dayNumber){
        showToday = "Today"
       }
        return  dayName + " "+ dayNumber + " " + monthNane +" " + year +" "+showToday;
    }
      
    let showImages = (des) =>{
       if(des == "clear sky"){
            return <img src="https://openweathermap.org/img/w/01d.png"></img> 
       }else{
        return <img src="https://openweathermap.org/img/w/10d.png"></img>
       }
    }


    return(
      <div>
        <h3 className="heding-wf-d"> 5 day weather forecast</h3>
        <h4 className="city-country-heading">
         
            City : {this.state.wfd2 && this.state.wfd2.length !== 0 && this.state.wfd2.city.name} <br />
            Country  : {this.state.wfd2 && this.state.wfd2.length !== 0 && this.state.wfd2.city.country}
            
        </h4> 
        <table style={{ margin: '0 auto'}}>
            <tbody>
        {
            
            this.state.wfd2 && this.state.wfd2.length !== 0 && this.state.wfd2.list.map((data, index) => 
            <tr style={{outline: '1px solid #9f9797', font: "400 14px/1.4 Roboto,Arial,sans-serif", padding: "15px"}} key={index}>
                <td style={{padding:'10px'}}>
                                    { 
                   dateFormate(data.dt_txt)
                }
                
                {
                    showImages(data.weather[0].description)
                }
                </td>
                
                <td style={{}}>

                <span style={{background: "#f0ad4e", padding:"2px"}}> { Math.round(((data.main.temp_min) - 32) * 5 / 9)}&#8451; </span> &nbsp;&nbsp;
                <span style={{background: "#f0ad4e", padding:"2px"}}> { Math.round(((data.main.temp_max) - 32) * 5 / 9)}&#8451; </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
               {data.weather[0].description}&nbsp;&nbsp; <br />
                {data.wind.speed}m/s <br />
                clouds: {data.clouds.all}% , {data.main.pressure}hpa
                </td>
               
            </tr>
           
            )
        }
            </tbody>
        </table>


      </div>
    )
  }
}



export default Home;
