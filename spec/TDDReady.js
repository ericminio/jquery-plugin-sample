describe("TDD", function() {

	it("Ready for vanilla javascript", function() {
		expect(1+2).toEqual(3);
	});
	
	it("Ready for jQuery too", function() {
		expect($('<body></body>')).toBe('body');
	});
});