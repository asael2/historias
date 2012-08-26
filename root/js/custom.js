var opened = false,
mp3media ="",
elPlayer = $("#el_jplayer"),
dataSource = 'loadxml.php',
playerStatus = false;

	function loadPlayer(mp3media){
		elPlayer.jPlayer("destroy");
		elPlayer.jPlayer({
	        ready: function(event) {
	            $(this).jPlayer("setMedia", {mp3: mp3media});
	            $(this).jPlayer("swfPath", "http://www.adobe.com/flashplayer");
	            $(this).jPlayer("supplied", "mp3");
	            $(this).jPlayer("play", 1);
	            $(this).jPlayer("volume", 1.5);
			}
	    });
	}

	var historyView = { 

		loadPlayer: function(){			
			/*Historias page init binding*/
			var mp3media = $('mediaurl', this)
			$("#playerPage").bind('pageinit', function(){
				loadPlayer(mp3media);
			});//page init eof 
		},

		getList : function(){
		
			var elink = this.elink;

			$.getJSON(dataSource, function(json){
			    $.each(json.channel.item,function(i,item) {
			     	title = item.title;
			     	title = title.replace("Historia del Mundo- ", "")
					elink = this.enclosure["@attributes"].url;
					//print every item
					historyView.printItem(title, elink);
			   	});
		 	});
			
		},//getList eof  
		
		printItem : function(title, elink){
			$("#fullist").append(
				$('<li>').append(
					$('<a>').attr("mediaurl", elink).attr("href", '#playerPage').attr("data-transition", "slide").on("click", function(){
						console.log(elink);
						loadPlayer(elink);
						$(".playerTitle").text(title);
						$("#activePlay").text(title).on("click", function(){  })
						var padre = $(this).parent().parent().parent();
						padre.css("opacity", "0.5");
						return opened = true;
					}).append(
						$('<span>').attr('class', 'episodio').append(title))));
			historyView.refreshList();
		},

		refreshList : function(){
			$("#fullist").listview("refresh");
			//$.mobile.hidePageLoadingMsg();
		}
		
		
		
	};//historias eof

	
	
$(document).ready(function() {

	historyView;

	$("#acaracol").bind('pageinit', function(){
		historyView.getList();
		elPlayer.jPlayer("play");
		$("#activePlay").hide();
	});//page init eof 

	$("#acaracol").bind('pageshow', function(){
		if(!opened){
			console.log("no estoy seguro de haberte visto");
			$("#activePlay").hide();
		}else{
			console.log("volviste?");
			$("#activePlay").show();
		}
	});//pageshow eof 

});
 	