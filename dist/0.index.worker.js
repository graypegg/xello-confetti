/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/bake.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/three/src/math/Math.js":
/*!*********************************************!*\
  !*** ./node_modules/three/src/math/Math.js ***!
  \*********************************************/
/*! exports provided: _Math */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Math", function() { return _Math; });
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

var _lut = [];

for ( var i = 0; i < 256; i ++ ) {

	_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );

}

var _Math = {

	DEG2RAD: Math.PI / 180,
	RAD2DEG: 180 / Math.PI,

	generateUUID: function () {

		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

		var d0 = Math.random() * 0xffffffff | 0;
		var d1 = Math.random() * 0xffffffff | 0;
		var d2 = Math.random() * 0xffffffff | 0;
		var d3 = Math.random() * 0xffffffff | 0;
		var uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

		// .toUpperCase() here flattens concatenated strings to save heap memory space.
		return uuid.toUpperCase();

	},

	clamp: function ( value, min, max ) {

		return Math.max( min, Math.min( max, value ) );

	},

	// compute euclidian modulo of m % n
	// https://en.wikipedia.org/wiki/Modulo_operation

	euclideanModulo: function ( n, m ) {

		return ( ( n % m ) + m ) % m;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// https://en.wikipedia.org/wiki/Linear_interpolation

	lerp: function ( x, y, t ) {

		return ( 1 - t ) * x + t * y;

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},

	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	degToRad: function ( degrees ) {

		return degrees * _Math.DEG2RAD;

	},

	radToDeg: function ( radians ) {

		return radians * _Math.RAD2DEG;

	},

	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	},

	ceilPowerOfTwo: function ( value ) {

		return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

	},

	floorPowerOfTwo: function ( value ) {

		return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

	}

};





/***/ }),

/***/ "./node_modules/three/src/math/Quaternion.js":
/*!***************************************************!*\
  !*** ./node_modules/three/src/math/Quaternion.js ***!
  \***************************************************/
/*! exports provided: Quaternion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quaternion", function() { return Quaternion; });
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math.js */ "./node_modules/three/src/math/Math.js");
/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */



function Quaternion( x, y, z, w ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._w = ( w !== undefined ) ? w : 1;

}

Object.assign( Quaternion, {

	slerp: function ( qa, qb, qm, t ) {

		return qm.copy( qa ).slerp( qb, t );

	},

	slerpFlat: function ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {

		// fuzz-free, array-based Quaternion SLERP operation

		var x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ],

			x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			var s = 1 - t,

				cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,

				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				var sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			var tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				var f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	}

} );

Object.defineProperties( Quaternion.prototype, {

	x: {

		get: function () {

			return this._x;

		},

		set: function ( value ) {

			this._x = value;
			this._onChangeCallback();

		}

	},

	y: {

		get: function () {

			return this._y;

		},

		set: function ( value ) {

			this._y = value;
			this._onChangeCallback();

		}

	},

	z: {

		get: function () {

			return this._z;

		},

		set: function ( value ) {

			this._z = value;
			this._onChangeCallback();

		}

	},

	w: {

		get: function () {

			return this._w;

		},

		set: function ( value ) {

			this._w = value;
			this._onChangeCallback();

		}

	}

} );

Object.assign( Quaternion.prototype, {

	isQuaternion: true,

	set: function ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	},

	clone: function () {

		return new this.constructor( this._x, this._y, this._z, this._w );

	},

	copy: function ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this._onChangeCallback();

		return this;

	},

	setFromEuler: function ( euler, update ) {

		if ( ! ( euler && euler.isEuler ) ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		var x = euler._x, y = euler._y, z = euler._z, order = euler.order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var cos = Math.cos;
		var sin = Math.sin;

		var c1 = cos( x / 2 );
		var c2 = cos( y / 2 );
		var c3 = cos( z / 2 );

		var s1 = sin( x / 2 );
		var s2 = sin( y / 2 );
		var s3 = sin( z / 2 );

		if ( order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if ( update !== false ) this._onChangeCallback();

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this._onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this._onChangeCallback();

		return this;

	},

	setFromUnitVectors: function ( vFrom, vTo ) {

		// assumes direction vectors vFrom and vTo are normalized

		var EPS = 0.000001;

		var r = vFrom.dot( vTo ) + 1;

		if ( r < EPS ) {

			r = 0;

			if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

				this._x = - vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = - vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	},

	angleTo: function ( q ) {

		return 2 * Math.acos( Math.abs( _Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].clamp( this.dot( q ), - 1, 1 ) ) );

	},

	rotateTowards: function ( q, step ) {

		var angle = this.angleTo( q );

		if ( angle === 0 ) return this;

		var t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;

	},

	inverse: function () {

		// quaternion is assumed to have unit length

		return this.conjugate();

	},

	conjugate: function () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this._onChangeCallback();

		return this;

	},

	dot: function ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	},

	lengthSq: function () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	},

	length: function () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	},

	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this._onChangeCallback();

		return this;

	},

	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	},

	premultiply: function ( q ) {

		return this.multiplyQuaternions( q, this );

	},

	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	},

	slerp: function ( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			var s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this._onChangeCallback();

		return this;

	},

	equals: function ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this._onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	},

	_onChange: function ( callback ) {

		this._onChangeCallback = callback;

		return this;

	},

	_onChangeCallback: function () {}

} );





/***/ }),

/***/ "./node_modules/three/src/math/Vector3.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Vector3.js ***!
  \************************************************/
/*! exports provided: Vector3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3", function() { return Vector3; });
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math.js */ "./node_modules/three/src/math/Math.js");
/* harmony import */ var _Quaternion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Quaternion.js */ "./node_modules/three/src/math/Quaternion.js");



/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

var _vector = new Vector3();
var _quaternion = new _Quaternion_js__WEBPACK_IMPORTED_MODULE_1__["Quaternion"]();

function Vector3( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

}

Object.assign( Vector3.prototype, {

	isVector3: true,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setScalar: function ( scalar ) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	clone: function () {

		return new this.constructor( this.x, this.y, this.z );

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	addScaledVector: function ( v, s ) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},

	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	applyEuler: function ( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion.setFromEuler( euler ) );

	},

	applyAxisAngle: function ( axis, angle ) {

		return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ) );

	},

	applyMatrix3: function ( m ) {

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	},

	applyMatrix4: function ( m ) {

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		var w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	},

	applyQuaternion: function ( q ) {

		var x = this.x, y = this.y, z = this.z;
		var qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	},

	project: function ( camera ) {

		return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );

	},

	unproject: function ( camera ) {

		return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );

	},

	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;
		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	},

	min: function ( v ) {

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	},

	max: function ( v ) {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	},

	clamp: function ( min, max ) {

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	},

	clampScalar: function ( minVal, maxVal ) {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	},

	clampLength: function ( min, max ) {

		var length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	},

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	// TODO lengthSquared?

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	manhattanLength: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() || 1 );

	},

	setLength: function ( length ) {

		return this.normalize().multiplyScalar( length );

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	lerpVectors: function ( v1, v2, alpha ) {

		return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

	},

	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		return this.crossVectors( this, v );

	},

	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},

	projectOnVector: function ( vector ) {

		var scalar = vector.dot( this ) / vector.lengthSq();

		return this.copy( vector ).multiplyScalar( scalar );

	},

	projectOnPlane: function ( planeNormal ) {

		_vector.copy( this ).projectOnVector( planeNormal );

		return this.sub( _vector );

	},

	reflect: function ( normal ) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	},

	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );

		// clamp, to handle numerical problems

		return Math.acos( _Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].clamp( theta, - 1, 1 ) );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	},

	manhattanDistanceTo: function ( v ) {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );

	},

	setFromSpherical: function ( s ) {

		return this.setFromSphericalCoords( s.radius, s.phi, s.theta );

	},

	setFromSphericalCoords: function ( radius, phi, theta ) {

		var sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );

		return this;

	},

	setFromCylindrical: function ( c ) {

		return this.setFromCylindricalCoords( c.radius, c.theta, c.y );

	},

	setFromCylindricalCoords: function ( radius, theta, y ) {

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	},

	setFromMatrixPosition: function ( m ) {

		var e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	},

	setFromMatrixScale: function ( m ) {

		var sx = this.setFromMatrixColumn( m, 0 ).length();
		var sy = this.setFromMatrixColumn( m, 1 ).length();
		var sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	},

	setFromMatrixColumn: function ( m, index ) {

		return this.fromArray( m.elements, index * 4 );

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	},

	fromBufferAttribute: function ( attribute, index, offset ) {

		if ( offset !== undefined ) {

			console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );

		}

		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		this.z = attribute.getZ( index );

		return this;

	}

} );





/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/bake.ts":
/*!**********************************************!*\
  !*** ./node_modules/ts-loader!./src/bake.ts ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/src/math/Vector3 */ "./node_modules/three/src/math/Vector3.js");

