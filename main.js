
require(["jquery"], function($) {
	
	var game_state = {
		'start_time': undefined,
		'score': 0,
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
			//"Upseerioppilas",
			"Alikersantti",
			"Korpraali",
			//"Aliupseerioppilas",
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
	
	function end_game() {
		$('#end_game').modal('show');
		if(game_state.single_content) {
			game_state.single_content.remove();
			game_state.single_content = undefined;
		}
		game_state = {
			'start_time': undefined,
			'score': 0,
			'tries': 0,
			'successes': 0,
			'fails': 0
		};
	}
	
	function start_game() {
		init_single();
		game_state.start_time = new Date();
		
		setInterval(function(){
			var now = new Date(),
				time_secs = (now.getTime() - game_state.start_time.getTime()) / 1000,
				progress = time_secs >= 60 ? 100 : Math.floor(time_secs/60*100);
			$('.game_state .progress .bar').css('width', progress + '%');
			if(time_secs >= 60) end_game();
		},500);
	}
	
	function init_single() {
		var content = $("#test_content").clone().show();
		game_state.single_content = content;
		game_state.single_start_time = new Date();
		function end_single(success) {
			var now = new Date(), 
				time = (now.getTime() - game_state.single_start_time.getTime()) / 1000;
			
			//alert("end_single()");
			game_state.tries++;
			if(success) {
				game_state.successes++;
				if(time <= 2) {
					game_state.score += 100;
				} else if(time <= 6) {
					game_state.score += 50;
				} else if(time <= 16) {
					game_state.score += 10;
				} else {
					game_state.score += 1;
				}
			} else {
				game_state.fails++;
				
				if(game_state.score >= 100) { game_state.score -= 100; }
				else { game_state.score = 0; }
			}

			game_state.single_start_time = undefined;
			content.remove();
			game_state.single_content = undefined;
			init_single();
		}
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
						end_single(true);
					});
				} else {
					content.find(".link_option" + n).click(function() {
						end_single(false);
					});
				}
				content.find(".img_option" + n).attr("src", get_img([items[i], "kauluslaatta"]));
			})(nn);
		}
		
		$(".game_state .score").text(game_state.score);
		$(".game_state .successes").text(game_state.successes);
		$(".game_state .fails").text(game_state.fails);
	}
	
    $(function() {
		$("#start_game").modal('show');
		$("#start_game .btn").click(function(){
			$("#start_game").modal('hide');
			start_game();
		});
		$("#end_game .btn").click(function(){
			$("#end_game").modal('hide');
			start_game();
		});
		$("#test_content").hide();
		
		//init_single();
    });
});
