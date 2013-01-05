describe("Croper", function() {
	var croper = new Croper();
	
	beforeEach(function() {
		$('body').append("<img id='source'>");
		$('body').append("<img id='target'>");
	});
	
	describe("Core", function() {

		it("translating the target sets its top and left margins", function() {
			croper.init($('#source'), $('#target'));
			croper.translateTarget({ x:3, y:2 });

			expect($('#target').css('margin')).toEqual('2px 0px 0px 3px');
		});

		it("builds a translation vector" + 
		   ", from the event and the source's position in the page," +
		   " to be used to translate the target", function() {
			var source = { offset : function() { return { left:100,   top:20 }; }, bind : function() {} };
			croper.init(source, $('#target'));
						
			expect(croper.buildTranslationFromEvent(   { pageX:102, pageY:23 })).
												toEqual(   { x: -2,    y: -3 } );
		});
		
	});

	describe("Plugin usage", function() {
		it("initializes the croper with the source and the target", function() {
			spyOn(croper, 'init').andCallThrough();
			$('#source').crop({'into' : $('#target'), 'withCroper' : croper});

			expect(croper.init).toHaveBeenCalledWith($('#source'), $('#target'));
		});
	});
	
	describe("Initialization", function() {
		
		it("wedges target in the left top corner", function() {
			spyOn(croper, 'translateTarget').andCallThrough();
			croper.init($('#source'), $('#target'));
			
			expect(croper.translateTarget).toHaveBeenCalledWith({ x:0, y:0 });
		});
		
		it("binds target update to mousemove events", function() {
			var source = { bind : function() { } };
			spyOn(source, 'bind' );
			croper.init(source, $('#target'));

			expect(source.bind).toHaveBeenCalledWith('mousemove', croper.update);
		});
		
	});
			
	describe("Mousemove listener", function() {
		
		it("builds the correct translation vector from the given event", function() {
			croper.init($('#source'), $('#target'));
			spyOn(croper, 'buildTranslationFromEvent').andCallThrough();
			var event = jQuery.Event("mousemove");
			$('#source').trigger( event );

			expect(croper.buildTranslationFromEvent).toHaveBeenCalledWith(event);
		});

		it("translates the target with the translation vector built from the event", function() {
			croper.init($('#source'), $('#target'));
			var vector = { x:'any', y:'any' };
			spyOn(croper, 'buildTranslationFromEvent').andReturn(vector);
			spyOn(croper, 'translateTarget');
			$('#source').trigger( jQuery.Event("mousemove") );

			expect(croper.translateTarget).toHaveBeenCalledWith(vector);
		});
		
	});
	
});