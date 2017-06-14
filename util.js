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


util.extend(util, {
	throttle(method, time, context){
		clearTimeout(method.timer);
		method.timer = setTimeout(function(){
			method.apply(context);
		}, time);
	},

	animateClass(node, className, callback){
		function onAnimationend(){
			node.classList.remove(className);
			node.removeEventListener('animationend', onAnimationend);
			callback && callback();
		}
	
		node.addEventListener('animationend', onAnimationend);
	
		if(className && !node.classList.contains(className)){
			node.classList.add(className);
		}
	},

	JSONParse: function(content){
		try{
			return JSON.parse(content);
		} catch (err){
			return content;
		}
	},

	createSingle: function(fn){
    var result;
    return function(){
        if(!result){
          var args = [].slice.call(arguments);
          result = new fn(...args);
        }
        return result;
    }
	},

	delay(time){
		return new Promise( (resolve, reject) => {
			setTimeout(resolve, time);
		})
	},

	emitter: {
		on(event, fn){
			var handlers = this._handlers ||　(this._handlers = {}),
				calls = handlers[event] || (handlers[event] = []);
			calls.push(fn); 
			return this;
		},
		off(event, fn){
			if(!event || !this._handlers) this._handlers = {};
			var handlers = this._handlers,
				call;
			if(calls = handlers[event]){
				if(!fn){
					calls = [];
					return this;
				} else {
					for(var i = calls.length - 1; i > -1; i++){
						if(fn === calls[i]){
							calls.splice(i, 1);
							return this;
						}
					}
				}
			}
			return this;
		},
		emit(event){
			var data = [].slice.call(arguments, 1),
				handlers = this._handlers, 
				calls;
			if (!handlers || !(calls = handlers[event])) return this;
			calls.forEach(fn => fn.apply(this, data));
			return this;
		}
	},
	ramda: {
		
	}						
})

