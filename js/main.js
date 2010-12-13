/**
 * mikedamage.github.com
 * Main JavaScript File
 */

//= require "jquery-1.4.4"
//= require "jquery.tmpl"

$(document).ready(function() {
	var $twitterFeed = $('#twitter')
		, twitterPipeURL = $twitterFeed.attr('data-pipeurl');
	
	$.ajax({
		url: twitterPipeURL
		, type: 'GET'
		, dataType: 'json'
		, success: function(json) {
			$twitterFeed.find('.loading').remove();
			var tweets = _(json.value.items).map(function(tweet) {
				var date = new Date(tweet.pubDate);
				return {
					description: tweet.description
					, date: date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
				};
			});
			window.tweets = tweets;
			$('#twitter-item').tmpl(tweets).appendTo($twitterFeed);
		}
	});
});

// vim: set sw=2 ts=2 syntax=jquery :
