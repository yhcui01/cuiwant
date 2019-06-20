(function(w){
	w.gesture = function (node,callback){
				var isStart = false;
				var startD = 0;
				var startC = 0;
				node.addEventListener('touchstart',function(event){
					var touch = event.touches;
					if(touch.length >= 2){
						isStart = true;
						
						startD = getD(touch[0],touch[1]);
						startC = getC(touch[0],touch[1]);
						
						if(callback && typeof callback['start'] == 'function'){
							callback['start']();
						}
					}
				});
				
				node.addEventListener('touchmove',function(event){
					var touch = event.touches;
					if(touch.length >= 2){
						
						var endD = getD(touch[0],touch[1]);
						event.deg = endD - startD;
						
						var endC = getC(touch[0],touch[1]);
						event.scale = endC /startC;
						
						
						if(callback && typeof callback['change'] == 'function'){
							callback['change'](event);
						}
					}
				});
				
				node.addEventListener('touchend',function(event){
					var touch = event.touches;
					if(isStart && touch.length < 2){
						if(callback && typeof callback['end'] == 'function'){
							callback['end']();
						}
					}
					isStart = false;
				});
			}
			
			
	w.getD = function (p1,p2){
				var disX = p1.clientX - p2.clientX;
				var disY = p1.clientY - p2.clientY;
				var value = Math.atan2(disY,disX); 
				
//				180:pi = ?:value
				var deg = 180 * value / Math.PI;
				return deg;
			}
			
	w.getC = function (p1,p2){
				var disX = p1.clientX - p2.clientX;
				var disY = p1.clientY - p2.clientY;
				var value = Math.sqrt(disX*disX + disY*disY); 
				return value;
			}
			
})(window);
