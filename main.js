
require(["jquery"], function($) {
	
	var stats = {
		'tries': 0,
		'successes': 0,
		'fails': 0
	};
	
	function get_img(type) {
		return "graphics/wikipedia/" + type[0] + "_" + type[1] + ".svg";
	}
	
	function get_options(size) {
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
			"Vänrikki",
			"Sotilasmestari",
			"Ylivääpeli",
			"Vääpeli",
			"Ylikersantti",
			"Upseerikokelas",
			"Kersantti",
			"Upseerioppilas",
			"Alikersantti",
			"Korpraali",
			"Aliupseerioppilas",
			"Sotamies"
		];
		function randOrd(){ return (Math.round(Math.random())-0.5); }
		items.sort( randOrd );
		var ret = [];
		for(var i=0; i!=size; i++) {
			ret.push(items.shift());
		}
		return ret;
	}
	
	function init_test() {
		function end_game(success) {
			//alert("end_game()");
			stats.tries++;
			if(success) {
				stats.successes++;
			} else {
				stats.fails++;
			}
			content.remove();
			init_test();
		}
		var content = $("#test_content").clone().show();
		content.appendTo('#content');
		var items = get_options(4);
		var right_item = 1 + Math.floor(Math.random()*items.length);
		//alert("right_item = " + right_item);
		content.find(".hint").text(''+items[right_item-1]);
		
		var nn = 0;
		for(i in items) {
			nn = nn + 1;
			//alert( nn + " == " + items[i]);
			(function(n) {
				if(n === right_item) {
					content.find(".link_option" + n).click(function() {
						end_game(true);
					});
				} else {
					content.find(".link_option" + n).click(function() {
						end_game(false);
					});
				}
				content.find(".img_option" + n).attr("src", get_img([items[i], "kauluslaatta"]));
			})(nn);
		}
		
		$("#stats .successes").text(stats.successes);
		$("#stats .fails").text(stats.fails);
	}
	
    $(function() {
		$("#test_content").hide();
		init_test();
    });
});
