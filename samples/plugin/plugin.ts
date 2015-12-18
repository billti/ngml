declare var pluginFactories: Function[];

namespace ngml {
	function DoSomething(data){
		console.log("Running: " + data)
	}
	function CreateMyPlugin(){
		return DoSomething;
	}
	
	pluginFactories.push(CreateMyPlugin);
}
