var sliderContainer, sliderContainerWt;
var sliderHandleWt;
$(document).ready(function(){
  sliderContainer = $("#sliderContainer");
  sliderContainerWt = sliderContainer.outerWidth();
  sliderHandleWt = $("#slider_adj_1").outerWidth();

  setLeftPosition();
  setDraggable();
  bindMouseUp();

  updateGraph();
});

function setLeftPosition(){
  var wt = sliderContainerWt/3;
  $(".slider").css({"width": wt+"px" })
  var sliderHandlePos_1 = wt-sliderHandleWt/2;
  var sliderHandlePos_2 = wt*2-sliderHandleWt/2;
  $("#slider_adj_1").css({"left": sliderHandlePos_1+"px"});
  $("#slider_adj_2").css({"left": sliderHandlePos_2+"px"});
}

function updateGraph(){
  var a_wt = parseInt(($("#slider_a").width()/sliderContainerWt*100).toFixed(0));
  var b_wt = parseInt(($("#slider_b").width()/sliderContainerWt*100).toFixed(0));
  var c_wt = parseInt(($("#slider_c").width()/sliderContainerWt*100).toFixed(0));

  $("#slider_adj_1").html(a_wt);
  $("#slider_adj_2").html(b_wt+a_wt);

  return { a: a_wt, 
          b: b_wt,
          c: c_wt 
         }
}

function bindMouseUp(){
  $("#slider_adj_1, #slider_adj_2").on("mouseout", function(){
    $("#slider_adj_1, #slider_adj_2").draggable( "destroy" );
  });
  $("#slider_adj_1, #slider_adj_2").on("mouseover", function(){
    setDraggable();
  });
}

function setDraggable(){
  var maxLeft = $("#slider_a").offset().left-(sliderHandleWt/2);
  var maxRight = $("#slider_b").offset().left+$("#slider_b").outerWidth()-(sliderHandleWt/2);
  var startX, start_a_Wt, start_b_Wt, start_c_Wt;
  $("#slider_adj_1").draggable({
    axis: 'x',
    containment: [ maxLeft, 0, maxRight, 0 ],
    refreshPositions: true,
    start: function(event, ui){
      startX = $(this).position().left;
      start_a_Wt = $("#slider_a").width();
      start_b_Wt = $("#slider_b").width();
    },
    drag: function(event, ui){
      var endX = $(this).position().left;
      var finalX = endX - startX;
      var slider_a = start_a_Wt + finalX;
      var slider_b = start_b_Wt - finalX;
      $("#slider_a").css("width", slider_a+"px");
      $("#slider_b").css("width", slider_b+"px");
      updateGraph();
    },
    stop: function(event, ui){
      maxLeft = $("#slider_a").position().left;
      maxRight = $("#slider_c").position().left;
    }
  });

  var maxLeft_2 = $("#slider_a").offset().left+$("#slider_a").outerWidth()-(sliderHandleWt/2);
  var maxRight_2 = $("#slider_a").offset().left+sliderContainerWt-(sliderHandleWt/2);
  $("#slider_adj_2").draggable({
    axis: 'x',
    containment: [ maxLeft_2, 0, maxRight_2, 0 ],
    start: function(event, ui){
      startX = $(this).position().left;
      start_b_Wt = $("#slider_b").width();
      start_c_Wt = $("#slider_c").width();
    },
    drag: function(event, ui){
      var endX = $(this).position().left;
      var finalX = endX - startX;
      var slider_b = start_b_Wt + finalX;
      var slider_c = start_c_Wt - finalX;
      $("#slider_b").css("width", slider_b+"px");
      $("#slider_c").css("width", slider_c+"px");
      updateGraph();
    },
    stop: function(event, ui){
      maxLeft_2 = $("#slider_b").offset().left;
      maxRight_2 = $("#slider_c").offset().left + $("#slider_c").width();
    }
  });
}