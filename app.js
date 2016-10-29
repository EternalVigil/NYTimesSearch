	// Built by LucyBot. www.lucybot.com
var searchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var key = "ca789060234c4688a4bc3a324e26de6c";
var keyword = "";
var startDate = "";
var endDate = "";
var recordsLimit = 0;

$("#submit").on("click",function(){
keyword = $("#searchTerm").val();
startDate = $("#startYear").val(); //Format YYYYMMDD
endDate = $("#endYear").val();
recordsLimit = $("#numRecords").value;	

searchURL += '?' + $.param({
    'api-key': key,
    'q': keyword,
    'begin_date': startDate,
    'end_date': endDate
});

});

	
	
$.ajax({
  url: searchURL,
  method: "GET"
})
	
.done(function(result) {
  //console.log(result);
    
    for (var i = 0; i < recordsLimit; i++){
    var articleNum = "article" + i;
	
	//console.log(articleNum);
	
	var article = $("<div/>");	
    article.attr("id", articleNum);
	article.attr("class", "newsarticle");
		
	var currentArticle = result.response.docs[i];	
    var articleSection = $(currentArticle).attr("section_name");
		
    var headline = currentArticle.headline.main;
		
	var sectionType = $(currentArticle).attr("section_name");
    
	var byline = currentArticle.byline.original;
	var publishDate = $(currentArticle).attr("pub_date");
    var articleURL = $(currentArticle).attr("web_url");    
    
	$(article).html(headline + "<br>" + sectionType);
	$("#results").append(article);
	}
    
    
    })
.fail(function(err) {
      throw err;
    });
