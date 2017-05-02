var util = (function(){

	let class2type = {};

	('Boolean Number String Function Array Date RegExp Object Error Symbol')
		.split(' ')
		.forEach( key => {
			class2type[ "[object " + key + "]" ] = key.toLowerCase();
		})

	
	const hasOwn = function(class2type){
		return class2type.hasOwnProperty;
	};

	const isPlainObject = function(obj){
		if(!obj || Object.prototype.toString(obj) !== "[object Object]"){
			return false;
		}
		let proto = Object.getPrototypeOf(obj);
		//jQuery源码，不明白为什么这么麻烦
		//Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		let constructor = proto.hasOwnProperty('constructor') && proto.constructor;
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
	// debugger;
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
// debugger;
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


