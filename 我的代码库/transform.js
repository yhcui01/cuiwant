(function (w) {
	w.transformCss = function (node, name, value) {
		//我们得准备一个容器去存储给元素设置的transform属性值；
		//这个容器必须能区分开是给哪个元素存储的
		//而且这个容器如果存在，不能发生覆盖
		//最终我们的决定是传哪个dom元素对象，就在哪个元素对象身上创建存储属性值的对象
		// node 元素节点


		if (!node.transformObj) {
			node.transformObj = {};
		}

		if (arguments.length > 2) {
			node.transformObj[name] = value;
			var result = '';
			for (var key in node.transformObj) {
				switch (key) {
					case 'translateX':
					case 'translateY':
					case 'translateZ':
					case 'translate':
						result += key + '(' + node.transformObj[key] + 'px) ';
						break;
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'rotateZ':
					case 'skew':
					case 'skewX':
					case 'skewY':
						result += key + '(' + node.transformObj[key] + 'deg) ';
						break;

					case 'scale':
					case 'scaleX':
					case 'scaleY':
						result += key + '(' + node.transformObj[key] + ') ';
						break;
				}

			}
			node.style.transform = result;
		} else {
			var result = '';
			if (node.transformObj[name] == undefined) {
				if (name == 'scale' || name == 'scaleX' || name == 'scaleY') {
					result = '1';
				} else {
					result = 0;
				}
			} else {
				result = node.transformObj[name];
			}

			return result;
		}
	}

})(window);

