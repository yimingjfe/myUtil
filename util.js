var util = (function(){
	const isPlainObject = function(obj){
		if(!obj || Object.prototype.toString(obj) !== "[object Object]"){
			return false;
		}
		let proto = Object.getPrototypeOf(obj);
		let constructor = proto.hasOwnProperty(proto.constructor) && proto.constructor;
		return typeof constructor === "function" && constructor.toString() === Object.toString();
	};

	const extend = function(){
		//i指向第一个src对象
		let i = 1,
				options,
				deep = false,
				target = arguments[0],
				length = arguments.length,
				src,
				copy;
	
		if(typeof target === 'boolean'){
			deep = target;
			target = arguments[i] || {};
			i++;
		}
		
		//extend util itself
		if(i === length){
			target = this;
			i--;
		}
	
		for( ; i < length; i++){
			if((options = arguments[i]) != null){
	
				for(let name in options){
					src = target[name];
					copy = options[name];
					if( src === copy ){
						continue;
					}

					let copyIsArray = false;
	
					if(deep && copy && ( isPlainObject(copy) || 
						( copyIsArray = Array.isArray(copy)) ) ){

						if(copyIsArray){
							src = src && Array.isArray(src) ? src : [];
						} else {
							src = src && isPlainObject(src) ? src : {};
						}

						target[ name ] = extend(deep, src, copy);

					} else if (copy !== undefined){
						target[ name ] = copy;
					}
				}
			}
		}
	
		return target;
	}

	return{
		isPlainObject,
		extend
	}	

})();