addEventListener('message', event => {
    const particles = event.data;
    const nextFrame = particles.reduce((particles, particle) => {
        if (particle.frame.flags.remove)
            return particles;
        const weightedVector = new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](particle.vector.x, particle.vector.y * 3, particle.vector.z / 2);
        particle.frame.position.x += weightedVector.x;
        particle.frame.position.y += weightedVector.y;
        particle.frame.position.z += weightedVector.z;
        const angleZ = weightedVector.angleTo(new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 1, 0));
        const angleY = weightedVector.angleTo(new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 0, 1));
        const angleX = weightedVector.angleTo(new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 1, 1));
        particle.frame.rotation.z = angleZ;
        particle.frame.rotation.y = angleY;
        particle.frame.rotation.x = angleX;
        particle.vector = new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](particle.vector.x, particle.vector.y, particle.vector.z).add(new three_src_math_Vector3__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0
            - 0.005, particle.vector.z * -0.02));
        if (particle.frame.position.y < -2 || Math.abs(particle.frame.position.x) > 30) {
            particle.frame.flags.remove = true;
        }
        return particles.concat([particle]);
    }, []);
    postMessage(nextFrame, null);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RocmVlL3NyYy9tYXRoL01hdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RocmVlL3NyYy9tYXRoL1F1YXRlcm5pb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RocmVlL3NyYy9tYXRoL1ZlY3RvcjMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jha2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLFNBQVM7O0FBRXpCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR2lCOzs7Ozs7Ozs7Ozs7O0FDcEpqQjtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWtDOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSCxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsa0NBQWtDLDhDQUFLOztBQUV2QyxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUEsQ0FBQzs7O0FBR3FCOzs7Ozs7Ozs7Ozs7O0FDM25CdEI7QUFBQTtBQUFBO0FBQUE7QUFBa0M7QUFDVzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQix5REFBVTs7QUFFaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsb0JBQW9CLDhDQUFLOztBQUV6QixFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7OztBQUdrQjs7Ozs7Ozs7Ozs7OztBQzNyQm5CO0FBQUE7QUFBaUQ7QUFDakQsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQ2hDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUN2RCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDM0IsT0FBTyxTQUFTLENBQUM7UUFDckIsTUFBTSxjQUFjLEdBQUcsSUFBSSw4REFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztRQUM5QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksOERBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhEQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSw4REFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDbkMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksOERBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLDhEQUFPLENBQUMsQ0FBQztjQUNsRyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVFLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEM7UUFDRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiMC5pbmRleC53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanMhLi9zcmMvYmFrZS50c1wiKTtcbiIsIi8qKlxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIF9sdXQgPSBbXTtcblxuZm9yICggdmFyIGkgPSAwOyBpIDwgMjU2OyBpICsrICkge1xuXG5cdF9sdXRbIGkgXSA9ICggaSA8IDE2ID8gJzAnIDogJycgKSArICggaSApLnRvU3RyaW5nKCAxNiApO1xuXG59XG5cbnZhciBfTWF0aCA9IHtcblxuXHRERUcyUkFEOiBNYXRoLlBJIC8gMTgwLFxuXHRSQUQyREVHOiAxODAgLyBNYXRoLlBJLFxuXG5cdGdlbmVyYXRlVVVJRDogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZC1pbi1qYXZhc2NyaXB0LzIxOTYzMTM2IzIxOTYzMTM2XG5cblx0XHR2YXIgZDAgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDA7XG5cdFx0dmFyIGQxID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwO1xuXHRcdHZhciBkMiA9IE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmIHwgMDtcblx0XHR2YXIgZDMgPSBNYXRoLnJhbmRvbSgpICogMHhmZmZmZmZmZiB8IDA7XG5cdFx0dmFyIHV1aWQgPSBfbHV0WyBkMCAmIDB4ZmYgXSArIF9sdXRbIGQwID4+IDggJiAweGZmIF0gKyBfbHV0WyBkMCA+PiAxNiAmIDB4ZmYgXSArIF9sdXRbIGQwID4+IDI0ICYgMHhmZiBdICsgJy0nICtcblx0XHRcdF9sdXRbIGQxICYgMHhmZiBdICsgX2x1dFsgZDEgPj4gOCAmIDB4ZmYgXSArICctJyArIF9sdXRbIGQxID4+IDE2ICYgMHgwZiB8IDB4NDAgXSArIF9sdXRbIGQxID4+IDI0ICYgMHhmZiBdICsgJy0nICtcblx0XHRcdF9sdXRbIGQyICYgMHgzZiB8IDB4ODAgXSArIF9sdXRbIGQyID4+IDggJiAweGZmIF0gKyAnLScgKyBfbHV0WyBkMiA+PiAxNiAmIDB4ZmYgXSArIF9sdXRbIGQyID4+IDI0ICYgMHhmZiBdICtcblx0XHRcdF9sdXRbIGQzICYgMHhmZiBdICsgX2x1dFsgZDMgPj4gOCAmIDB4ZmYgXSArIF9sdXRbIGQzID4+IDE2ICYgMHhmZiBdICsgX2x1dFsgZDMgPj4gMjQgJiAweGZmIF07XG5cblx0XHQvLyAudG9VcHBlckNhc2UoKSBoZXJlIGZsYXR0ZW5zIGNvbmNhdGVuYXRlZCBzdHJpbmdzIHRvIHNhdmUgaGVhcCBtZW1vcnkgc3BhY2UuXG5cdFx0cmV0dXJuIHV1aWQudG9VcHBlckNhc2UoKTtcblxuXHR9LFxuXG5cdGNsYW1wOiBmdW5jdGlvbiAoIHZhbHVlLCBtaW4sIG1heCApIHtcblxuXHRcdHJldHVybiBNYXRoLm1heCggbWluLCBNYXRoLm1pbiggbWF4LCB2YWx1ZSApICk7XG5cblx0fSxcblxuXHQvLyBjb21wdXRlIGV1Y2xpZGlhbiBtb2R1bG8gb2YgbSAlIG5cblx0Ly8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTW9kdWxvX29wZXJhdGlvblxuXG5cdGV1Y2xpZGVhbk1vZHVsbzogZnVuY3Rpb24gKCBuLCBtICkge1xuXG5cdFx0cmV0dXJuICggKCBuICUgbSApICsgbSApICUgbTtcblxuXHR9LFxuXG5cdC8vIExpbmVhciBtYXBwaW5nIGZyb20gcmFuZ2UgPGExLCBhMj4gdG8gcmFuZ2UgPGIxLCBiMj5cblxuXHRtYXBMaW5lYXI6IGZ1bmN0aW9uICggeCwgYTEsIGEyLCBiMSwgYjIgKSB7XG5cblx0XHRyZXR1cm4gYjEgKyAoIHggLSBhMSApICogKCBiMiAtIGIxICkgLyAoIGEyIC0gYTEgKTtcblxuXHR9LFxuXG5cdC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpbmVhcl9pbnRlcnBvbGF0aW9uXG5cblx0bGVycDogZnVuY3Rpb24gKCB4LCB5LCB0ICkge1xuXG5cdFx0cmV0dXJuICggMSAtIHQgKSAqIHggKyB0ICogeTtcblxuXHR9LFxuXG5cdC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvU21vb3Roc3RlcFxuXG5cdHNtb290aHN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fSxcblxuXHRzbW9vdGhlcnN0ZXA6IGZ1bmN0aW9uICggeCwgbWluLCBtYXggKSB7XG5cblx0XHRpZiAoIHggPD0gbWluICkgcmV0dXJuIDA7XG5cdFx0aWYgKCB4ID49IG1heCApIHJldHVybiAxO1xuXG5cdFx0eCA9ICggeCAtIG1pbiApIC8gKCBtYXggLSBtaW4gKTtcblxuXHRcdHJldHVybiB4ICogeCAqIHggKiAoIHggKiAoIHggKiA2IC0gMTUgKSArIDEwICk7XG5cblx0fSxcblxuXHQvLyBSYW5kb20gaW50ZWdlciBmcm9tIDxsb3csIGhpZ2g+IGludGVydmFsXG5cblx0cmFuZEludDogZnVuY3Rpb24gKCBsb3csIGhpZ2ggKSB7XG5cblx0XHRyZXR1cm4gbG93ICsgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqICggaGlnaCAtIGxvdyArIDEgKSApO1xuXG5cdH0sXG5cblx0Ly8gUmFuZG9tIGZsb2F0IGZyb20gPGxvdywgaGlnaD4gaW50ZXJ2YWxcblxuXHRyYW5kRmxvYXQ6IGZ1bmN0aW9uICggbG93LCBoaWdoICkge1xuXG5cdFx0cmV0dXJuIGxvdyArIE1hdGgucmFuZG9tKCkgKiAoIGhpZ2ggLSBsb3cgKTtcblxuXHR9LFxuXG5cdC8vIFJhbmRvbSBmbG9hdCBmcm9tIDwtcmFuZ2UvMiwgcmFuZ2UvMj4gaW50ZXJ2YWxcblxuXHRyYW5kRmxvYXRTcHJlYWQ6IGZ1bmN0aW9uICggcmFuZ2UgKSB7XG5cblx0XHRyZXR1cm4gcmFuZ2UgKiAoIDAuNSAtIE1hdGgucmFuZG9tKCkgKTtcblxuXHR9LFxuXG5cdGRlZ1RvUmFkOiBmdW5jdGlvbiAoIGRlZ3JlZXMgKSB7XG5cblx0XHRyZXR1cm4gZGVncmVlcyAqIF9NYXRoLkRFRzJSQUQ7XG5cblx0fSxcblxuXHRyYWRUb0RlZzogZnVuY3Rpb24gKCByYWRpYW5zICkge1xuXG5cdFx0cmV0dXJuIHJhZGlhbnMgKiBfTWF0aC5SQUQyREVHO1xuXG5cdH0sXG5cblx0aXNQb3dlck9mVHdvOiBmdW5jdGlvbiAoIHZhbHVlICkge1xuXG5cdFx0cmV0dXJuICggdmFsdWUgJiAoIHZhbHVlIC0gMSApICkgPT09IDAgJiYgdmFsdWUgIT09IDA7XG5cblx0fSxcblxuXHRjZWlsUG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHJldHVybiBNYXRoLnBvdyggMiwgTWF0aC5jZWlsKCBNYXRoLmxvZyggdmFsdWUgKSAvIE1hdGguTE4yICkgKTtcblxuXHR9LFxuXG5cdGZsb29yUG93ZXJPZlR3bzogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHJldHVybiBNYXRoLnBvdyggMiwgTWF0aC5mbG9vciggTWF0aC5sb2coIHZhbHVlICkgLyBNYXRoLkxOMiApICk7XG5cblx0fVxuXG59O1xuXG5cbmV4cG9ydCB7IF9NYXRoIH07XG4iLCIvKipcbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBXZXN0TGFuZ2xleSAvIGh0dHA6Ly9naXRodWIuY29tL1dlc3RMYW5nbGV5XG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2NsYXJhLmlvXG4gKi9cblxuaW1wb3J0IHsgX01hdGggfSBmcm9tICcuL01hdGguanMnO1xuXG5mdW5jdGlvbiBRdWF0ZXJuaW9uKCB4LCB5LCB6LCB3ICkge1xuXG5cdHRoaXMuX3ggPSB4IHx8IDA7XG5cdHRoaXMuX3kgPSB5IHx8IDA7XG5cdHRoaXMuX3ogPSB6IHx8IDA7XG5cdHRoaXMuX3cgPSAoIHcgIT09IHVuZGVmaW5lZCApID8gdyA6IDE7XG5cbn1cblxuT2JqZWN0LmFzc2lnbiggUXVhdGVybmlvbiwge1xuXG5cdHNsZXJwOiBmdW5jdGlvbiAoIHFhLCBxYiwgcW0sIHQgKSB7XG5cblx0XHRyZXR1cm4gcW0uY29weSggcWEgKS5zbGVycCggcWIsIHQgKTtcblxuXHR9LFxuXG5cdHNsZXJwRmxhdDogZnVuY3Rpb24gKCBkc3QsIGRzdE9mZnNldCwgc3JjMCwgc3JjT2Zmc2V0MCwgc3JjMSwgc3JjT2Zmc2V0MSwgdCApIHtcblxuXHRcdC8vIGZ1enotZnJlZSwgYXJyYXktYmFzZWQgUXVhdGVybmlvbiBTTEVSUCBvcGVyYXRpb25cblxuXHRcdHZhciB4MCA9IHNyYzBbIHNyY09mZnNldDAgKyAwIF0sXG5cdFx0XHR5MCA9IHNyYzBbIHNyY09mZnNldDAgKyAxIF0sXG5cdFx0XHR6MCA9IHNyYzBbIHNyY09mZnNldDAgKyAyIF0sXG5cdFx0XHR3MCA9IHNyYzBbIHNyY09mZnNldDAgKyAzIF0sXG5cblx0XHRcdHgxID0gc3JjMVsgc3JjT2Zmc2V0MSArIDAgXSxcblx0XHRcdHkxID0gc3JjMVsgc3JjT2Zmc2V0MSArIDEgXSxcblx0XHRcdHoxID0gc3JjMVsgc3JjT2Zmc2V0MSArIDIgXSxcblx0XHRcdHcxID0gc3JjMVsgc3JjT2Zmc2V0MSArIDMgXTtcblxuXHRcdGlmICggdzAgIT09IHcxIHx8IHgwICE9PSB4MSB8fCB5MCAhPT0geTEgfHwgejAgIT09IHoxICkge1xuXG5cdFx0XHR2YXIgcyA9IDEgLSB0LFxuXG5cdFx0XHRcdGNvcyA9IHgwICogeDEgKyB5MCAqIHkxICsgejAgKiB6MSArIHcwICogdzEsXG5cblx0XHRcdFx0ZGlyID0gKCBjb3MgPj0gMCA/IDEgOiAtIDEgKSxcblx0XHRcdFx0c3FyU2luID0gMSAtIGNvcyAqIGNvcztcblxuXHRcdFx0Ly8gU2tpcCB0aGUgU2xlcnAgZm9yIHRpbnkgc3RlcHMgdG8gYXZvaWQgbnVtZXJpYyBwcm9ibGVtczpcblx0XHRcdGlmICggc3FyU2luID4gTnVtYmVyLkVQU0lMT04gKSB7XG5cblx0XHRcdFx0dmFyIHNpbiA9IE1hdGguc3FydCggc3FyU2luICksXG5cdFx0XHRcdFx0bGVuID0gTWF0aC5hdGFuMiggc2luLCBjb3MgKiBkaXIgKTtcblxuXHRcdFx0XHRzID0gTWF0aC5zaW4oIHMgKiBsZW4gKSAvIHNpbjtcblx0XHRcdFx0dCA9IE1hdGguc2luKCB0ICogbGVuICkgLyBzaW47XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIHREaXIgPSB0ICogZGlyO1xuXG5cdFx0XHR4MCA9IHgwICogcyArIHgxICogdERpcjtcblx0XHRcdHkwID0geTAgKiBzICsgeTEgKiB0RGlyO1xuXHRcdFx0ejAgPSB6MCAqIHMgKyB6MSAqIHREaXI7XG5cdFx0XHR3MCA9IHcwICogcyArIHcxICogdERpcjtcblxuXHRcdFx0Ly8gTm9ybWFsaXplIGluIGNhc2Ugd2UganVzdCBkaWQgYSBsZXJwOlxuXHRcdFx0aWYgKCBzID09PSAxIC0gdCApIHtcblxuXHRcdFx0XHR2YXIgZiA9IDEgLyBNYXRoLnNxcnQoIHgwICogeDAgKyB5MCAqIHkwICsgejAgKiB6MCArIHcwICogdzAgKTtcblxuXHRcdFx0XHR4MCAqPSBmO1xuXHRcdFx0XHR5MCAqPSBmO1xuXHRcdFx0XHR6MCAqPSBmO1xuXHRcdFx0XHR3MCAqPSBmO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRkc3RbIGRzdE9mZnNldCBdID0geDA7XG5cdFx0ZHN0WyBkc3RPZmZzZXQgKyAxIF0gPSB5MDtcblx0XHRkc3RbIGRzdE9mZnNldCArIDIgXSA9IHowO1xuXHRcdGRzdFsgZHN0T2Zmc2V0ICsgMyBdID0gdzA7XG5cblx0fVxuXG59ICk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBRdWF0ZXJuaW9uLnByb3RvdHlwZSwge1xuXG5cdHg6IHtcblxuXHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5feDtcblxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSB2YWx1ZTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdHk6IHtcblxuXHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5feTtcblxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHRoaXMuX3kgPSB2YWx1ZTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdHo6IHtcblxuXHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fejtcblxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHRoaXMuX3ogPSB2YWx1ZTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdHc6IHtcblxuXHRcdGdldDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5fdztcblxuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cblx0XHRcdHRoaXMuX3cgPSB2YWx1ZTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdH1cblxuXHR9XG5cbn0gKTtcblxuT2JqZWN0LmFzc2lnbiggUXVhdGVybmlvbi5wcm90b3R5cGUsIHtcblxuXHRpc1F1YXRlcm5pb246IHRydWUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHosIHcgKSB7XG5cblx0XHR0aGlzLl94ID0geDtcblx0XHR0aGlzLl95ID0geTtcblx0XHR0aGlzLl96ID0gejtcblx0XHR0aGlzLl93ID0gdztcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvciggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiwgdGhpcy5fdyApO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuXG5cdFx0dGhpcy5feCA9IHF1YXRlcm5pb24ueDtcblx0XHR0aGlzLl95ID0gcXVhdGVybmlvbi55O1xuXHRcdHRoaXMuX3ogPSBxdWF0ZXJuaW9uLno7XG5cdFx0dGhpcy5fdyA9IHF1YXRlcm5pb24udztcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUV1bGVyOiBmdW5jdGlvbiAoIGV1bGVyLCB1cGRhdGUgKSB7XG5cblx0XHRpZiAoICEgKCBldWxlciAmJiBldWxlci5pc0V1bGVyICkgKSB7XG5cblx0XHRcdHRocm93IG5ldyBFcnJvciggJ1RIUkVFLlF1YXRlcm5pb246IC5zZXRGcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhbiBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLicgKTtcblxuXHRcdH1cblxuXHRcdHZhciB4ID0gZXVsZXIuX3gsIHkgPSBldWxlci5feSwgeiA9IGV1bGVyLl96LCBvcmRlciA9IGV1bGVyLm9yZGVyO1xuXG5cdFx0Ly8gaHR0cDovL3d3dy5tYXRod29ya3MuY29tL21hdGxhYmNlbnRyYWwvZmlsZWV4Y2hhbmdlL1xuXHRcdC8vIFx0MjA2OTYtZnVuY3Rpb24tdG8tY29udmVydC1iZXR3ZWVuLWRjbS1ldWxlci1hbmdsZXMtcXVhdGVybmlvbnMtYW5kLWV1bGVyLXZlY3RvcnMvXG5cdFx0Ly9cdGNvbnRlbnQvU3BpbkNhbGMubVxuXG5cdFx0dmFyIGNvcyA9IE1hdGguY29zO1xuXHRcdHZhciBzaW4gPSBNYXRoLnNpbjtcblxuXHRcdHZhciBjMSA9IGNvcyggeCAvIDIgKTtcblx0XHR2YXIgYzIgPSBjb3MoIHkgLyAyICk7XG5cdFx0dmFyIGMzID0gY29zKCB6IC8gMiApO1xuXG5cdFx0dmFyIHMxID0gc2luKCB4IC8gMiApO1xuXHRcdHZhciBzMiA9IHNpbiggeSAvIDIgKTtcblx0XHR2YXIgczMgPSBzaW4oIHogLyAyICk7XG5cblx0XHRpZiAoIG9yZGVyID09PSAnWFlaJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWVhaJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWlhZJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWllYJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWVpYJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyArIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgKyBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzIC0gczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyAtIHMxICogczIgKiBzMztcblxuXHRcdH0gZWxzZSBpZiAoIG9yZGVyID09PSAnWFpZJyApIHtcblxuXHRcdFx0dGhpcy5feCA9IHMxICogYzIgKiBjMyAtIGMxICogczIgKiBzMztcblx0XHRcdHRoaXMuX3kgPSBjMSAqIHMyICogYzMgLSBzMSAqIGMyICogczM7XG5cdFx0XHR0aGlzLl96ID0gYzEgKiBjMiAqIHMzICsgczEgKiBzMiAqIGMzO1xuXHRcdFx0dGhpcy5fdyA9IGMxICogYzIgKiBjMyArIHMxICogczIgKiBzMztcblxuXHRcdH1cblxuXHRcdGlmICggdXBkYXRlICE9PSBmYWxzZSApIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUF4aXNBbmdsZTogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdC8vIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2dlb21ldHJ5L3JvdGF0aW9ucy9jb252ZXJzaW9ucy9hbmdsZVRvUXVhdGVybmlvbi9pbmRleC5odG1cblxuXHRcdC8vIGFzc3VtZXMgYXhpcyBpcyBub3JtYWxpemVkXG5cblx0XHR2YXIgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLCBzID0gTWF0aC5zaW4oIGhhbGZBbmdsZSApO1xuXG5cdFx0dGhpcy5feCA9IGF4aXMueCAqIHM7XG5cdFx0dGhpcy5feSA9IGF4aXMueSAqIHM7XG5cdFx0dGhpcy5feiA9IGF4aXMueiAqIHM7XG5cdFx0dGhpcy5fdyA9IE1hdGguY29zKCBoYWxmQW5nbGUgKTtcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9nZW9tZXRyeS9yb3RhdGlvbnMvY29udmVyc2lvbnMvbWF0cml4VG9RdWF0ZXJuaW9uL2luZGV4Lmh0bVxuXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcblxuXHRcdHZhciB0ZSA9IG0uZWxlbWVudHMsXG5cblx0XHRcdG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF0sXG5cdFx0XHRtMjEgPSB0ZVsgMSBdLCBtMjIgPSB0ZVsgNSBdLCBtMjMgPSB0ZVsgOSBdLFxuXHRcdFx0bTMxID0gdGVbIDIgXSwgbTMyID0gdGVbIDYgXSwgbTMzID0gdGVbIDEwIF0sXG5cblx0XHRcdHRyYWNlID0gbTExICsgbTIyICsgbTMzLFxuXHRcdFx0cztcblxuXHRcdGlmICggdHJhY2UgPiAwICkge1xuXG5cdFx0XHRzID0gMC41IC8gTWF0aC5zcXJ0KCB0cmFjZSArIDEuMCApO1xuXG5cdFx0XHR0aGlzLl93ID0gMC4yNSAvIHM7XG5cdFx0XHR0aGlzLl94ID0gKCBtMzIgLSBtMjMgKSAqIHM7XG5cdFx0XHR0aGlzLl95ID0gKCBtMTMgLSBtMzEgKSAqIHM7XG5cdFx0XHR0aGlzLl96ID0gKCBtMjEgLSBtMTIgKSAqIHM7XG5cblx0XHR9IGVsc2UgaWYgKCBtMTEgPiBtMjIgJiYgbTExID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMTEgLSBtMjIgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTMyIC0gbTIzICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feSA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTEzICsgbTMxICkgLyBzO1xuXG5cdFx0fSBlbHNlIGlmICggbTIyID4gbTMzICkge1xuXG5cdFx0XHRzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMjIgLSBtMTEgLSBtMzMgKTtcblxuXHRcdFx0dGhpcy5fdyA9ICggbTEzIC0gbTMxICkgLyBzO1xuXHRcdFx0dGhpcy5feCA9ICggbTEyICsgbTIxICkgLyBzO1xuXHRcdFx0dGhpcy5feSA9IDAuMjUgKiBzO1xuXHRcdFx0dGhpcy5feiA9ICggbTIzICsgbTMyICkgLyBzO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTMzIC0gbTExIC0gbTIyICk7XG5cblx0XHRcdHRoaXMuX3cgPSAoIG0yMSAtIG0xMiApIC8gcztcblx0XHRcdHRoaXMuX3ggPSAoIG0xMyArIG0zMSApIC8gcztcblx0XHRcdHRoaXMuX3kgPSAoIG0yMyArIG0zMiApIC8gcztcblx0XHRcdHRoaXMuX3ogPSAwLjI1ICogcztcblxuXHRcdH1cblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbVVuaXRWZWN0b3JzOiBmdW5jdGlvbiAoIHZGcm9tLCB2VG8gKSB7XG5cblx0XHQvLyBhc3N1bWVzIGRpcmVjdGlvbiB2ZWN0b3JzIHZGcm9tIGFuZCB2VG8gYXJlIG5vcm1hbGl6ZWRcblxuXHRcdHZhciBFUFMgPSAwLjAwMDAwMTtcblxuXHRcdHZhciByID0gdkZyb20uZG90KCB2VG8gKSArIDE7XG5cblx0XHRpZiAoIHIgPCBFUFMgKSB7XG5cblx0XHRcdHIgPSAwO1xuXG5cdFx0XHRpZiAoIE1hdGguYWJzKCB2RnJvbS54ICkgPiBNYXRoLmFicyggdkZyb20ueiApICkge1xuXG5cdFx0XHRcdHRoaXMuX3ggPSAtIHZGcm9tLnk7XG5cdFx0XHRcdHRoaXMuX3kgPSB2RnJvbS54O1xuXHRcdFx0XHR0aGlzLl96ID0gMDtcblx0XHRcdFx0dGhpcy5fdyA9IHI7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0dGhpcy5feCA9IDA7XG5cdFx0XHRcdHRoaXMuX3kgPSAtIHZGcm9tLno7XG5cdFx0XHRcdHRoaXMuX3ogPSB2RnJvbS55O1xuXHRcdFx0XHR0aGlzLl93ID0gcjtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gY3Jvc3NWZWN0b3JzKCB2RnJvbSwgdlRvICk7IC8vIGlubGluZWQgdG8gYXZvaWQgY3ljbGljIGRlcGVuZGVuY3kgb24gVmVjdG9yM1xuXG5cdFx0XHR0aGlzLl94ID0gdkZyb20ueSAqIHZUby56IC0gdkZyb20ueiAqIHZUby55O1xuXHRcdFx0dGhpcy5feSA9IHZGcm9tLnogKiB2VG8ueCAtIHZGcm9tLnggKiB2VG8uejtcblx0XHRcdHRoaXMuX3ogPSB2RnJvbS54ICogdlRvLnkgLSB2RnJvbS55ICogdlRvLng7XG5cdFx0XHR0aGlzLl93ID0gcjtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpO1xuXG5cdH0sXG5cblx0YW5nbGVUbzogZnVuY3Rpb24gKCBxICkge1xuXG5cdFx0cmV0dXJuIDIgKiBNYXRoLmFjb3MoIE1hdGguYWJzKCBfTWF0aC5jbGFtcCggdGhpcy5kb3QoIHEgKSwgLSAxLCAxICkgKSApO1xuXG5cdH0sXG5cblx0cm90YXRlVG93YXJkczogZnVuY3Rpb24gKCBxLCBzdGVwICkge1xuXG5cdFx0dmFyIGFuZ2xlID0gdGhpcy5hbmdsZVRvKCBxICk7XG5cblx0XHRpZiAoIGFuZ2xlID09PSAwICkgcmV0dXJuIHRoaXM7XG5cblx0XHR2YXIgdCA9IE1hdGgubWluKCAxLCBzdGVwIC8gYW5nbGUgKTtcblxuXHRcdHRoaXMuc2xlcnAoIHEsIHQgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aW52ZXJzZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gcXVhdGVybmlvbiBpcyBhc3N1bWVkIHRvIGhhdmUgdW5pdCBsZW5ndGhcblxuXHRcdHJldHVybiB0aGlzLmNvbmp1Z2F0ZSgpO1xuXG5cdH0sXG5cblx0Y29uanVnYXRlOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl94ICo9IC0gMTtcblx0XHR0aGlzLl95ICo9IC0gMTtcblx0XHR0aGlzLl96ICo9IC0gMTtcblxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZG90OiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5feCAqIHYuX3ggKyB0aGlzLl95ICogdi5feSArIHRoaXMuX3ogKiB2Ll96ICsgdGhpcy5fdyAqIHYuX3c7XG5cblx0fSxcblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3ggKiB0aGlzLl94ICsgdGhpcy5feSAqIHRoaXMuX3kgKyB0aGlzLl96ICogdGhpcy5feiArIHRoaXMuX3cgKiB0aGlzLl93O1xuXG5cdH0sXG5cblx0bGVuZ3RoOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLl94ICogdGhpcy5feCArIHRoaXMuX3kgKiB0aGlzLl95ICsgdGhpcy5feiAqIHRoaXMuX3ogKyB0aGlzLl93ICogdGhpcy5fdyApO1xuXG5cdH0sXG5cblx0bm9ybWFsaXplOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgbCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0XHRpZiAoIGwgPT09IDAgKSB7XG5cblx0XHRcdHRoaXMuX3ggPSAwO1xuXHRcdFx0dGhpcy5feSA9IDA7XG5cdFx0XHR0aGlzLl96ID0gMDtcblx0XHRcdHRoaXMuX3cgPSAxO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bCA9IDEgLyBsO1xuXG5cdFx0XHR0aGlzLl94ID0gdGhpcy5feCAqIGw7XG5cdFx0XHR0aGlzLl95ID0gdGhpcy5feSAqIGw7XG5cdFx0XHR0aGlzLl96ID0gdGhpcy5feiAqIGw7XG5cdFx0XHR0aGlzLl93ID0gdGhpcy5fdyAqIGw7XG5cblx0XHR9XG5cblx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHEsIHAgKSB7XG5cblx0XHRpZiAoIHAgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuUXVhdGVybmlvbjogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlRdWF0ZXJuaW9ucyggYSwgYiApIGluc3RlYWQuJyApO1xuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggcSwgcCApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyggdGhpcywgcSApO1xuXG5cdH0sXG5cblx0cHJlbXVsdGlwbHk6IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdHJldHVybiB0aGlzLm11bHRpcGx5UXVhdGVybmlvbnMoIHEsIHRoaXMgKTtcblxuXHR9LFxuXG5cdG11bHRpcGx5UXVhdGVybmlvbnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdC8vIGZyb20gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9yZWFsTm9ybWVkQWxnZWJyYS9xdWF0ZXJuaW9ucy9jb2RlL2luZGV4Lmh0bVxuXG5cdFx0dmFyIHFheCA9IGEuX3gsIHFheSA9IGEuX3ksIHFheiA9IGEuX3osIHFhdyA9IGEuX3c7XG5cdFx0dmFyIHFieCA9IGIuX3gsIHFieSA9IGIuX3ksIHFieiA9IGIuX3osIHFidyA9IGIuX3c7XG5cblx0XHR0aGlzLl94ID0gcWF4ICogcWJ3ICsgcWF3ICogcWJ4ICsgcWF5ICogcWJ6IC0gcWF6ICogcWJ5O1xuXHRcdHRoaXMuX3kgPSBxYXkgKiBxYncgKyBxYXcgKiBxYnkgKyBxYXogKiBxYnggLSBxYXggKiBxYno7XG5cdFx0dGhpcy5feiA9IHFheiAqIHFidyArIHFhdyAqIHFieiArIHFheCAqIHFieSAtIHFheSAqIHFieDtcblx0XHR0aGlzLl93ID0gcWF3ICogcWJ3IC0gcWF4ICogcWJ4IC0gcWF5ICogcWJ5IC0gcWF6ICogcWJ6O1xuXG5cdFx0dGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzbGVycDogZnVuY3Rpb24gKCBxYiwgdCApIHtcblxuXHRcdGlmICggdCA9PT0gMCApIHJldHVybiB0aGlzO1xuXHRcdGlmICggdCA9PT0gMSApIHJldHVybiB0aGlzLmNvcHkoIHFiICk7XG5cblx0XHR2YXIgeCA9IHRoaXMuX3gsIHkgPSB0aGlzLl95LCB6ID0gdGhpcy5feiwgdyA9IHRoaXMuX3c7XG5cblx0XHQvLyBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL3JlYWxOb3JtZWRBbGdlYnJhL3F1YXRlcm5pb25zL3NsZXJwL1xuXG5cdFx0dmFyIGNvc0hhbGZUaGV0YSA9IHcgKiBxYi5fdyArIHggKiBxYi5feCArIHkgKiBxYi5feSArIHogKiBxYi5fejtcblxuXHRcdGlmICggY29zSGFsZlRoZXRhIDwgMCApIHtcblxuXHRcdFx0dGhpcy5fdyA9IC0gcWIuX3c7XG5cdFx0XHR0aGlzLl94ID0gLSBxYi5feDtcblx0XHRcdHRoaXMuX3kgPSAtIHFiLl95O1xuXHRcdFx0dGhpcy5feiA9IC0gcWIuX3o7XG5cblx0XHRcdGNvc0hhbGZUaGV0YSA9IC0gY29zSGFsZlRoZXRhO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5jb3B5KCBxYiApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCBjb3NIYWxmVGhldGEgPj0gMS4wICkge1xuXG5cdFx0XHR0aGlzLl93ID0gdztcblx0XHRcdHRoaXMuX3ggPSB4O1xuXHRcdFx0dGhpcy5feSA9IHk7XG5cdFx0XHR0aGlzLl96ID0gejtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR2YXIgc3FyU2luSGFsZlRoZXRhID0gMS4wIC0gY29zSGFsZlRoZXRhICogY29zSGFsZlRoZXRhO1xuXG5cdFx0aWYgKCBzcXJTaW5IYWxmVGhldGEgPD0gTnVtYmVyLkVQU0lMT04gKSB7XG5cblx0XHRcdHZhciBzID0gMSAtIHQ7XG5cdFx0XHR0aGlzLl93ID0gcyAqIHcgKyB0ICogdGhpcy5fdztcblx0XHRcdHRoaXMuX3ggPSBzICogeCArIHQgKiB0aGlzLl94O1xuXHRcdFx0dGhpcy5feSA9IHMgKiB5ICsgdCAqIHRoaXMuX3k7XG5cdFx0XHR0aGlzLl96ID0gcyAqIHogKyB0ICogdGhpcy5fejtcblxuXHRcdFx0dGhpcy5ub3JtYWxpemUoKTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHR9XG5cblx0XHR2YXIgc2luSGFsZlRoZXRhID0gTWF0aC5zcXJ0KCBzcXJTaW5IYWxmVGhldGEgKTtcblx0XHR2YXIgaGFsZlRoZXRhID0gTWF0aC5hdGFuMiggc2luSGFsZlRoZXRhLCBjb3NIYWxmVGhldGEgKTtcblx0XHR2YXIgcmF0aW9BID0gTWF0aC5zaW4oICggMSAtIHQgKSAqIGhhbGZUaGV0YSApIC8gc2luSGFsZlRoZXRhLFxuXHRcdFx0cmF0aW9CID0gTWF0aC5zaW4oIHQgKiBoYWxmVGhldGEgKSAvIHNpbkhhbGZUaGV0YTtcblxuXHRcdHRoaXMuX3cgPSAoIHcgKiByYXRpb0EgKyB0aGlzLl93ICogcmF0aW9CICk7XG5cdFx0dGhpcy5feCA9ICggeCAqIHJhdGlvQSArIHRoaXMuX3ggKiByYXRpb0IgKTtcblx0XHR0aGlzLl95ID0gKCB5ICogcmF0aW9BICsgdGhpcy5feSAqIHJhdGlvQiApO1xuXHRcdHRoaXMuX3ogPSAoIHogKiByYXRpb0EgKyB0aGlzLl96ICogcmF0aW9CICk7XG5cblx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCBxdWF0ZXJuaW9uICkge1xuXG5cdFx0cmV0dXJuICggcXVhdGVybmlvbi5feCA9PT0gdGhpcy5feCApICYmICggcXVhdGVybmlvbi5feSA9PT0gdGhpcy5feSApICYmICggcXVhdGVybmlvbi5feiA9PT0gdGhpcy5feiApICYmICggcXVhdGVybmlvbi5fdyA9PT0gdGhpcy5fdyApO1xuXG5cdH0sXG5cblx0ZnJvbUFycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIG9mZnNldCA9PT0gdW5kZWZpbmVkICkgb2Zmc2V0ID0gMDtcblxuXHRcdHRoaXMuX3ggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy5feSA9IGFycmF5WyBvZmZzZXQgKyAxIF07XG5cdFx0dGhpcy5feiA9IGFycmF5WyBvZmZzZXQgKyAyIF07XG5cdFx0dGhpcy5fdyA9IGFycmF5WyBvZmZzZXQgKyAzIF07XG5cblx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0aGlzLl94O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLl95O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAyIF0gPSB0aGlzLl96O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0aGlzLl93O1xuXG5cdFx0cmV0dXJuIGFycmF5O1xuXG5cdH0sXG5cblx0X29uQ2hhbmdlOiBmdW5jdGlvbiAoIGNhbGxiYWNrICkge1xuXG5cdFx0dGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRfb25DaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24gKCkge31cblxufSApO1xuXG5cbmV4cG9ydCB7IFF1YXRlcm5pb24gfTtcbiIsImltcG9ydCB7IF9NYXRoIH0gZnJvbSAnLi9NYXRoLmpzJztcbmltcG9ydCB7IFF1YXRlcm5pb24gfSBmcm9tICcuL1F1YXRlcm5pb24uanMnO1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIGtpbGUgLyBodHRwOi8va2lsZS5zdHJhdmFnYW56YS5vcmcvXG4gKiBAYXV0aG9yIHBoaWxvZ2IgLyBodHRwOi8vYmxvZy50aGVqaXQub3JnL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgZWdyYWV0aGVyIC8gaHR0cDovL2VncmFldGhlci5jb20vXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcbiAqL1xuXG52YXIgX3ZlY3RvciA9IG5ldyBWZWN0b3IzKCk7XG52YXIgX3F1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xuXG5mdW5jdGlvbiBWZWN0b3IzKCB4LCB5LCB6ICkge1xuXG5cdHRoaXMueCA9IHggfHwgMDtcblx0dGhpcy55ID0geSB8fCAwO1xuXHR0aGlzLnogPSB6IHx8IDA7XG5cbn1cblxuT2JqZWN0LmFzc2lnbiggVmVjdG9yMy5wcm90b3R5cGUsIHtcblxuXHRpc1ZlY3RvcjM6IHRydWUsXG5cblx0c2V0OiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXHRcdHRoaXMueSA9IHk7XG5cdFx0dGhpcy56ID0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0U2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdHRoaXMueCA9IHNjYWxhcjtcblx0XHR0aGlzLnkgPSBzY2FsYXI7XG5cdFx0dGhpcy56ID0gc2NhbGFyO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRYOiBmdW5jdGlvbiAoIHggKSB7XG5cblx0XHR0aGlzLnggPSB4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRZOiBmdW5jdGlvbiAoIHkgKSB7XG5cblx0XHR0aGlzLnkgPSB5O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRaOiBmdW5jdGlvbiAoIHogKSB7XG5cblx0XHR0aGlzLnogPSB6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRDb21wb25lbnQ6IGZ1bmN0aW9uICggaW5kZXgsIHZhbHVlICkge1xuXG5cdFx0c3dpdGNoICggaW5kZXggKSB7XG5cblx0XHRcdGNhc2UgMDogdGhpcy54ID0gdmFsdWU7IGJyZWFrO1xuXHRcdFx0Y2FzZSAxOiB0aGlzLnkgPSB2YWx1ZTsgYnJlYWs7XG5cdFx0XHRjYXNlIDI6IHRoaXMueiA9IHZhbHVlOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvciggJ2luZGV4IGlzIG91dCBvZiByYW5nZTogJyArIGluZGV4ICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGdldENvbXBvbmVudDogZnVuY3Rpb24gKCBpbmRleCApIHtcblxuXHRcdHN3aXRjaCAoIGluZGV4ICkge1xuXG5cdFx0XHRjYXNlIDA6IHJldHVybiB0aGlzLng7XG5cdFx0XHRjYXNlIDE6IHJldHVybiB0aGlzLnk7XG5cdFx0XHRjYXNlIDI6IHJldHVybiB0aGlzLno7XG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoICdpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICcgKyBpbmRleCApO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvciggdGhpcy54LCB0aGlzLnksIHRoaXMueiApO1xuXG5cdH0sXG5cblx0Y29weTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dGhpcy54ID0gdi54O1xuXHRcdHRoaXMueSA9IHYueTtcblx0XHR0aGlzLnogPSB2Lno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggKz0gdi54O1xuXHRcdHRoaXMueSArPSB2Lnk7XG5cdFx0dGhpcy56ICs9IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggKz0gcztcblx0XHR0aGlzLnkgKz0gcztcblx0XHR0aGlzLnogKz0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YWRkVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54ICsgYi54O1xuXHRcdHRoaXMueSA9IGEueSArIGIueTtcblx0XHR0aGlzLnogPSBhLnogKyBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFkZFNjYWxlZFZlY3RvcjogZnVuY3Rpb24gKCB2LCBzICkge1xuXG5cdFx0dGhpcy54ICs9IHYueCAqIHM7XG5cdFx0dGhpcy55ICs9IHYueSAqIHM7XG5cdFx0dGhpcy56ICs9IHYueiAqIHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN1YjogZnVuY3Rpb24gKCB2LCB3ICkge1xuXG5cdFx0aWYgKCB3ICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLlZlY3RvcjM6IC5zdWIoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5zdWJWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdWJWZWN0b3JzKCB2LCB3ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnggLT0gdi54O1xuXHRcdHRoaXMueSAtPSB2Lnk7XG5cdFx0dGhpcy56IC09IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViU2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHR0aGlzLnggLT0gcztcblx0XHR0aGlzLnkgLT0gcztcblx0XHR0aGlzLnogLT0gcztcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3ViVmVjdG9yczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dGhpcy54ID0gYS54IC0gYi54O1xuXHRcdHRoaXMueSA9IGEueSAtIGIueTtcblx0XHR0aGlzLnogPSBhLnogLSBiLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG11bHRpcGx5OiBmdW5jdGlvbiAoIHYsIHcgKSB7XG5cblx0XHRpZiAoIHcgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseVZlY3RvcnMoIHYsIHcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCAqPSB2Lng7XG5cdFx0dGhpcy55ICo9IHYueTtcblx0XHR0aGlzLnogKj0gdi56O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtdWx0aXBseVNjYWxhcjogZnVuY3Rpb24gKCBzY2FsYXIgKSB7XG5cblx0XHR0aGlzLnggKj0gc2NhbGFyO1xuXHRcdHRoaXMueSAqPSBzY2FsYXI7XG5cdFx0dGhpcy56ICo9IHNjYWxhcjtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlWZWN0b3JzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XG5cblx0XHR0aGlzLnggPSBhLnggKiBiLng7XG5cdFx0dGhpcy55ID0gYS55ICogYi55O1xuXHRcdHRoaXMueiA9IGEueiAqIGIuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0YXBwbHlFdWxlcjogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdGlmICggISAoIGV1bGVyICYmIGV1bGVyLmlzRXVsZXIgKSApIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLlZlY3RvcjM6IC5hcHBseUV1bGVyKCkgbm93IGV4cGVjdHMgYW4gRXVsZXIgcm90YXRpb24gcmF0aGVyIHRoYW4gYSBWZWN0b3IzIGFuZCBvcmRlci4nICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5hcHBseVF1YXRlcm5pb24oIF9xdWF0ZXJuaW9uLnNldEZyb21FdWxlciggZXVsZXIgKSApO1xuXG5cdH0sXG5cblx0YXBwbHlBeGlzQW5nbGU6IGZ1bmN0aW9uICggYXhpcywgYW5nbGUgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5hcHBseVF1YXRlcm5pb24oIF9xdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoIGF4aXMsIGFuZ2xlICkgKTtcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4MzogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dGhpcy54ID0gZVsgMCBdICogeCArIGVbIDMgXSAqIHkgKyBlWyA2IF0gKiB6O1xuXHRcdHRoaXMueSA9IGVbIDEgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgNyBdICogejtcblx0XHR0aGlzLnogPSBlWyAyIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDggXSAqIHo7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5TWF0cml4NDogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0dmFyIHggPSB0aGlzLngsIHkgPSB0aGlzLnksIHogPSB0aGlzLno7XG5cdFx0dmFyIGUgPSBtLmVsZW1lbnRzO1xuXG5cdFx0dmFyIHcgPSAxIC8gKCBlWyAzIF0gKiB4ICsgZVsgNyBdICogeSArIGVbIDExIF0gKiB6ICsgZVsgMTUgXSApO1xuXG5cdFx0dGhpcy54ID0gKCBlWyAwIF0gKiB4ICsgZVsgNCBdICogeSArIGVbIDggXSAqIHogKyBlWyAxMiBdICkgKiB3O1xuXHRcdHRoaXMueSA9ICggZVsgMSBdICogeCArIGVbIDUgXSAqIHkgKyBlWyA5IF0gKiB6ICsgZVsgMTMgXSApICogdztcblx0XHR0aGlzLnogPSAoIGVbIDIgXSAqIHggKyBlWyA2IF0gKiB5ICsgZVsgMTAgXSAqIHogKyBlWyAxNCBdICkgKiB3O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRhcHBseVF1YXRlcm5pb246IGZ1bmN0aW9uICggcSApIHtcblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXHRcdHZhciBxeCA9IHEueCwgcXkgPSBxLnksIHF6ID0gcS56LCBxdyA9IHEudztcblxuXHRcdC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjdG9yXG5cblx0XHR2YXIgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHk7XG5cdFx0dmFyIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuXHRcdHZhciBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcblx0XHR2YXIgaXcgPSAtIHF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuXHRcdC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuXHRcdHRoaXMueCA9IGl4ICogcXcgKyBpdyAqIC0gcXggKyBpeSAqIC0gcXogLSBpeiAqIC0gcXk7XG5cdFx0dGhpcy55ID0gaXkgKiBxdyArIGl3ICogLSBxeSArIGl6ICogLSBxeCAtIGl4ICogLSBxejtcblx0XHR0aGlzLnogPSBpeiAqIHF3ICsgaXcgKiAtIHF6ICsgaXggKiAtIHF5IC0gaXkgKiAtIHF4O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRwcm9qZWN0OiBmdW5jdGlvbiAoIGNhbWVyYSApIHtcblxuXHRcdHJldHVybiB0aGlzLmFwcGx5TWF0cml4NCggY2FtZXJhLm1hdHJpeFdvcmxkSW52ZXJzZSApLmFwcGx5TWF0cml4NCggY2FtZXJhLnByb2plY3Rpb25NYXRyaXggKTtcblxuXHR9LFxuXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKCBjYW1lcmEgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5hcHBseU1hdHJpeDQoIGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSApLmFwcGx5TWF0cml4NCggY2FtZXJhLm1hdHJpeFdvcmxkICk7XG5cblx0fSxcblxuXHR0cmFuc2Zvcm1EaXJlY3Rpb246IGZ1bmN0aW9uICggbSApIHtcblxuXHRcdC8vIGlucHV0OiBUSFJFRS5NYXRyaXg0IGFmZmluZSBtYXRyaXhcblx0XHQvLyB2ZWN0b3IgaW50ZXJwcmV0ZWQgYXMgYSBkaXJlY3Rpb25cblxuXHRcdHZhciB4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB6ID0gdGhpcy56O1xuXHRcdHZhciBlID0gbS5lbGVtZW50cztcblxuXHRcdHRoaXMueCA9IGVbIDAgXSAqIHggKyBlWyA0IF0gKiB5ICsgZVsgOCBdICogejtcblx0XHR0aGlzLnkgPSBlWyAxIF0gKiB4ICsgZVsgNSBdICogeSArIGVbIDkgXSAqIHo7XG5cdFx0dGhpcy56ID0gZVsgMiBdICogeCArIGVbIDYgXSAqIHkgKyBlWyAxMCBdICogejtcblxuXHRcdHJldHVybiB0aGlzLm5vcm1hbGl6ZSgpO1xuXG5cdH0sXG5cblx0ZGl2aWRlOiBmdW5jdGlvbiAoIHYgKSB7XG5cblx0XHR0aGlzLnggLz0gdi54O1xuXHRcdHRoaXMueSAvPSB2Lnk7XG5cdFx0dGhpcy56IC89IHYuejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZGl2aWRlU2NhbGFyOiBmdW5jdGlvbiAoIHNjYWxhciApIHtcblxuXHRcdHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKCAxIC8gc2NhbGFyICk7XG5cblx0fSxcblxuXHRtaW46IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IE1hdGgubWluKCB0aGlzLngsIHYueCApO1xuXHRcdHRoaXMueSA9IE1hdGgubWluKCB0aGlzLnksIHYueSApO1xuXHRcdHRoaXMueiA9IE1hdGgubWluKCB0aGlzLnosIHYueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYXg6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHRoaXMueCA9IE1hdGgubWF4KCB0aGlzLngsIHYueCApO1xuXHRcdHRoaXMueSA9IE1hdGgubWF4KCB0aGlzLnksIHYueSApO1xuXHRcdHRoaXMueiA9IE1hdGgubWF4KCB0aGlzLnosIHYueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbGFtcDogZnVuY3Rpb24gKCBtaW4sIG1heCApIHtcblxuXHRcdC8vIGFzc3VtZXMgbWluIDwgbWF4LCBjb21wb25lbnR3aXNlXG5cblx0XHR0aGlzLnggPSBNYXRoLm1heCggbWluLngsIE1hdGgubWluKCBtYXgueCwgdGhpcy54ICkgKTtcblx0XHR0aGlzLnkgPSBNYXRoLm1heCggbWluLnksIE1hdGgubWluKCBtYXgueSwgdGhpcy55ICkgKTtcblx0XHR0aGlzLnogPSBNYXRoLm1heCggbWluLnosIE1hdGgubWluKCBtYXgueiwgdGhpcy56ICkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXBTY2FsYXI6IGZ1bmN0aW9uICggbWluVmFsLCBtYXhWYWwgKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLm1heCggbWluVmFsLCBNYXRoLm1pbiggbWF4VmFsLCB0aGlzLnggKSApO1xuXHRcdHRoaXMueSA9IE1hdGgubWF4KCBtaW5WYWwsIE1hdGgubWluKCBtYXhWYWwsIHRoaXMueSApICk7XG5cdFx0dGhpcy56ID0gTWF0aC5tYXgoIG1pblZhbCwgTWF0aC5taW4oIG1heFZhbCwgdGhpcy56ICkgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2xhbXBMZW5ndGg6IGZ1bmN0aW9uICggbWluLCBtYXggKSB7XG5cblx0XHR2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGgoKTtcblxuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhciggbGVuZ3RoIHx8IDEgKS5tdWx0aXBseVNjYWxhciggTWF0aC5tYXgoIG1pbiwgTWF0aC5taW4oIG1heCwgbGVuZ3RoICkgKSApO1xuXG5cdH0sXG5cblx0Zmxvb3I6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGguZmxvb3IoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjZWlsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLnggPSBNYXRoLmNlaWwoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGguY2VpbCggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gTWF0aC5jZWlsKCB0aGlzLnogKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMueCA9IE1hdGgucm91bmQoIHRoaXMueCApO1xuXHRcdHRoaXMueSA9IE1hdGgucm91bmQoIHRoaXMueSApO1xuXHRcdHRoaXMueiA9IE1hdGgucm91bmQoIHRoaXMueiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRyb3VuZFRvWmVybzogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gKCB0aGlzLnggPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueCApIDogTWF0aC5mbG9vciggdGhpcy54ICk7XG5cdFx0dGhpcy55ID0gKCB0aGlzLnkgPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueSApIDogTWF0aC5mbG9vciggdGhpcy55ICk7XG5cdFx0dGhpcy56ID0gKCB0aGlzLnogPCAwICkgPyBNYXRoLmNlaWwoIHRoaXMueiApIDogTWF0aC5mbG9vciggdGhpcy56ICk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dGhpcy54ID0gLSB0aGlzLng7XG5cdFx0dGhpcy55ID0gLSB0aGlzLnk7XG5cdFx0dGhpcy56ID0gLSB0aGlzLno7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGRvdDogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcblxuXHR9LFxuXG5cdC8vIFRPRE8gbGVuZ3RoU3F1YXJlZD9cblxuXHRsZW5ndGhTcTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMuejtcblxuXHR9LFxuXG5cdGxlbmd0aDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICk7XG5cblx0fSxcblxuXHRtYW5oYXR0YW5MZW5ndGg6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBNYXRoLmFicyggdGhpcy54ICkgKyBNYXRoLmFicyggdGhpcy55ICkgKyBNYXRoLmFicyggdGhpcy56ICk7XG5cblx0fSxcblxuXHRub3JtYWxpemU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiB0aGlzLmRpdmlkZVNjYWxhciggdGhpcy5sZW5ndGgoKSB8fCAxICk7XG5cblx0fSxcblxuXHRzZXRMZW5ndGg6IGZ1bmN0aW9uICggbGVuZ3RoICkge1xuXG5cdFx0cmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoIGxlbmd0aCApO1xuXG5cdH0sXG5cblx0bGVycDogZnVuY3Rpb24gKCB2LCBhbHBoYSApIHtcblxuXHRcdHRoaXMueCArPSAoIHYueCAtIHRoaXMueCApICogYWxwaGE7XG5cdFx0dGhpcy55ICs9ICggdi55IC0gdGhpcy55ICkgKiBhbHBoYTtcblx0XHR0aGlzLnogKz0gKCB2LnogLSB0aGlzLnogKSAqIGFscGhhO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRsZXJwVmVjdG9yczogZnVuY3Rpb24gKCB2MSwgdjIsIGFscGhhICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuc3ViVmVjdG9ycyggdjIsIHYxICkubXVsdGlwbHlTY2FsYXIoIGFscGhhICkuYWRkKCB2MSApO1xuXG5cdH0sXG5cblx0Y3Jvc3M6IGZ1bmN0aW9uICggdiwgdyApIHtcblxuXHRcdGlmICggdyAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5WZWN0b3IzOiAuY3Jvc3MoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5jcm9zc1ZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcblx0XHRcdHJldHVybiB0aGlzLmNyb3NzVmVjdG9ycyggdiwgdyApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuY3Jvc3NWZWN0b3JzKCB0aGlzLCB2ICk7XG5cblx0fSxcblxuXHRjcm9zc1ZlY3RvcnM6IGZ1bmN0aW9uICggYSwgYiApIHtcblxuXHRcdHZhciBheCA9IGEueCwgYXkgPSBhLnksIGF6ID0gYS56O1xuXHRcdHZhciBieCA9IGIueCwgYnkgPSBiLnksIGJ6ID0gYi56O1xuXG5cdFx0dGhpcy54ID0gYXkgKiBieiAtIGF6ICogYnk7XG5cdFx0dGhpcy55ID0gYXogKiBieCAtIGF4ICogYno7XG5cdFx0dGhpcy56ID0gYXggKiBieSAtIGF5ICogYng7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHByb2plY3RPblZlY3RvcjogZnVuY3Rpb24gKCB2ZWN0b3IgKSB7XG5cblx0XHR2YXIgc2NhbGFyID0gdmVjdG9yLmRvdCggdGhpcyApIC8gdmVjdG9yLmxlbmd0aFNxKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5jb3B5KCB2ZWN0b3IgKS5tdWx0aXBseVNjYWxhciggc2NhbGFyICk7XG5cblx0fSxcblxuXHRwcm9qZWN0T25QbGFuZTogZnVuY3Rpb24gKCBwbGFuZU5vcm1hbCApIHtcblxuXHRcdF92ZWN0b3IuY29weSggdGhpcyApLnByb2plY3RPblZlY3RvciggcGxhbmVOb3JtYWwgKTtcblxuXHRcdHJldHVybiB0aGlzLnN1YiggX3ZlY3RvciApO1xuXG5cdH0sXG5cblx0cmVmbGVjdDogZnVuY3Rpb24gKCBub3JtYWwgKSB7XG5cblx0XHQvLyByZWZsZWN0IGluY2lkZW50IHZlY3RvciBvZmYgcGxhbmUgb3J0aG9nb25hbCB0byBub3JtYWxcblx0XHQvLyBub3JtYWwgaXMgYXNzdW1lZCB0byBoYXZlIHVuaXQgbGVuZ3RoXG5cblx0XHRyZXR1cm4gdGhpcy5zdWIoIF92ZWN0b3IuY29weSggbm9ybWFsICkubXVsdGlwbHlTY2FsYXIoIDIgKiB0aGlzLmRvdCggbm9ybWFsICkgKSApO1xuXG5cdH0sXG5cblx0YW5nbGVUbzogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIHRoZXRhID0gdGhpcy5kb3QoIHYgKSAvICggTWF0aC5zcXJ0KCB0aGlzLmxlbmd0aFNxKCkgKiB2Lmxlbmd0aFNxKCkgKSApO1xuXG5cdFx0Ly8gY2xhbXAsIHRvIGhhbmRsZSBudW1lcmljYWwgcHJvYmxlbXNcblxuXHRcdHJldHVybiBNYXRoLmFjb3MoIF9NYXRoLmNsYW1wKCB0aGV0YSwgLSAxLCAxICkgKTtcblxuXHR9LFxuXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiBNYXRoLnNxcnQoIHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQoIHYgKSApO1xuXG5cdH0sXG5cblx0ZGlzdGFuY2VUb1NxdWFyZWQ6IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHZhciBkeCA9IHRoaXMueCAtIHYueCwgZHkgPSB0aGlzLnkgLSB2LnksIGR6ID0gdGhpcy56IC0gdi56O1xuXG5cdFx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5ICsgZHogKiBkejtcblxuXHR9LFxuXG5cdG1hbmhhdHRhbkRpc3RhbmNlVG86IGZ1bmN0aW9uICggdiApIHtcblxuXHRcdHJldHVybiBNYXRoLmFicyggdGhpcy54IC0gdi54ICkgKyBNYXRoLmFicyggdGhpcy55IC0gdi55ICkgKyBNYXRoLmFicyggdGhpcy56IC0gdi56ICk7XG5cblx0fSxcblxuXHRzZXRGcm9tU3BoZXJpY2FsOiBmdW5jdGlvbiAoIHMgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tU3BoZXJpY2FsQ29vcmRzKCBzLnJhZGl1cywgcy5waGksIHMudGhldGEgKTtcblxuXHR9LFxuXG5cdHNldEZyb21TcGhlcmljYWxDb29yZHM6IGZ1bmN0aW9uICggcmFkaXVzLCBwaGksIHRoZXRhICkge1xuXG5cdFx0dmFyIHNpblBoaVJhZGl1cyA9IE1hdGguc2luKCBwaGkgKSAqIHJhZGl1cztcblxuXHRcdHRoaXMueCA9IHNpblBoaVJhZGl1cyAqIE1hdGguc2luKCB0aGV0YSApO1xuXHRcdHRoaXMueSA9IE1hdGguY29zKCBwaGkgKSAqIHJhZGl1cztcblx0XHR0aGlzLnogPSBzaW5QaGlSYWRpdXMgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbUN5bGluZHJpY2FsOiBmdW5jdGlvbiAoIGMgKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tQ3lsaW5kcmljYWxDb29yZHMoIGMucmFkaXVzLCBjLnRoZXRhLCBjLnkgKTtcblxuXHR9LFxuXG5cdHNldEZyb21DeWxpbmRyaWNhbENvb3JkczogZnVuY3Rpb24gKCByYWRpdXMsIHRoZXRhLCB5ICkge1xuXG5cdFx0dGhpcy54ID0gcmFkaXVzICogTWF0aC5zaW4oIHRoZXRhICk7XG5cdFx0dGhpcy55ID0geTtcblx0XHR0aGlzLnogPSByYWRpdXMgKiBNYXRoLmNvcyggdGhldGEgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeFBvc2l0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0aGlzLnggPSBlWyAxMiBdO1xuXHRcdHRoaXMueSA9IGVbIDEzIF07XG5cdFx0dGhpcy56ID0gZVsgMTQgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0RnJvbU1hdHJpeFNjYWxlOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgc3ggPSB0aGlzLnNldEZyb21NYXRyaXhDb2x1bW4oIG0sIDAgKS5sZW5ndGgoKTtcblx0XHR2YXIgc3kgPSB0aGlzLnNldEZyb21NYXRyaXhDb2x1bW4oIG0sIDEgKS5sZW5ndGgoKTtcblx0XHR2YXIgc3ogPSB0aGlzLnNldEZyb21NYXRyaXhDb2x1bW4oIG0sIDIgKS5sZW5ndGgoKTtcblxuXHRcdHRoaXMueCA9IHN4O1xuXHRcdHRoaXMueSA9IHN5O1xuXHRcdHRoaXMueiA9IHN6O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzZXRGcm9tTWF0cml4Q29sdW1uOiBmdW5jdGlvbiAoIG0sIGluZGV4ICkge1xuXG5cdFx0cmV0dXJuIHRoaXMuZnJvbUFycmF5KCBtLmVsZW1lbnRzLCBpbmRleCAqIDQgKTtcblxuXHR9LFxuXG5cdGVxdWFsczogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0cmV0dXJuICggKCB2LnggPT09IHRoaXMueCApICYmICggdi55ID09PSB0aGlzLnkgKSAmJiAoIHYueiA9PT0gdGhpcy56ICkgKTtcblxuXHR9LFxuXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR0aGlzLnggPSBhcnJheVsgb2Zmc2V0IF07XG5cdFx0dGhpcy55ID0gYXJyYXlbIG9mZnNldCArIDEgXTtcblx0XHR0aGlzLnogPSBhcnJheVsgb2Zmc2V0ICsgMiBdO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHR0b0FycmF5OiBmdW5jdGlvbiAoIGFycmF5LCBvZmZzZXQgKSB7XG5cblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy54O1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLnk7XG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuejtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9LFxuXG5cdGZyb21CdWZmZXJBdHRyaWJ1dGU6IGZ1bmN0aW9uICggYXR0cmlidXRlLCBpbmRleCwgb2Zmc2V0ICkge1xuXG5cdFx0aWYgKCBvZmZzZXQgIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuVmVjdG9yMzogb2Zmc2V0IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSAuZnJvbUJ1ZmZlckF0dHJpYnV0ZSgpLicgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMueCA9IGF0dHJpYnV0ZS5nZXRYKCBpbmRleCApO1xuXHRcdHRoaXMueSA9IGF0dHJpYnV0ZS5nZXRZKCBpbmRleCApO1xuXHRcdHRoaXMueiA9IGF0dHJpYnV0ZS5nZXRaKCBpbmRleCApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fVxuXG59ICk7XG5cblxuZXhwb3J0IHsgVmVjdG9yMyB9O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ3RocmVlL3NyYy9tYXRoL1ZlY3RvcjMnO1xuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSBldmVudC5kYXRhO1xuICAgIGNvbnN0IG5leHRGcmFtZSA9IHBhcnRpY2xlcy5yZWR1Y2UoKHBhcnRpY2xlcywgcGFydGljbGUpID0+IHtcbiAgICAgICAgaWYgKHBhcnRpY2xlLmZyYW1lLmZsYWdzLnJlbW92ZSlcbiAgICAgICAgICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gICAgICAgIGNvbnN0IHdlaWdodGVkVmVjdG9yID0gbmV3IFZlY3RvcjMocGFydGljbGUudmVjdG9yLngsIHBhcnRpY2xlLnZlY3Rvci55ICogMywgcGFydGljbGUudmVjdG9yLnogLyAyKTtcbiAgICAgICAgcGFydGljbGUuZnJhbWUucG9zaXRpb24ueCArPSB3ZWlnaHRlZFZlY3Rvci54O1xuICAgICAgICBwYXJ0aWNsZS5mcmFtZS5wb3NpdGlvbi55ICs9IHdlaWdodGVkVmVjdG9yLnk7XG4gICAgICAgIHBhcnRpY2xlLmZyYW1lLnBvc2l0aW9uLnogKz0gd2VpZ2h0ZWRWZWN0b3IuejtcbiAgICAgICAgY29uc3QgYW5nbGVaID0gd2VpZ2h0ZWRWZWN0b3IuYW5nbGVUbyhuZXcgVmVjdG9yMygxLCAxLCAwKSk7XG4gICAgICAgIGNvbnN0IGFuZ2xlWSA9IHdlaWdodGVkVmVjdG9yLmFuZ2xlVG8obmV3IFZlY3RvcjMoMSwgMCwgMSkpO1xuICAgICAgICBjb25zdCBhbmdsZVggPSB3ZWlnaHRlZFZlY3Rvci5hbmdsZVRvKG5ldyBWZWN0b3IzKDAsIDEsIDEpKTtcbiAgICAgICAgcGFydGljbGUuZnJhbWUucm90YXRpb24ueiA9IGFuZ2xlWjtcbiAgICAgICAgcGFydGljbGUuZnJhbWUucm90YXRpb24ueSA9IGFuZ2xlWTtcbiAgICAgICAgcGFydGljbGUuZnJhbWUucm90YXRpb24ueCA9IGFuZ2xlWDtcbiAgICAgICAgcGFydGljbGUudmVjdG9yID0gbmV3IFZlY3RvcjMocGFydGljbGUudmVjdG9yLngsIHBhcnRpY2xlLnZlY3Rvci55LCBwYXJ0aWNsZS52ZWN0b3IueikuYWRkKG5ldyBWZWN0b3IzKDBcbiAgICAgICAgICAgIC0gMC4wMDUsIHBhcnRpY2xlLnZlY3Rvci56ICogLTAuMDIpKTtcbiAgICAgICAgaWYgKHBhcnRpY2xlLmZyYW1lLnBvc2l0aW9uLnkgPCAtMiB8fCBNYXRoLmFicyhwYXJ0aWNsZS5mcmFtZS5wb3NpdGlvbi54KSA+IDMwKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZS5mcmFtZS5mbGFncy5yZW1vdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJ0aWNsZXMuY29uY2F0KFtwYXJ0aWNsZV0pO1xuICAgIH0sIFtdKTtcbiAgICBwb3N0TWVzc2FnZShuZXh0RnJhbWUsIG51bGwpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9