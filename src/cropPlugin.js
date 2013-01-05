Croper = function() {
	$croper = this;
	
	this.init = function(source, target) {
		this.source = source;
		this.target = target;
		this.translateTarget({ x:0, y:0 });
		this.source.bind('mousemove', this.update);
	}

	this.translateTarget = function(coordinate) {
		this.target.css('margin-left', coordinate.x + 'px');
		this.target.css('margin-top',  coordinate.y + 'px');
	}

	this.buildTranslationFromEvent = function(event) {
		return { x : this.source.offset().left - event.pageX, 
		         y : this.source.offset().top  - event.pageY };
	}
	
	this.update = function(event) {
		$croper.translateTarget($croper.buildTranslationFromEvent(event));
	}
		
};

(function ($) {
	
	$.fn.crop = function(options) {
		var croper = options['withCroper'] || new Croper();
		croper.init(this, options['into']);
	}
	
})(jQuery);
