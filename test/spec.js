const Application = require('spectron').Application
const assert = require('assert');

describe('Test App', function () {

	let app;
	this.timeout(20000)
	
	const a = '#first';
	const b = '#second';

	before(function(){
		app = new Application({
		  //change the electron path
		  path: '/home/shraddha/final-project/node_modules/.bin/electron'
		  args: ['.']
		});
		return app.start()
			.catch(console.error)
  	});
	
	after(function(){
			if(app && app.isRunning()){
	      return app.stop();
	    }
	});

	
	//test to see if window opens
	it('opens initial window', function () {
    		return app.client.getWindowCount().then(function (count){
			assert.equal(count, 2)
		})
 	});

	//test to verify title
	it('verify app title', function () {
		return app.client.windowByIndex(1).getTitle().then(function (title){
			assert.equal(title, 'Addition App')
		})
	});

	//test initial input empty box 1
	it("test initial input box 1", function () {
            return app.client.getText('#first').then(function (input){
			assert.equal(input, '')
		})
        });

	//test initial input empty box 2
	it("test initial input box 2", function () {
            return app.client.getText('#second').then(function (input){
			assert.equal(input, '')
		})
        });

	//test initial input empty output box 
	it("test initial input output box", function () {
            return app.client.getText('#result').then(function (output){
			assert.equal(output, '')
		})
        });

	//test add button
	/*
	it("add button", function () {
            var d = app.client
		.setValue('#first', '12')
                .setValue('#second', '20')
		.click('#button');
		return app.client.waitUntilTextExists('#result','32',10000);
	});
	*/

});




