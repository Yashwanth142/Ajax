let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function showTime()
{
    const date=new Date();
    return date.getHours()+"Hrs: "+date.getMinutes()+"Mins: "+date.getSeconds()+"Secs";

}

function makeAJAXCall(methodType,url,callback,async=true,data=null)
{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==4){
            if(xhr.status==200||xhr.status==201)
            {
                callback(xhr.responseText);
            }
            else if(xhr.status>=400)
            {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }

    }
    xhr.open(methodType,url,async);

    if(data)
    {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else
    xhr.send();
    console.log(methodType+" request sent to the server"+showTime());
}

const getURL="http://localhost:4000/employees/1";

function getUserDetails(data)
{
    console.log("Ger user Data at: "+showTime()+" data: "+data);
}
//makeAJAXCall("Get",getURL,getUserDetails,true);

const postURl="http://localhost:4000/employees";
const empData={"name":"Harry","salary":5000};

function userAdded(data)
{
    console.log("User Added: "+data);
}
makeAJAXCall("POST",postURl,userAdded,true,empData);
/*.then(responseText=>
{
    console.log("User Added: "+responseText)
}).catch(erroe=>console.log("Post Error Status: "+JSON.stringify(erroe)));*/