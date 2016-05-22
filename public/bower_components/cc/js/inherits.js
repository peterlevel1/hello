;(function () {

	/**
	 * methods should be an object
	 * @param  {Object}  methods 
	 * @return {Boolean}         
	 */
	function isObject(methods) {
		return Object.prototype.toString.call(methods) === '[object Object]';
	}

	/**
	 * @param  {Function} newMethod
	 * @return {Boolean}
	 */
	function superTest(newMethod) {
		return typeof newMethod === 'function' 
			&& /\b_super\b/.test(newMethod.toString());
	}

	/**
	 * @param  {Function} newMethod 
	 * @param  {Function} srcMethod 
	 * @return {Function}
	 */
	function extendsMethod(newMethod, srcMethod) {
		return function () {
			var srcSuper = this._super;

			this._super = srcMethod;

			var ret = newMethod.apply(this, arguments);

			this._super = srcSuper;

			return ret;
		}
	}

	/**
	 * @param  {Function} Super 
	 * @param  {Object} methods 
	 */
	Function.prototype.inherits = function inherits(Super, methods) {
		if (typeof Super !== 'function') {
			throw new TypeError('[inherits]: Super is not {Function}');
		}

		if (methods && !isObject(methods)) {
			throw new TypeError('[inherits]: methods is not {Object}');	
		}

		var thisProto = this.prototype = Object.create(Super.prototype);

		if (methods) {
			var name, newMethod, srcMethod;

			for (name in methods) {

				if (!methods.hasOwnProperty(name)) {
					continue;
				}

				newMethod = methods[name];

				if (typeof newMethod !== 'function') {
					continue;
				}

				srcMethod = thisProto[name];

				thisProto[name] = !srcMethod || !superTest(newMethod)
					? newMethod
					: extendsMethod(newMethod, srcMethod);
			}
		} 

		this._super = Super;

		Object.defineProperties(thisProto, {
			constructor: {
				value: this,
				enumerable: false
			},
			_super: {
				value: null,
				enumerable: false,
				writable: true,
				configurable: true
			},
			toString: {
				value: function () {
					return '[object ' + this.constructor.name + ']';
				},
				enumerable: false
			}
		});
	}

})();






