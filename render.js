const zerorpc = require("zerorpc")

let client = new zerorpc.Client()

//connect to client
client.connect("tcp://127.0.0.1:4242")

//check server status
client.invoke("echo", "server ready", (error, res) => {
  if(error || res !== 'server ready') {
    console.error(error)
  } else {
    console.log("server is ready")
  }
})

var a,b;
let result = document.getElementById("result");


//Event listener function for add button
document.getElementById("button").addEventListener('click', () => {

	a=document.getElementById("first").value;
	b=document.getElementById("second").value;
 
	//validation check
	if(!validateNumber(a) || !validateNumber(b)  ){
		alert("Please enter a valid number!");
		return;
	}

	//pass arguments and call server side function
	client.invoke("add", a, b, (error, res) => {
		if(error) {
			console.error(error)
		}
		else {
			console.log("a "+a)
			console.log("b "+b)
			result.value = res
			console.log("result value "+ result.value)
		}
	})
})

//validation function
function validateNumber(num)
	{
		var re = /-{0,1}[0-9]{1,}.{0,1}[0-9]{0,}/
		return re.test(num);
	}



