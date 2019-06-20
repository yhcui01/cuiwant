(function(w) {
	w.contentDrag = function(contentWrap,callback) {
		var navWrap = contentWrap;
		var navList = navWrap.firstElementChild;
		var startY = 0;
		var startX = 0;
		var eleY = 0;
		var s1 = 0;
		var s2 = 0;
		var t1 = 0;
		var t2 = 0;
		var isFirst = true;
		var tween = {
			 Linear: function(t,b,c,d){ return c*t/d + b; },
			 easeOut: function(t,b,c,d,s){
			            if (s == undefined) s = 1.70158;
			            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			        },
		}
		var timer = null;

		navWrap.addEventListener('touchstart', function(event) {
			var touch = event.changedTouches[0];
			navList.style.transition = 'none';

			eleY = transformCss(navList, 'translateY');
			startY = touch.clientY;
			startX = touch.clientX;
			s1 = eleY;
			t1 = new Date().getTime(); //毫秒
			isFirst = true;
			
			if(callback && typeof callback['start'] == 'function'){
				callback['start']();
			}
			
			clearInterval(timer);
			
		});

		navWrap.addEventListener('touchmove', function(event) {
			var touch = event.changedTouches[0];
			
			if(!isFirst){
				return;
			}
			
			var endY = touch.clientY;
			var endX = touch.clientX;
			var disY = endY - startY;
			var disX = endX - startX;
			//考虑防抖动的第一次滑
			if(Math.abs(disX) > Math.abs(disY)){
				if(isFirst){
					isFirst = false;//目的是为了让后面的move次有一个判断依据
					return;//禁止掉第一次的横向逻辑
				}
				
			}
			
			
			var lastY = eleY + disY;

			//橡皮筋
			if(lastY > 0) {
				//lastY的值在临界值内是一直增大的，但是每一次我们的阻力也会增大。也就是说每一次lastY削减的更厉害
				var scale = 0.6 - lastY / (3 * document.documentElement.clientHeight);
				lastY = lastY * scale;
			} else if(lastY < document.documentElement.clientHeight - navList.offsetHeight) {
				var temp = Math.abs(lastY) - Math.abs(document.documentElement.clientHeight - navList.offsetHeight);
				var scale = 0.6 - temp / (3 * document.documentElement.clientHeight);
				temp = temp * scale;
				lastY = document.documentElement.clientHeight - navList.offsetHeight - temp;

			}

			transformCss(navList, 'translateY', lastY);
			
			if(callback && typeof callback['move'] == 'function'){
				callback['move']();
			}
			
		});

		navWrap.addEventListener('touchend', function(event) {
			var touch = event.changedTouches[0];
			//加速：我们得获取到滑动这段距离的一个平均速度      v =  s/t
			s2 = transformCss(navList, 'translateY');
			t2 = new Date().getTime(); //毫秒 
			var speed = (s2 - s1) / (t2 - t1);
			var lastY = s2 + speed * 200;
			
			var type = 'Linear';
			var timeAll = 1;
			
			if(lastY > 0) {
				lastY = 0;
				type = 'easeOut';
			} else if(lastY < navWrap.clientHeight - navList.offsetHeight) {
				lastY = navWrap.clientHeight - navList.offsetHeight;
				type = 'easeOut';
			}
			
			tweenMove(type,lastY,timeAll);
			
			if(callback && typeof callback['endTrue'] == 'function'){
				callback['endTrue'](timer);
			}
			
			
			
			function tweenMove(type,lastY,timeAll){
				var t = 0;
				var b = transformCss(navList, 'translateY');
				var c = lastY - b;
				var d = timeAll/0.02    //总时间以及定时器一步的时间   20ms
				
				
				timer = setInterval(function(){
					if(t >= d){
						clearInterval(timer);
						if(callback && typeof callback['end'] == 'function'){
							callback['end']();
						}
					}else{
						t++;
						lastY = tween[type](t,b,c,d);
						transformCss(navList,'translateY',lastY);
						if(callback && typeof callback['move'] == 'function'){
							callback['move']();
						}
					}
				},20)
				
				
			}
			
			
			
			//回弹效果
//			var bezier = '';
//
//			if(lastY > 0) {
//				lastY = 0;
//				bezier = 'cubic-bezier(.17,.67,.74,1.76)';
//			} else if(lastY < document.documentElement.clientHeight - navList.offsetHeight) {
//				lastY = document.documentElement.clientHeight - navList.offsetHeight;
//				bezier = 'cubic-bezier(.17,.67,.74,1.76)';
//			}
//
//			navList.style.transition = '10s ' + bezier;
//			transformCss(navList, 'translateY', lastY);
//			
//			if(callback && typeof callback['end'] == 'function'){
//				callback['end']();
//			}

		});
	}
	//nav导航点击变色
})(window);