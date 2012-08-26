
require(["jquery"], function($) {
	
	function get_img(type) {
		return "graphics/wikipedia/" + type[0] + "_" + type[1] + ".svg";
	}
	
	function get_option() {
		var items = [
			"Kenraali", 
			"Kenraaliluutnantti", 
			"Kenraalimajuri", 
			"Prikaatikenraali", 
			"Eversti",
			"Everstiluutnantti",
			"Majuri",
			"Kapteeni",
			"Yliluutnantti",
			"Luutnantti",
			"V‰nrikki",
			"Sotilasmestari",
			"Yliv‰‰peli",
			"V‰‰peli",
			"Ylikersantti",
			"Upseerikokelas",
			"Kersantti",
			"Upseerioppilas",
			"Alikersantti",
			"Korpraali",
			"Aliupseerioppilas",
			"Sotamies"
		];
		return items[Math.floor(Math.random()*items.length)];
	}
	
	function init_test() {
		var items = [get_option(), get_option(), get_option(), get_option()];
		var right_item = Math.floor(Math.random()*items.length);
		
		$("#test_content .hint").text(items[right_item]);

		for(i in items) {
			if(i === right_item) {
				$("#test_content .link_option" + (i+1)).click(function() {
					alert("OK");
				});
			} else {
				$("#test_content .link_option" + (i+1)).click(function() {
					alert("FAIL");
				});
			}
			$("#test_content .img_option" + (i+1)).attr("src", get_img([items[i], "kauluslaatta"]));
		}
		
	}
	
    $(function() {
		init_test();
    });
});
