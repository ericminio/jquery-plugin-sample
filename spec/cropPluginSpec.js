describe("Croper", function() {
	var croper = new Croper();
	
	beforeEach(function() {
		$('body').append("<img id='source'>");
		$('body').append("<img id='target'>");
	});

	it("can translate the target", function() {
		croper.init($('#source'), $('#target'));
		croper.translate({x : 3, y : 2 });

		expect($('#target').css('margin-left')).toEqual('3px');
		expect($('#target').css('margin-top' )).toEqual('2px');
	});
	
	it("can build a translation vector from a mouse event in the source", function() {
		croper.init({ offset : function() { return {left:10, top:20}; },
					  bind   : function() {} }, $('#target'));
		var event = { pageX : 2, pageY : 3 };
		
		expect(croper.buildTranslationFromEvent(event)).toEqual({ x:8, y:17 });
	});
	
	it("updates the target given the mouse event", function() {
		croper.init({ offset : function() { return {left:10, top:20}; },
					  bind   : function() {} }, $('#target'));
		var event = { pageX : 2, pageY : 3 };
		spyOn(croper, 'translate');
		croper.update(event);
		
		expect(croper.translate).toHaveBeenCalledWith({ x:8, y:17 });
		
	});
	
	describe("Plugin", function() {
		it("initializes the croper with the source and the target", function() {
			spyOn(croper, 'init').andCallThrough();
			$('#source').crop({'into' : $('#target'), 'withCroper' : croper});

			expect(croper.init).toHaveBeenCalledWith($('#source'), $('#target'));
		});
	});
	
	describe("initialization", function() {
		
		it("wedges target in the left top corner", function() {
			spyOn(croper, 'translate').andCallThrough();
			croper.init($('#source'), $('#target'));
			
			expect(croper.translate).toHaveBeenCalledWith({x : 0, y : 0 });
		});
		
		it("binds a mousemove event to update the target", function() {
			var source = { bind : function() { } };
			spyOn(source, 'bind' );
			croper.init(source, $('#target'));

			expect(source.bind).toHaveBeenCalledWith('mousemove', croper.update);
		});
		
	});
		
});